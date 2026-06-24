const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const PORT_HTTPS = 3030;
const PORT_HTTP = 8080;

// 1. SSL/TLS Certificate Check and Automatic Generation
const keyPath = path.join(__dirname, 'key.pem');
const certPath = path.join(__dirname, 'cert.pem');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.log('Generating self-signed SSL/TLS certificates for HTTPS camera access on smartphones...');
  try {
    // Generate cert files using openssl (native on macOS)
    execSync(
      `openssl req -x509 -newkey rsa:2048 -keyout "${keyPath}" -out "${certPath}" -sha256 -days 365 -nodes -subj "/CN=localhost"`,
      { stdio: 'inherit' }
    );
    console.log('Certificates generated successfully (key.pem, cert.pem).\n');
  } catch (error) {
    console.error('Failed to generate SSL certificates natively. Please make sure openssl is installed.', error);
    process.exit(1);
  }
}

// 2. Local Network IP discovery
function getLocalIPAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
      const address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  return addresses;
}

const localIPs = getLocalIPAddresses();

// 3. Request Handler with Video Range Requests (MANDATORY for iOS Safari)
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.mind': 'application/octet-stream',
};

function handleRequest(req, res) {
  // Decode URL in case of spaces/special chars
  const decodedUrl = decodeURI(req.url);
  let filePath = path.join(__dirname, decodedUrl === '/' ? 'index.html' : decodedUrl);
  
  // Security check: ensure path is within directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  // If path is a directory, lookup index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404 Not Found');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  // Handle Video Range Requests (for iOS compatibility)
  if (contentType === 'video/mp4' && req.headers.range) {
    const range = req.headers.range;
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      res.writeHead(416, { 'Content-Range': `bytes */${fileSize}` });
      return res.end();
    }

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    // Normal file response
    const head = {
      'Content-Length': fileSize,
      'Content-Type': contentType,
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
}

// 4. Fire up HTTPS Server
const sslOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

const httpsServer = https.createServer(sslOptions, handleRequest);
httpsServer.listen(PORT_HTTPS, () => {
  console.log('==================================================');
  console.log(`🔒 WebAR HTTPS Server running at:`);
  console.log(`   Localhost:  https://localhost:${PORT_HTTPS}`);
  localIPs.forEach(ip => {
    console.log(`   On Mobile:  https://${ip}:${PORT_HTTPS}`);
  });
  console.log('==================================================');
  console.log('💡 Note: When loading on your smartphone, you will see a certificate warning.');
  console.log('   Simply tap "Advanced" -> "Proceed anyway" to bypass it.');
  console.log('   (Required because we are using a local self-signed certificate)');
  console.log('==================================================\n');
});

// 5. Fire up HTTP Server (Port 8080) - useful for local desktop previews
const httpServer = http.createServer(handleRequest);

httpServer.listen(PORT_HTTP, () => {
  console.log(`🔌 HTTP Server running at http://localhost:${PORT_HTTP} (HTTP Preview only)\n`);
});
