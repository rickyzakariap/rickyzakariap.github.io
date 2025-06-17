# Interactive Birthday Card Website

This is a charming, animated, and interactive single-page website designed as a digital birthday greeting card. The project showcases a sequence of heartfelt messages and visual effects, creating a memorable and personalized birthday experience.

The core of this project is its animation timeline, built with GSAP (GreenSock Animation Platform), which orchestrates a step-by-step story for the birthday person.

---

### ✨ Features

* **Sequential Animation:** A story-like presentation of messages that appear and disappear in a beautifully timed sequence.
* **Interactive Music Prompt:** Asks the user for permission to play background music using a SweetAlert2 pop-up.
* **Dynamic Text Animation:** Individual characters in headings and messages are animated for a creative effect.
* **Visual Effects:** Includes animated balloons, confetti-like effects, and other moving elements to create a festive atmosphere.
* **Personalized Elements:** Features a dedicated space for a profile picture and a personalized birthday wish.
* **Replay Functionality:** A "Watch Again" button that allows the user to restart the entire animation sequence.
* **Fully Responsive:** The design and animations are optimized to work smoothly on both desktop and mobile devices.

---

### 🛠️ Technologies Used

* **HTML5:** For the structure of the greeting card.
* **CSS3:** For all the styling, positioning, and responsive design using media queries.
* **JavaScript (ES6+):** For the core logic and event handling.
* **GSAP (GreenSock Animation Platform):** The primary tool used to create the complex and smooth animation timeline.
* **SweetAlert2:** A JavaScript library used to create the beautiful and responsive pop-up prompt for playing music.

---

### 🚀 How to Run

This is a static website and can be run locally without any special setup.

1.  Clone or download this repository.
2.  Ensure you have all the necessary assets (`img/`, `music/`, `main.css`, `main.js`) in the correct folders.
3.  Open the `index.html` file in any modern web browser.

---

### 📂 Folder Structure

The project uses the following folder structure:

```
/
├── img/
│   ├── adek.jpg
│   ├── ballon1.svg, ballon2.svg, ...
│   └── hat.svg
├── music/
│   └── glue.mpeg (or hbd.mp3)
├── index.html
├── main.css
└── main.js
```

---

### 🎨 Customization

To personalize this greeting card for someone else:

* **Names & Messages:** Edit the text directly in the `index.html` file. You can change the name in `<span id="name">` and all other messages in the various `<p>` and `<h3>` tags.
* **Profile Picture:** Replace the image file (e.g., `adek.jpg` or `gita.jpg`) inside the `img/` folder with your own picture. Make sure to update the filename in `index.html` if it's different.
* **Music:** Replace the audio file (e.g., `glue.mpeg` or `hbd.mp3`) in the `music/` folder and update the `src` in the `<audio>` tag in `index.html`.
* **Colors & Fonts:** All colors and fonts can be easily changed at the top of the `main.css` file.
