# WebAR Video Overlay: A Step-by-Step Beginner Tutorial

Welcome! This guide is designed to help you teach a beginner the core concepts, file structures, and setup details of browser-based Augmented Reality (WebAR). 

We have created a simplified, barebones version of the application inside the [simple/index.html](file:///Users/travis/Software/webar-video-demo/simple/index.html) folder to make learning the basics easy and clean.

---

## 📋 Course Outline & Teaching Sequence
1. **The Concepts:** How does WebAR work?
2. **Local Environment Setup:** Installing Node and running the server.
3. **Code Breakdown:** Line-by-line look at the minimal WebAR script.
4. **Target Compilation:** Creating a custom image card anchor.
5. **Mobile Testing & HTTPS Tunnels:** Launching and running on smartphones.
6. **Stepping Up:** Transitioning from the simple code to the premium demo.

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
This launches a dual server defined in [server.js](file:///Users/travis/Software/webar-video-demo/server.js):
* An **HTTPS Server** on port `3030` (creates self-signed certificates so WebRTC camera feeds are allowed on localhost).
* An **HTTP Server** on port `8080` (useful for previewing target cards and running secure tunnels).

---

## 📝 Lesson 3: Line-by-Line Code Breakdown

Open [simple/index.html](file:///Users/travis/Software/webar-video-demo/simple/index.html) with the beginner. It is only 45 lines of code:

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
  mindar-image="imageTargetSrc: ../assets/card.mind; filterMinCF:0.0001; filterBeta:0.001;" 
  embedded 
  vr-mode-ui="enabled: false"
  device-orientation-permission-ui="enabled: false">
```
* `imageTargetSrc`: Points to the compiled mathematical coordinates of our target.
* `filterMinCF` & `filterBeta`: Sensitivity numbers that reduce virtual object jittering by smoothing tracking frames.
* `embedded`: Integrates the canvas into the standard page flow instead of forcing full-screen.

```html
<!-- 3. Preload assets inside <a-assets> -->
<a-assets>
  <video 
    id="ar-video" 
    src="../assets/video.mp4" 
    preload="auto" 
    loop="true" 
    playsinline 
    webkit-playsinline
    autoplay
    muted>
  </video>
</a-assets>
```
* `<a-assets>`: A-Frame's asset management system that preloads files in memory before starting the scene.
* `playsinline`: **Crucial for iOS Safari.** Forces the video to play directly inside the HTML page instead of opening in Apple's native full-screen media player.
* `autoplay muted`: **Crucial Autoplay Bypass.** Modern mobile browsers block videos from playing automatically unless they are set to `muted`. Setting it to `muted` guarantees it starts immediately.

```html
<!-- 4. Setup the camera and link virtual assets to the target -->
<a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

<a-entity mindar-image-target="targetIndex: 0">
  <a-video 
    src="#ar-video" 
    position="0 0 0" 
    rotation="0 0 0" 
    width="1.4" 
    height="0.7875">
  </a-video>
</a-entity>
```
* `<a-camera>`: Defines the view camera. We disable `look-controls` because MindAR overrides the camera position using raw feed coordinates.
* `mindar-image-target="targetIndex: 0"`: Represents a container that inherits the physical target's position. Anything placed inside this container floats directly on the physical target.
* `<a-video>`: Renders the video file inside the 3D scene using a standard aspect ratio (width `1.4` and height `0.7875` maintaining a 16:9 scale).

---

## 📸 Lesson 4: Compiling Custom Targets
Explain that tracking engines can't read standard `.png` or `.jpg` images directly. They must compile them into mathematically trackable anchor paths.

1. Take a target image (like [assets/card.png](file:///Users/travis/Software/webar-video-demo/assets/card.png)). Ensure it has high contrast, sharp edges, and distinct patterns.
2. Go to hiukim's compiler tool: [hiukim.github.io/mind-ar-js-doc/tools/compile](https://hiukim.github.io/mind-ar-js-doc/tools/compile/)
3. Drag and drop the image card. You will see blue dots represent calculated feature anchors.
4. Download the generated `.mind` file and place it in your assets folder.

---

## 📱 Lesson 5: Mobile HTTPS Tunnels
Webcam camera streams (`getUserMedia`) are security-sensitive APIs. Modern mobile browsers block them unless the site is served over a **fully-trusted, secure HTTPS connection**.

* **Why self-signed HTTPS fails on iOS:** If you connect directly via your computer's local IP (e.g. `https://192.168.x.x:3030`), mobile Safari flags the self-signed certificate as untrusted and blocks camera access.
* **The Tunnel Solution:** Running a secure public tunnel generates a temporary public HTTPS address that Safari trusts:
  1. Open a new terminal tab.
  2. Start localtunnel:
     ```bash
     npx localtunnel --port 8080
     ```
  3. Open the output URL on your phone's native **Safari** or **Chrome** app.
  4. If prompted for a password, enter your computer's external IP address.
  5. The webcam will open immediately!

---

## 🏆 Lesson 6: Stepping Up to the Premium Version
Once the beginner understands the simple version, explain how we can expand it to create a commercial-grade template. Open the root files:
* **The Logic ([index.html](file:///Users/travis/Software/webar-video-demo/index.html)):** In the premium version, we write custom JavaScript logic to monitor target detection events (`targetFound` and `targetLost`) to dynamically play/pause the video, show onboarding pages, handle tab-switching focus, and handle audio state toggles.
* **The Design ([index.css](file:///Users/travis/Software/webar-video-demo/index.css)):** We add glassmorphic onboarding cards, status indicator dots, scanner laser animations, audio toggles, and responsive styling to fit screens of all sizes cleanly.
* **The Preview ([preview.html](file:///Users/travis/Software/webar-video-demo/preview.html) & [preview.css](file:///Users/travis/Software/webar-video-demo/preview.css)):** We provide printing stylesheets with exact physical dimensions (e.g., 5.5" cards) and cut guidelines to make physical card printing easy.
