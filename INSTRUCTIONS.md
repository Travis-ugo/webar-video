# WebAR Mentoring Guide: Video Target Tracking
*Welcome to your first WebAR Mentoring Session! This guide is prepared for your first 2-hour tutorial. We will walk through the core technologies, look at the project architecture, set up the development server, and explore how the code works under the hood.*

---

## 📅 Session Outline (2 Hours)
1. **WebAR Fundamentals (15 mins):** Understanding how browser-based AR functions (Webcam -> Computer Vision -> WebGL Render).
2. **Environment & Server Setup (30 mins):** Running a secure local server to test the experience directly on your smartphone.
3. **Code Breakdown & Scene Structure (40 mins):** Reviewing how A-Frame and MindAR connect to map 3D assets to 2D image targets.
4. **Interactions & Mobile Safari Optimization (20 mins):** Handling video playback, muting, and autoplay browser constraints.
5. **Target Compilation Practice (15 mins):** Compiling a custom image card target using the MindAR compiler tool.

---

## 🛠️ Step 1: Project Folder Structure
Your self-hosted WebAR project has been structured cleanly for hosting on any standard web server:

```text
webar-video-demo/
├── assets/
│   ├── card.mind       # Processed computer-vision target signature file
│   ├── card.png        # Print/Preview version of target image card
│   └── video.mp4       # Video asset projected on top of target card
├── index.html          # Main WebAR experience (cameras, tracking, overlay UI)
├── preview.html        # Help page showing the card to simplify camera scanning
├── server.js           # Local HTTP/HTTPS Node server script
└── package.json        # Node script configuration
```

---

## 🔒 Step 2: The Importance of HTTPS (Secure Contexts)
Modern mobile browsers (iOS Safari, Android Chrome) enforce strict privacy security guidelines. **Webcam access is blocked unless the webpage is served over HTTPS (a secure context).**

For local development and testing on a smartphone:
*   We cannot use `http://192.168.x.x` (camera will be blocked).
*   We must serve files using **HTTPS** (e.g. `https://192.168.x.x:3030`).
*   Our local server (`server.js`) automatically generates local development certificates (`key.pem`, `cert.pem`) dynamically on launch, enabling secure local Wi-Fi sharing.

### Launching the Development Server:
1. Open your terminal in this directory.
2. Run:
   ```bash
   npm run dev
   ```
3. Look at the terminal output. It will display:
   *   `https://localhost:3030` (for testing on your laptop)
   *   `https://192.168.x.x:3030` (for testing on your smartphone)

*Note: Since the SSL certificates are self-signed for local development, your browser will show a certificate warning when loading the page. Simply tap **Advanced** -> **Proceed anyway** to enter the app. This warning is completely normal in development and won't appear when deploying on a production domain with a real SSL certificate.*

---

## 📸 Step 3: Compiling Custom Targets
MindAR does not read raw `.png` or `.jpg` files directly. It requires a `.mind` file containing calculated high-contrast mathematical feature anchors.

### How to Compile Your Own Images:
1. Navigate to the online compiler: [hiukim.github.io/mind-ar-js-doc/tools/compile](https://hiukim.github.io/mind-ar-js-doc/tools/compile/)
2. Drag and drop your target card (e.g. `card.png`) into the browser tool.
3. Once compiled, you will see blue point indicators representing features the camera can track.
4. Click **Download** to obtain your new target file (e.g., `targets.mind`).
5. Replace `assets/card.mind` with your downloaded file, and update `index.html` references if the file is named differently.

*💡 Target Optimization Tip: Standard photos, geometric text overlays, or patterns with high contrast make excellent targets. Plain gradient shapes or low-contrast illustrations will be difficult for the tracking engine to lock onto.*

---

## 📝 Step 4: Understanding the Code
Let's dissect the primary elements in `index.html`.

### A. The HTML Markup (`index.html`)
MindAR plugs directly into **A-Frame** (a wrapper around Three.js) to manage the virtual world using simple HTML tags.

```html
<!-- Import Libraries -->
<script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"></script>

<!-- The AR Scene -->
<a-scene 
  mindar-image="imageTargetSrc: assets/card.mind; autoStart: false;" 
  embedded 
  vr-mode-ui="enabled: false">
  
  <a-assets>
    <!-- Define the video asset. playsinline allows video playback inline on iOS -->
    <video id="ar-video" src="assets/video.mp4" loop="true" playsinline muted></video>
  </a-assets>

  <!-- The orthographic camera -->
  <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

  <!-- Target mapping. Index 0 corresponds to the first image compiled in card.mind -->
  <a-entity mindar-image-target="targetIndex: 0" id="ar-target">
    <a-video src="#ar-video" width="1" height="0.56" position="0 0 0" rotation="0 0 0"></a-video>
  </a-entity>
</a-scene>
```

### B. The Logic (`index.html` Script Block)
Because browsers restrict autoplaying video with audio enabled, we must programmatically control the video based on target detection events:

```javascript
const targetEl = document.getElementById("ar-target");
const videoEl = document.getElementById("ar-video");

// Triggered when the computer vision engine locks onto the card
targetEl.addEventListener("targetFound", () => {
  videoEl.play(); // Play video overlay
  // Update web UI to notify user of tracking status...
});

// Triggered when the card moves out of the camera view
targetEl.addEventListener("targetLost", () => {
  videoEl.pause(); // Pause video to save processor performance
  // Restore scanner guidelines...
});
```

---

## 🏃‍♀️ Step 5: Testing on Your Phone
1. Start the server on your laptop: `npm run dev`.
2. Look at the terminal to find your local IP address (e.g. `https://192.168.1.15:3030`).
3. Connect your phone to the **same Wi-Fi network** as your laptop.
4. Open Safari (iOS) or Chrome (Android) on your phone and go to that address.
5. Tap **Start Experience** and authorize camera access.
6. Open `preview.html` on your laptop screen, or look at `assets/card.png`.
7. Point your smartphone camera at the card image on your screen.
8. Watch the video play directly on top of the card! Tap the **Muted** button to enable audio.

---

## 🏆 Practical Practice Challenges for May:
To reinforce your learning, try these tasks during or after our session:
1. **Change the video size:** Modify the `width` and `height` properties of the `<a-video>` element in `index.html` to see how size and aspect ratio change visual overlays.
2. **Add a 3D model alongside the video:** Insert a 3D entity `<a-box position="0 0.4 0" scale="0.2 0.2 0.2" color="#6366f1"></a-box>` inside `<a-entity mindar-image-target>` to combine video overlays with floating 3D shapes.
3. **Compile a new target:** Try taking a photo of a physical book cover or poster, compile it, and adapt this project to trigger the video when pointing your camera at that book.
