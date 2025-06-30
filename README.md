````markdown
# Sorting Algorithm Visualizer

[Live Demo](https://gauravkaushik3106.github.io/Sorting-Algo-Visualization/)

A responsive and interactive sorting algorithm visualizer built with vanilla JavaScript, HTML, and CSS. Visualize how different sorting algorithms work in real-time, with adjustable array size and animation speed, as well as light/dark theme support.

## Features

- **Array Size Slider**: Adjust the number of elements to sort (10–200).
- **Speed Control**: Choose between Slow, Medium, and Fast animation speeds.
- **Generate Random Array**: Quickly generate a new random set of bars.
- **Five Algorithms**:
  - **Selection Sort**
  - **Merge Sort**
  - **Quick Sort**
  - **Heap Sort**
  - **Bubble Sort**
- **Theme Toggle**: Switch between light and dark themes; preference saved in `localStorage`.
- **Responsive Design**: Resizes bars on window resize for a consistent experience.

## Technologies

- **JavaScript (ES6+)**: Core logic and DOM manipulation
- **HTML5 & CSS3**: Structure and styling
- **CSS Variables**: Easily customizable colors
- **`requestAnimationFrame`**: Smooth animation loop

## Getting Started

Follow these steps to run the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/gauravkaushik3106/Sorting-Algo-Visualization.git
   cd Sorting-Algo-Visualization
````

2. **Open in Browser**

   Simply open `index.html` in your favorite browser. No build tools or server required.

## Usage

1. Use the **Array Size** slider at the top to set the number of bars.
2. Use the **Speed** slider to adjust animation speed; labels update automatically.
3. Click **Generate New Array** to randomize bar heights.
4. Select any sorting algorithm button.
5. Click **Sort** to start the visualization.
6. Toggle the theme icon to switch between light and dark modes.

## Customization

* **Colors**: Modify CSS variables in `styles.css`:

  ```css
  :root {
    --light-array: #74b9ff;
    --highlight-color: #ffeaa7;
    --swap-color: #ff7675;
    --sorted-color: #00b894;
  }
  ```
* **Default Algorithm**: Change the default algorithm in `script.js` within the `initialize()` function.
* **Animation Speed**: Tweak thresholds or values in the speed slider event listener.

## Folder Structure

```
Sorting-Algo-Visualization/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Future Improvements

* Add more algorithms (e.g., Radix Sort, Shell Sort).
* Mobile-friendly UI tweaks.
* Sound effects for comparisons and swaps.
* Performance optimizations for very large arrays.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repo
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```
```
