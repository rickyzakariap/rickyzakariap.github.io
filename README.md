# 🎂 Interactive Birthday Card Website [ARCHIVE]

This is a charming, animated, and interactive single-page website designed as a digital birthday greeting card. The project showcases a sequence of heartfelt messages and visual effects, creating a memorable and personalized birthday experience.

The core of this project is its animation timeline, built with **GSAP (GreenSock Animation Platform)**, which orchestrates a step-by-step story for the birthday person.

---

## ✨ Features

- **Sequential Animation:** Story-like presentation of messages that appear and disappear in a beautifully timed sequence.
- **Interactive Music Prompt:** Asks the user for permission to play background music using a SweetAlert2 pop-up.
- **Dynamic Text Animation:** Individual characters in headings and messages are animated for a creative effect.
- **Visual Effects:** Animated balloons, confetti, and festive elements.
- **Personalized Elements:** Profile picture and custom birthday wish.
- **Replay Functionality:** "Watch Again" button to restart the animation.
- **Fully Responsive:** Works smoothly on both desktop and mobile devices.

---

## 🛠️ Technologies Used

- **HTML5** — Structure
- **CSS3** — Styling, positioning, and responsive design
- **JavaScript (ES6+)** — Core logic and event handling
- **GSAP** — Animation timeline
- **SweetAlert2** — Beautiful pop-up for music prompt

---

## 🚀 How to Run

This is a static website and can be run locally without any special setup:

1. **Clone or download** this repository.
2. Ensure you have all the necessary assets (`img/`, `music/`, `main.css`, `main.js`) in the correct folders.
3. **Open** the `index.html` file in any modern web browser.

---

## 📂 Folder Structure

```
/
├── img/
│   ├── adek.jpg (or your-gf.png)
│   ├── ballon1.svg, ballon2.svg, ...
│   └── hat.svg
├── music/
│   └── glue.mpeg (or your-music.mpeg)
├── index.html
├── style/
│   └── main.css
├── script/
│   └── main.js
```

---

## 🎨 Customization

- **Names & Messages:** Edit the text in `index.html` (e.g., `<span id="name">` and other messages).
- **Profile Picture:** Replace the image in `img/` and update the filename in `index.html` if needed.
- **Music:** Replace the audio file in `music/` and update the `<audio>` tag in `index.html`.
- **Colors & Fonts:** Easily change at the top of `main.css`.

---

## 💡 Tips
- Use high-quality images for best results.
- Test on both desktop and mobile for the best experience.
- Have fun personalizing the card for your loved one!

---

**Enjoy and make someone's birthday extra special!** 🥳
