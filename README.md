````markdown
# Sorting Algorithm Visualizer

**Live Demo:** 🎬 https://gauravkaushik3106.github.io/Sorting-Algo-Visualization

A responsive and interactive **Sorting Algorithm Visualizer** built with **vanilla JavaScript**, **HTML**, and **CSS**. Watch how the most popular sorting algorithms operate in real-time, adjust the array size and animation speed, and switch between light/dark themes seamlessly.

---

## 🚀 Features

- **Array Size Slider**: Easily adjust the number of elements (10–200).
- **Speed Control**: Switch between **Slow**, **Medium**, and **Fast** animation speeds.
- **Randomize Array**: Generate a fresh, random set of bars at any time.
- **5 Sorting Algorithms**:
  - **Selection Sort**
  - **Merge Sort**
  - **Quick Sort**
  - **Heap Sort**
  - **Bubble Sort**
- **Theme Toggle**: Light and dark mode support, with preference saved via `localStorage`.
- **Responsive Design**: Bars dynamically resize on window resize for consistent visuals.

---

## 🛠️ Technologies Used

- **JavaScript (ES6+)** for core logic and smooth animations using `requestAnimationFrame`
- **HTML5** & **CSS3** with CSS variables for easy theming
- **No build tools** required—just open `index.html` in your browser!

---

## 📦 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gauravkaushik3106/Sorting-Algo-Visualization.git
   cd Sorting-Algo-Visualization
````

2. **Open** `index.html` in your favorite browser.

That's it! No additional setup needed.

---

## ⚙️ Usage

1. Move the **Array Size** slider to select the number of bars.
2. Adjust the **Speed** slider—labels change to Slow, Medium, or Fast.
3. Click **Generate New Array** to get a fresh random dataset.
4. Select a sorting algorithm button.
5. Hit **Sort** and enjoy the visualization.
6. Toggle the theme icon (🌙/☀️) to switch between modes.

---

## 🎨 Customization

* **Colors**: Tweak CSS variables in `styles.css`:

  ```css
  :root {
    --light-array: #74b9ff;
    --highlight-color: #ffeaa7;
    --swap-color: #ff7675;
    --sorted-color: #00b894;
  }
  ```
* **Default Algorithm**: Modify the default in `script.js` under `initialize()`.
* **Animation Speed Thresholds**: Adjust in the speed slider event listener.

---

## 📂 Project Structure

```plaintext
Sorting-Algo-Visualization/
├── index.html
├── styles.css
├── script.js
└── README.md
```

---

## 🚧 Future Improvements

* Add more algorithms (e.g., Shell Sort, Radix Sort)
* Mobile-specific UI enhancements
* Optional sound effects for operations
* Performance tweaks for very large arrays

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## 📄 License

This project is MIT licensed—see the [LICENSE](LICENSE) file for details.

```
```
