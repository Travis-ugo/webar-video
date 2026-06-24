# WebAR Video Overlay: A Step-by-Step Beginner Tutorial

Welcome! This guide is designed to help you teach a beginner the core concepts, file structures, and setup details of browser-based Augmented Reality (WebAR). 

We have created a simplified, consolidated template directly inside the root [index.html](file:///Users/travis/Software/webar-video-demo/index.html) and [preview.html](file:///Users/travis/Software/webar-video-demo/preview.html) files to make learning the basics easy, clean, and self-contained.

---

## 📋 Course Outline & Teaching Sequence
1. **The Concepts:** How does WebAR work?
2. **Local Environment Setup:** Installing Node and running the server.
3. **Code Breakdown:** Line-by-line look at the WebAR script.
4. **Target Compilation:** Creating a custom image card anchor.
5. **Mobile Testing & HTTPS:** Connecting smartphones directly over local Wi-Fi.

---

## 🎓 Lesson 1: How WebAR Works
Augmented Reality in a browser combines three core technologies:
1. **WebRTC (The Webcam):** The browser requests access to the user's camera feed.
2. **Computer Vision (Tracking):** The tracking engine (MindAR) scans each frame of the webcam feed, looking for high-contrast mathematical feature anchors (like sharp corners, text edges, and shapes) that match the precompiled target card signature.
3. **WebGL (3D Rendering):** Once the target is found, A-Frame (built on Three.js) projects virtual 3D elements (like meshes, text, or a video plane) onto the coordinates of the target card, aligning and rotating the virtual overlay dynamically.

---

## 🛠️ Lesson 2: Installation & Local Setup

Explain to the beginner that we need a local runtime to run the code. Follow these installation steps:

### 1. Install Node.js
* Download and install the Long Term Support (LTS) version of Node.js from [nodejs.org](https://nodejs.org/).
* This installs both **Node** (the JS runtime) and **npm** (Node Package Manager).
* Verify the installation in your terminal:
  ```bash
  node -v
  npm -v
  ```

### 2. Install Project Dependencies
Open your terminal, navigate to this project folder, and run:
```bash
npm install
```

### 3. Run the Development Server
Start the local server by running:
```bash
npm run dev
```
This launches a secure local HTTPS server on port `3030`. (It automatically generates self-signed SSL certificates `key.pem` and `cert.pem` so that browsers allow the WebRTC camera feeds).

---

## 📝 Lesson 3: Line-by-Line Code Breakdown

Open [index.html](file:///Users/travis/Software/webar-video-demo/index.html) with the beginner. Have them look at the core WebAR boilerplate markup:

```html
<!-- 1. Import A-Frame (3D rendering wrapper) and MindAR (Computer vision tracker) -->
<script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"></script>
```
* **A-Frame:** Allows us to create 3D worlds using standard HTML tags rather than writing complex JavaScript WebGL code.
* **MindAR:** Links with A-Frame to track custom 2D images.

```html
<!-- 2. Set up the A-Frame Scene container and link the target signature (.mind file) -->
<a-scene 
  mindar-image="imageTargetSrc: assets/card.mind; autoStart: false; filterMinCF:0.0001; filterBeta:0.001; uiScanning: no;" 
  embedded 
  vr-mode-ui="enabled: false"
  device-orientation-permission-ui="enabled: false">
```
* `imageTargetSrc`: Points to the compiled mathematical coordinates of our target card.
* `filterMinCF` & `filterBeta`: Sensitivity numbers that reduce virtual object jittering by smoothing tracking frames.
* `embedded`: Integrates the camera canvas into the page layout instead of forcing full-screen.

```html
<!-- 3. Preload assets inside <a-assets> -->
<a-assets>
  <video id="ar-video" src="assets/video.mp4" playsinline webkit-playsinline loop muted></video>
</a-assets>
```
* `<a-assets>`: A-Frame's asset management system that preloads files in memory before starting the scene.
* `playsinline`: **Crucial for iOS Safari.** Forces the video to play directly inside the web page instead of opening in Apple's native full-screen media player.
* `loop muted`: Mutual requirements for auto-play support. Modern browsers block videos from playing automatically unless they are set to `muted`.

```html
<!-- 4. Setup the camera and link virtual assets to the target -->
<a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

<a-entity mindar-image-target="targetIndex: 0" id="ar-target">
  <a-video src="#ar-video" position="0 0 0" rotation="0 0 0" width="1.4" height="0.7875" scale="1.2 1.2 1"></a-video>
</a-entity>
```
* `<a-camera>`: Defines the viewport camera. We disable `look-controls` because MindAR overrides the camera position using raw camera feed coordinates.
* `mindar-image-target="targetIndex: 0"`: Represents a container that inherits the physical target's position. Anything placed inside this container floats directly on the physical target.
* `<a-video>`: Renders the video file inside the 3D scene (with width `1.4` and height `0.7875` maintaining a 16:9 scale).

---

## 📸 Lesson 4: Compiling Custom Targets
Explain that tracking engines can't read standard `.png` or `.jpg` images directly. They must compile them into mathematically trackable anchor paths.

1. Take a target image (like [assets/card.png](file:///Users/travis/Software/webar-video-demo/assets/card.png)). Ensure it has high contrast, sharp edges, and distinct patterns.
2. Go to hiukim's compiler tool: [hiukim.github.io/mind-ar-js-doc/tools/compile](https://hiukim.github.io/mind-ar-js-doc/tools/compile/)
3. Drag and drop the image card. You will see blue dots represent calculated feature anchors.
4. Download the generated `.mind` file and place it in your assets folder.

---

## 📱 Lesson 5: Mobile HTTPS connections
Webcam camera streams (`getUserMedia`) are security-sensitive APIs. Modern mobile browsers block them unless the site is served over a **secure HTTPS connection**.

Since our local development server runs with a self-signed SSL certificate, it enables secure `https://` access directly over your local network:

1. Make sure your smartphone and computer are connected to the **same Wi-Fi network**.
2. Open the browser on your phone and navigate to `https://<your-computer-local-ip>:3030`. (The server prints this exact address in the terminal when you run `npm run dev`).
3. **Bypassing the Security Warning:**
   Since the SSL certificate is self-signed (created on your local machine), your browser will display a warning saying the connection is untrusted. This is expected and safe:
   * **On Android / Chrome:** Tap **Advanced** -> **Proceed to <IP> (unsafe)**.
   * **On iOS / Safari:** Tap **Show Details** -> Tap the **"visit this website"** link at the very bottom -> Tap **Visit Website** to confirm.
4. Grant camera permission when prompted, and aim your phone's camera directly at the target card image on your computer screen or printout!
