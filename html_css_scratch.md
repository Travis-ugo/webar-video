# 🚀 Teaching Script: HTML & CSS from Scratch (For May)

*This document contains the step-by-step teaching sequence, word-for-word lecture scripts, and hands-on guidance prompts for teaching May HTML and CSS from scratch.*

---

## 📅 Session Outline
*   **Module 0: VS Code Setup & Extensions** (10 mins)
*   **Module 1: The Core Analogy & Big Picture** (10 mins)
*   **Module 2: HTML Anatomy & The Skeleton** (20 mins)
*   **Module 3: CSS Basics & Selecting Elements** (20 mins)
*   **Module 4: The Box Model & Layout Magic** (20 mins)
*   **Module 5: Code-Along Project (The Interactive Profile Card)** (30 mins)

---

## 💻 Module 0: VS Code Setup & Extensions (10 mins)

### 🗣️ What to Say (Word-for-Word Script)
> *"Before we start coding, let's make sure your editor is set up like a professional developer's workspace. We are using VS Code, and we're going to install four extensions that will make coding much easier and prevent common mistakes.*
>
> *Click on the Extensions icon on the left sidebar (it looks like four blocks with one popping out) and search for and install these:*
>
> 1. ***Live Server*** *(by Ritwick Dey): Instead of double-clicking our file and manually refreshing the browser every single time we write code, Live Server launches a mini-server. The moment you save your file, the browser automatically refreshes to show your changes instantly!*
> 2. ***Auto Rename Tag*** *(by Jun Han): One of the most common mistakes beginners make is changing an opening HTML tag and forgetting to change the closing tag. This extension automatically changes the closing tag for you as you type the opening tag.*
> 3. ***Prettier - Code Formatter*** *(by Prettier): As you type code, it might get messy, unaligned, or hard to read. Prettier automatically formats your HTML and CSS the second you save, keeping your indentation clean and beautiful.*
> 4. ***Color Highlight*** *(by Sergii Naumov): In CSS, we write colors as hex codes like `#6366f1` or `#ec4899`. This extension highlights the text with the actual color behind it in VS Code, so you can immediately see what colors you are using without opening the page.*
>
> *Once you have these installed, we're ready to look at our first concept!"*

---

## 🎙️ Module 1: The Core Analogy & Big Picture (10 mins)

### 🗣️ What to Say (Word-for-Word Script)
> *"Hey May! Welcome to coding. We are going to build web pages together today. Before we look at any code, let's understand how a webpage is built.*
>
> *Every webpage you visit on the internet—like Google, Instagram, or YouTube—is constructed using two core building blocks: **HTML** and **CSS**.*
>
> *Let's use an analogy. Imagine you are styling a person:*
>
> 1. ***HTML (HyperText Markup Language) is the Skeleton.*** *It defines the structure and where things go. It says, 'Put a head here, hands here, and feet here.' In web terms, it says, 'Put a heading here, a paragraph of text under it, and an image below that.'*
> 2. ***CSS (Cascading Style Sheets) is the Outfit and Styling.*** *It defines the colors, clothes, hair, and makeup. In web terms, CSS says, 'Make that heading purple, make the paragraph font larger, and round the corners of that image to make it a circle.'*
>
> *Without HTML, you have absolutely nothing to show. Without CSS, your page looks like a plain black-and-white word document from 1991. When you combine them, you get a beautiful, interactive web application.*
>
> *Let’s dive into HTML first!"*

---

## 🧱 Module 2: HTML Anatomy & The Skeleton (20 mins)

### 🗣️ What to Say (Word-for-Word Script)
> *"HTML is made up of **elements**, and we define these elements using **tags**.*
>
> *Look at this standard text line:*
>
> ```html
> <p>Hello, May! Welcome to coding.</p>
> ```
>
> *Notice three things here:*
> 1. *The **Opening Tag** `<p>`: This tells the browser: 'Hey, a paragraph starts right here.'*
> 2. *The **Content** 'Hello, May! Welcome to coding.': This is the actual text that will appear on screen.*
> 3. *The **Closing Tag** `</p>`: Note the slash `/`. This tells the browser: 'The paragraph ends here. Stop styling it as paragraph text.'*
>
> *Some tags need to hold extra information. For example, if we want to build a clickable link to Google, we write:*
>
> ```html
> <a href="https://google.com">Go to Google</a>
> ```
>
> *Here, `href` is called an **attribute**. It lives inside the opening tag and tells the link exactly where to send the user when they click it.*
>
> *Now, let's look at the basic template of every HTML page. Every webpage has this structural skeleton:*
>
> ```html
> <!DOCTYPE html>
> <html>
>   <head>
>     <title>May's First Webpage</title>
>   </head>
>   <body>
>     <h1>Welcome to My Site!</h1>
>     <p>I am building this myself.</p>
>   </body>
> </html>
> ```
>
> *Here is what this means:*
> *   `<!DOCTYPE html>` *tells the browser we are using modern HTML.*
> *   `<html>` *wraps the whole document.*
> *   `<head>` *is the 'brain' section. The user doesn’t see this on the main page, but it contains things like the page title shown on the browser tab.*
> *   `<body>` *is the 'body' section. Everything written inside here is what actually displays on screen.*
>
> *Let's check out some essential tags you'll use all the time:*
> *   `<h1>` *to* `<h6>` *are for headings. `<h1>` is the biggest, `<h6>` is the smallest.*
> *   `<p>` *is for regular paragraph text.*
> *   `<img>` *is for images. It doesn't need a closing tag because it doesn't wrap text—it just inserts a picture! We use `<img src="link-to-image.jpg">`.*
> *   `<div>` *is a generic box. Think of it like a cardboard container. We use it to group multiple tags together so we can style them as one unit."*

---

## 🎨 Module 3: CSS Basics & Selecting Elements (20 mins)

### 🗣️ What to Say (Word-for-Word Script)
> *"Now that we know how to write the skeleton with HTML, let's learn how to dress it up with CSS.*
>
> *CSS is a list of design rules. Each rule targets an element and changes its style properties. The syntax looks like this:*
>
> ```css
> selector {
>   property: value;
> }
> ```
>
> *For example, if we want all paragraphs on our page to be blue and have large text, we write:*
>
> ```css
 p {
   color: blue;
   font-size: 18px;
 }
> ```
>
> *But what if we have five paragraphs on our page, and we only want to make **one** of them look special? If we just use `p`, it will style all of them. To solve this, we use **Classes**.*
>
> *In HTML, we label that specific paragraph with a class attribute:*
>
> ```html
> <p class="special-text">This is unique!</p>
> <p>This is just normal text.</p>
> ```
>
> *Then, in our CSS, we target that class by putting a **dot** `.` in front of it:*
>
> ```css
> .special-text {
>   color: orange;
>   font-weight: bold;
> }
> ```
>
> *The dot tells CSS: 'Look for any element with the class name "special-text" and apply these styles to it.' This lets us design reusable themes easily!"*

---

## ↔️ Module 4: The Box Model & Layout Magic (20 mins)

### 🗣️ What to Say (Word-for-Word Script)
> *"Before we write our project, there are two crucial layout concepts we need to cover: the **Box Model** and **Flexbox**.*
>
> *First, the **Box Model**. In CSS, every single element on the page is treated as a rectangular box. Even circular profile pictures are just square boxes styled to look round!*
>
> *Each box has four layers:*
> 1. ***Content**: The actual text or image itself.*
> 2. ***Padding**: The inner space between the content and its border. Imagine it like bubble wrap protecting an item in a package. It creates breathing room inside the box.*
> 3. ***Border**: The line drawn around the padding.*
> 4. ***Margin**: The outer space surrounding the border. It pushes neighboring elements away, creating space between separate boxes.*
>
> *If you want a button to look big and clickable, you add **padding**. If you want a button to sit further away from a paragraph, you add **margin**.*
>
> *Second, **Flexbox**. How do we arrange multiple boxes side-by-side or center them on the screen? We use Flexbox.*
>
> *We tell the parent container box to behave as a flex container:*
>
> ```css
> .container {
>   display: flex;
> }
> ```
>
> *Once we do that, we can easily control the layout of everything inside it:*
> *   `justify-content: center;` *centers the items horizontally (left-to-right).*
> *   `align-items: center;` *centers the items vertically (top-to-bottom).*
> *   `flex-direction: column;` *stacks the items vertically like a list, instead of keeping them side-by-side.*
>
> *Let's build a real project now and put all of this into practice!"*

---

## 🛠️ Module 5: Code-Along Project (The Profile Card) (30 mins)

### 🗣️ What to Say (Word-for-Word Script)
> *"Let's open our text editor and create a new file. Save it as `index.html` on your desktop.*
>
> *Copy and paste this complete code template into your file:*
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
> <head>
>   <meta charset="UTF-8">
>   <meta name="viewport" content="width=device-width, initial-scale=1.0">
>   <title>May's Profile Card</title>
>   
>   <style>
>     /* Global Page Layout */
>     body {
>       font-family: sans-serif;
>       background: linear-gradient(135deg, #0f172a, #1e293b);
>       color: #f1f5f9;
>       display: flex;
>       justify-content: center;
>       align-items: center;
>       height: 100vh;
>       margin: 0;
>     }
> 
>     /* Profile Card Container */
>     .profile-card {
>       background: rgba(255, 255, 255, 0.05);
>       backdrop-filter: blur(10px);
>       border: 1px solid rgba(255, 255, 255, 0.1);
>       border-radius: 20px;
>       padding: 30px;
>       width: 300px;
>       text-align: center;
>       box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
>       transition: transform 0.3s ease;
>     }
> 
>     /* Card Hover Effect */
>     .profile-card:hover {
>       transform: translateY(-5px);
>     }
> 
>     /* Profile Image */
>     .profile-img {
>       width: 100px;
>       height: 100px;
>       border-radius: 50%;
>       border: 3px solid #6366f1;
>       object-fit: cover;
>       margin-bottom: 15px;
>     }
> 
>     h1 {
>       font-size: 24px;
>       margin: 10px 0;
>     }
> 
>     .role {
>       color: #6366f1;
>       font-weight: bold;
>       font-size: 14px;
>       text-transform: uppercase;
>       margin-bottom: 15px;
>     }
> 
>     p {
>       font-size: 14px;
>       color: #94a3b8;
>       line-height: 1.6;
>       margin-bottom: 25px;
>     }
> 
>     /* Link Button */
>     .contact-btn {
>       display: inline-block;
>       text-decoration: none;
>       background: #6366f1;
>       color: white;
>       padding: 10px 20px;
>       border-radius: 20px;
>       font-weight: bold;
>       transition: background 0.3s ease;
>     }
> 
>     .contact-btn:hover {
>       background: #4f46e5;
>     }
>   </style>
> </head>
> <body>
> 
>   <div class="profile-card">
>     <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="Profile Picture" class="profile-img">
>     <h1>May</h1>
>     <div class="role">Developer in Training</div>
>     <p>I am learning HTML and CSS from scratch. I built this beautiful glass card layout today!</p>
>     <a href="#" class="contact-btn">Say Hello</a>
>   </div>
> 
> </body>
> </html>
> ```
>
> *Now, save the file, go to your Desktop, and double-click `index.html`. It will open in your web browser.*
>
> *Look at that! You built a stunning, modern card with a smooth gradient background, a circular image target, and glassmorphism styling.*
>
> *Let's do some live modifications together to see how changing CSS rules updates our design:*
>
> 1. *Find the `h1` tag inside the HTML body. Change 'May' to your full name, save, and refresh the browser.*
> 2. *Find the color `#6366f1` in the CSS under `.role`. Let's change it to `#ec4899` (which is pink) or `#10b981` (which is emerald green). Save and refresh.*
> 3. *Find `.profile-card:hover` in the CSS. Let's add `background: rgba(255, 255, 255, 0.1);` inside the curly brackets to make the glass card glow brighter when you hover over it.*
>
> *Play around with it. You've officially written your first piece of web software!"*
