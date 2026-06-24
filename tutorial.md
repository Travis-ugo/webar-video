# WebAR Mentoring Curriculum: Teacher's Lecture & Live-Coding Script
*This document contains the step-by-step teaching sequence, classroom transcripts, analogies, and live-coding guides for your WebAR video overlay target tracking lesson. It tells you exactly what to say, what analogies to use, and how to direct the live-coding session.*

---

## 📅 Session Outline & Timing (120 Minutes)
*   **00:00 - 00:15 (15 min):** Welcome, Conceptual Foundations, and Widescreen Slide Walkthrough (Slides 1-2).
*   **00:15 - 00:30 (15 min):** Project File Architecture & Local Environment Verification (Slide 3).
*   **00:30 - 01:10 (40 min):** Live Code-Along: Constructing the WebAR Scene & Mobile HUD (Slides 4-6).
*   **01:10 - 01:30 (20 min):** Live Code-Along: Javascript Mechanics & Mobile Autoplay/Tab Focus Fixes (Slides 8-9).
*   **01:30 - 01:45 (15 min):** Custom Target Card Compilation Practice & Local Network Secure HTTPS setups (Slides 7, 10).
*   **01:45 - 02:00 (15 min):** Q&A, Classroom Sandbox Challenges, and Deployment Wrap-up.

---

## 🎙️ Welcome & Core WebAR Concepts (00:00 - 00:15)

### 🗣️ What to Say (Word-for-Word Script)
> *"Welcome, everyone! Today, we are going to build an Augmented Reality experience that runs natively inside a mobile web browser. We call this **WebAR**.*
>
> *Before we write a single line of code, let's understand why WebAR is a game-changer. Traditionally, to experience AR, users had to download a heavy app from the Apple App Store or Google Play Store. That download step creates friction—most users simply quit before trying. With WebAR, your users just scan a QR code or tap a link, and the experience opens instantly.*
>
> *Let's look at Slide 2: **What is WebAR? Core Technologies**. WebAR is built by combining three separate web browser technologies:*
>
> 1.  ***WebRTC (The Camera Feed)***: *We use the HTML5 `getUserMedia` API to request permission to use the user's camera, streaming it live onto the background of our webpage.*
> 2.  ***Computer Vision (MindAR Tracking)***: *The computer vision engine, MindAR, runs in JavaScript. It acts like a digital eye, scanning every frame of our camera feed to match mathematical coordinates—like sharp corners, text characters, or outline shapes—against a pre-compiled image target.*
> 3.  ***WebGL & A-Frame (3D Rendering)***: *Once MindAR detects our target card, it tells A-Frame where it is in physical space. A-Frame—which is a friendly HTML wrapper around the WebGL library Three.js—projects our virtual video element onto the target's coordinate space, adjusting its rotation and position in real time.*
>
> *Today, you will build this entire pipeline yourself. Let's get started!"*

---

## 📂 Project Architecture & Local Server Setup (00:15 - 00:30)

### 🗣️ What to Say (Word-for-Word Script)
> *"Let's open our project directories. Look at Slide 3: **Project File Architecture**. You will see we have a standard project directory structure. Open the folder `webar-video-demo-student` in your text editor.*
>
> *You will find several files:*
> *   `index.html`: *This is where we will write our HTML overlays, load A-Frame, and script the interactions.*
> *   `server.js`: *A custom Node.js server. Why do we need a custom server? Why can't we just double-click `index.html`?*
> *   *Firstly, mobile browsers restrict camera access unless the page is loaded over a secure HTTPS connection. Our server automatically generates local developer SSL certificates (`key.pem` and `cert.pem`) to satisfy this.*
> *   *Secondly, iPhones are extremely picky about video playback. Safari demands **HTTP Range Requests**—which means serving video files in chunks rather than one giant block. Our Node server has custom range-request handlers built-in to prevent video loading loops on iOS.*
>
> *Let's start our server. Open your terminal, make sure you are in the student project directory, and type:*
> ```bash
> npm install
> npm run dev
> ```
> *Look at the terminal. It prints two URLs. The one labeled `Localhost` is for testing on your computer screen. The one displaying an IP address, like `https://192.168.x.x:3030`, is for your phone. Write this down—we will use it shortly to test on our physical devices."*

---

## 💻 Live Code-Along: HTML Scene Setup (00:30 - 01:10)

*Guide students to open [index.html](file:///Users/travis/Software/webar-video-demo/index.html) and locate the commented steps.*

### 🗣️ Step-by-Step Live-Coding Prompts & Script
#### 1. Page Overflows & Pull-to-Refresh Setup (CSS)
> *"Look at our stylesheet under **TEACHER STEP 2**. Most WebAR projects set the body layout to `overflow: hidden` to lock elements. But if a student's webcam fails, they need to refresh. We have set `overflow-y: auto` to enable native mobile pull-to-refresh. Notice that all of our control buttons and status headers use `position: fixed` or `position: absolute`. This locks them to the screen so they don't scroll when the user reloads."*

#### 2. Mounting A-Frame Container (`<a-scene>`)
> *"Now let's scroll to the HTML body. Find **TEACHER STEP 3**. We need to declare our A-Frame scene using `<a-scene>`.*
>
> *Let's look at the parameters:*
> *   `mindar-image="imageTargetSrc: assets/card.mind; autoStart: false; filterMinCF:0.0001; filterBeta:0.001; uiScanning: no;"`
> *   `imageTargetSrc` *points to our compiled target.*
> *   *We set `autoStart: false`. This is critical. If we let the tracker start immediately on page load, the browser will request webcam access before the user clicks anything, causing permission blocks. We wait for their button click.*
> *   `filterMinCF` *and* `filterBeta` *are noise filters. By setting `filterMinCF` to `0.0001` and `filterBeta` to `0.001`, we tell the tracker to damp sensor movement when the target is still, preventing the video from vibrating or shaking."*

#### 3. Preloading Assets & Bypassing iOS Safari Takeover (`<a-assets>`)
> *"Look at **TEACHER STEP 4**. Inside `<a-assets>`, we preload our video. Let's write the video element:*
> ```html
> <video id="ar-video" src="assets/video.mp4" preload="auto" autoplay loop muted playsinline webkit-playsinline></video>
> ```
> *Pay attention to the attributes. Why do we need `playsinline` and `webkit-playsinline`? If you omit these, the moment the video starts playing on iOS, Apple's OS will take over, pop open the native fullscreen media player, and hide your AR scene. These tags lock the video texture inline on the WebGL canvas. We also set it to `muted` because browsers block video autoplay unless the sound track is silenced."*

#### 4. Coordinates Tracking Target (`<a-entity>`)
> *"Let's go to **TEACHER STEP 5**. We define our physical target tracking anchor:*
> ```html
> <a-entity mindar-image-target="targetIndex: 0" id="ar-target">
>   <a-video src="#ar-video" position="0 0 0" rotation="0 0 0" width="1.4" height="0.7875" scale="1.2 1.2 1"></a-video>
> </a-entity>
> ```
> *The outer `<a-entity>` is our tracking group anchor. `targetIndex: 0` maps directly to the first image compiled inside `card.mind`. When MindAR tracks the card, it applies coordinate matrix shifts to this entity. Inside it, we add `<a-video>` which pulls the source stream texture `#ar-video` and maps it to a flat 3D plane. We set a 16:9 aspect ratio scale using width `1.4` and height `0.7875`."*

---

## ⚡ Live Code-Along: Javascript Interaction Logic (01:10 - 01:30)

#### 5. Unlocking Browser Audio Context (Priming the Player)
> *"Let's check **TEACHER STEP 8**. When the user clicks the 'Start Camera' button, we run `startARScanner()`. But there is a modern browser constraint: we cannot play video with audio dynamically using scripts unless the user has actively triggered that specific element.*
>
> *To bypass this, we write what is called a **media priming sequence** inside our click handler:*
> ```javascript
> arVideo.play().then(() => {
>   arVideo.pause();
> }).catch(err => {
>   console.log("Priming blocked:", err);
> });
> ```
> *By calling `.play()` and immediately calling `.pause()` inside the start button click event callback, we satisfy the browser's user-gesture security rule. The media element is now 'primed', and we can programmatically trigger it with sound active whenever the card is scanned!"*

#### 6. Instagram-Style Sound Controls
> *"Let's check **TEACHER STEP 9**. We want users to be able to unmute the video by tapping the screen. We attach a click listener to the document body, skipping clicks on UI buttons. When they tap, we toggle the `arVideo.muted` boolean.*
>
> *To make the transition premium, we dynamically update the SVG icon inside our floating button and trigger a visual overlay popup in the center of the screen.*
>
> *Notice this line:*
> ```javascript
> soundFlash.classList.remove("show");
> void soundFlash.offsetWidth; // Force CSS reflow
> soundFlash.classList.add("show");
> ```
> *Why do we call `void soundFlash.offsetWidth`? When we toggle CSS classes rapidly, browsers optimize rendering and ignore the transition reset. By requesting `offsetWidth`, we force a DOM reflow cycle, telling the browser engine to reset the animation, allowing the sound indicator to flash on every click."*

#### 7. Mobile Tab Focus Stream Recovery
> *"Now look at **TEACHER STEP 11**. When a user locks their smartphone or switches browser tabs, the mobile OS suspends active camera capture to preserve battery. When they return, their camera view freezes or turns black. We solve this using the browser's Visibility API:*
> ```javascript
> document.addEventListener("visibilitychange", () => {
>   if (document.visibilityState === "visible") {
>     // Stop the frozen tracking stream and restart it
>     const arSystem = arScene.systems["mindar-image-system"];
>     arSystem.stop();
>     setTimeout(() => { arSystem.start(); }, 300);
>   }
> });
> ```
> *When the tab becomes visible, we stop the tracker and wait 300 milliseconds for hardware channels to release before starting a fresh capture thread."*

#### 8. Target Recognition Listeners
> *"Finally, look at **TEACHER STEP 12**. We register listeners for `targetFound` and `targetLost` events:*
> *   *When `targetFound` triggers, we change the scanner guide border to green (`scanBox.classList.add("tracked")`), update the status header, reset the video playback head to `0` so it loops cleanly from the beginning, and execute `arVideo.play()`.*
> *   *When `targetLost` triggers, we immediately call `arVideo.pause()`. This pauses playback when the card moves out of view, preserving system processing and battery."*

---

## 📱 Testing, SSL Warnings, & Custom Target Compilation (01:30 - 01:45)

### 🗣️ What to Say (Word-for-Word Script)
> *"Now that our code is complete, let's test it on our phones!*
>
> 1.  *Make sure your computer and your phone are connected to the **same local Wi-Fi network**.*
> 2.  *Open the browser on your phone and enter the IP address URL printed by the terminal (e.g. `https://192.168.x.x:3030`).*
> 3.  *Bypass the SSL Warning page (tap Advanced -> Proceed).*
> 4.  *Allow camera access when prompted.*
> 5.  *On your computer monitor, open the printable target card page: `http://localhost:8080/preview.html`.*
> 6.  *Aim your phone's camera at the computer screen. Watch the video align onto the card image! Tap the screen to toggle the sound!*
>
> *Once you have this working, try compiling your own custom tracking card! Open [hiukim.github.io/mind-ar-js-doc/tools/compile](https://hiukim.github.io/mind-ar-js-doc/tools/compile/) on your computer, drag in a new high-contrast picture, download the `.mind` file, replace `assets/card.mind`, and see how the scanner tracks your new card!"*

---

## 🏆 Student Sandbox Challenges (01:45 - 02:00)
*Encourage students to implement one of the three challenges documented in `INSTRUCTIONS.md` to reinforce learning, walking around to assist with any questions.*
- **Challenge 1:** Scale adjustments and adding floating 3D objects (e.g., adding a rotating `<a-box>` next to the video plane).
- **Challenge 2:** Custom style indicators (modifying the scanning guide UI classes).
- **Challenge 3:** Creating a custom anchor target card from scratch.
