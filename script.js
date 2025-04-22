// DOM Elements
const wrapper = document.getElementById("wrapper");
const slider = document.getElementById("slider");
const sizeValue = document.getElementById("size-value");
const speedSlider = document.getElementById("speed-slider");
const speedValue = document.getElementById("speed-value");
const generateBtn = document.getElementById("generate-btn");
const sortBtn = document.getElementById("sort-btn");
const algorithmButtons = document.querySelectorAll(".algorithms button");
const themeToggle = document.getElementById("theme-toggle");

// Global variables
let bars = [];
let animationSpeed = 50;
let isSorting = false;
let currentAlgorithm = null;
let animationFrameId = null;

// Initialize
function initialize() {
    updateSizeDisplay();
    randomizeBars();
    setEventListeners();
    // Set default algorithm to Bubble Sort
    currentAlgorithm = getAnimationsBubbleSort;
    algorithmButtons[4].classList.add("active");
}

// Update array size display
function updateSizeDisplay() {
    sizeValue.textContent = slider.value;
}

// Generate random bars
function randomizeBars() {
    wrapper.innerHTML = "";
    bars = [];
    
    const arraySize = parseInt(slider.value);
    const wrapperWidth = wrapper.clientWidth;
    const barWidth = Math.max(2, wrapperWidth / arraySize - 2);
    
    for (let i = 0; i < arraySize; i++) {
        const bar = document.createElement("div");
        bar.classList.add("array");
        const height = Math.max(5, Math.random() * 100);
        bar.style.height = `${height}%`;
        bar.style.width = `${barWidth}px`;
        bar.style.margin = "0 1px";
        wrapper.appendChild(bar);
        bars.push(bar);
    }
}

// Set all event listeners
function setEventListeners() {
    // Slider events
    slider.addEventListener("input", () => {
        if (!isSorting) {
            updateSizeDisplay();
            randomizeBars();
        }
    });
    
    // Speed slider events
    speedSlider.addEventListener("input", () => {
        const speed = speedSlider.value;
        if (speed < 33) {
            animationSpeed = 100;
            speedValue.textContent = 'Slow';
        } else if (speed < 66) {
            animationSpeed = 50;
            speedValue.textContent = 'Medium';
        } else {
            animationSpeed = 10;
            speedValue.textContent = 'Fast';
        }
    });
    
    // Generate new array button
    generateBtn.addEventListener("click", () => {
        if (!isSorting) randomizeBars();
    });
    
    // Sort button
    sortBtn.addEventListener("click", () => {
        if (!isSorting && currentAlgorithm) {
            startSorting();
        }
    });
    
    // Algorithm selection buttons
    algorithmButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (!isSorting) {
                // Remove active class from all buttons
                algorithmButtons.forEach(btn => {
                    btn.classList.remove("active");
                    btn.classList.remove("sorting");
                });
                
                // Add active class to clicked button
                button.classList.add("active");
                
                // Set current algorithm based on index
                const algorithms = [
                    getAnimationsSelectionSort,
                    getAnimationsMergeSort,
                    getAnimationsQuickSort,
                    getAnimationsHeapSort,
                    getAnimationsBubbleSort
                ];
                currentAlgorithm = algorithms[index];
            }
        });
    });
    
    // Theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        
        // Update icon
        const icon = themeToggle.querySelector("i");
        if (document.body.classList.contains("dark-theme")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
        
        // Save preference to localStorage
        const isDark = document.body.classList.contains("dark-theme");
        localStorage.setItem("darkTheme", isDark);
    });
}

// Start sorting visualization
function startSorting() {
    if (!currentAlgorithm) return;
    
    isSorting = true;
    disableControls();
    
    // Highlight the active button as sorting
    const activeButton = document.querySelector(".algorithms button.active");
    if (activeButton) {
        activeButton.classList.add("sorting");
    }
    
    const heights = Array.from(bars).map(bar => 
        parseInt(bar.style.height)
    );
    
    const animations = currentAlgorithm([...heights]);
    animateSorting(animations);
}

// Animate the sorting process
function animateSorting(animations) {
    let i = 0;
    const arrayColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--light-array').trim();
    const highlightColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--highlight-color').trim();
    const swapColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--swap-color').trim();
    const sortedColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--sorted-color').trim();
    
    function processAnimation() {
        if (i >= animations.length) {
            finishSorting();
            return;
        }
        
        const [action, indices] = animations[i];
        
        switch (action) {
            case "compare":
                // Highlight compared elements
                indices.forEach(index => {
                    bars[index].style.backgroundColor = highlightColor;
                });
                break;
                
            case "swap":
                // Swap heights
                const [first, second] = indices;
                const tempHeight = bars[first].style.height;
                bars[first].style.height = bars[second].style.height;
                bars[second].style.height = tempHeight;
                
                // Color for swap
                bars[first].style.backgroundColor = swapColor;
                bars[second].style.backgroundColor = swapColor;
                break;
                
            case "overwrite":
                // For merge sort - set new height
                const [index, newHeight] = indices;
                bars[index].style.height = `${newHeight}%`;
                bars[index].style.backgroundColor = swapColor;
                break;
                
            case "sorted":
                // Mark as sorted
                indices.forEach(index => {
                    bars[index].style.backgroundColor = sortedColor;
                });
                break;
        }
        
        i++;
        
        // Reset colors after delay
        setTimeout(() => {
            if (action !== "sorted" && action !== "overwrite") {
                indices.forEach(index => {
                    bars[index].style.backgroundColor = arrayColor;
                });
            }
            
            if (i < animations.length) {
                animationFrameId = requestAnimationFrame(processAnimation);
            }
        }, animationSpeed);
    }
    
    animationFrameId = requestAnimationFrame(processAnimation);
}

// Finish sorting
function finishSorting() {
    isSorting = false;
    enableControls();
    
    // Restore active button state
    const activeButton = document.querySelector(".algorithms button.active");
    if (activeButton) {
        activeButton.classList.remove("sorting");
    }
    
    // Mark all bars as sorted
    const sortedColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--sorted-color').trim();
    bars.forEach(bar => {
        bar.style.backgroundColor = sortedColor;
    });
}

// Disable controls during sorting
function disableControls() {
    slider.disabled = true;
    generateBtn.disabled = true;
    sortBtn.disabled = true;
    algorithmButtons.forEach(btn => btn.disabled = true);
}

// Enable controls after sorting
function enableControls() {
    slider.disabled = false;
    generateBtn.disabled = false;
    sortBtn.disabled = false;
    algorithmButtons.forEach(btn => btn.disabled = false);
}

// SELECTION SORT
function getAnimationsSelectionSort(array) {
    const animations = [];
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            animations.push(["compare", [j, minIndex]]);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            animations.push(["swap", [i, minIndex]]);
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
        animations.push(["sorted", [i]]);
    }
    animations.push(["sorted", [array.length - 1]]);
    return animations;
}

// BUBBLE SORT
function getAnimationsBubbleSort(array) {
    const animations = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            animations.push(["compare", [j, j + 1]]);
            if (array[j] > array[j + 1]) {
                animations.push(["swap", [j, j + 1]]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
        animations.push(["sorted", [array.length - 1 - i]]);
    }
    return animations;
}

// MERGE SORT (CORRECTED IMPLEMENTATION)
function getAnimationsMergeSort(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    
    merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    
    while (i <= middleIdx && j <= endIdx) {
        animations.push(["compare", [i, j]]);
        
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push(["overwrite", [k, auxiliaryArray[i]]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push(["overwrite", [k, auxiliaryArray[j]]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    
    while (i <= middleIdx) {
        animations.push(["overwrite", [k, auxiliaryArray[i]]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    
    while (j <= endIdx) {
        animations.push(["overwrite", [k, auxiliaryArray[j]]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
    
    for (let x = startIdx; x <= endIdx; x++) {
        animations.push(["sorted", [x]]);
    }
}

// QUICK SORT
function getAnimationsQuickSort(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, start, end, animations) {
    if (start >= end) {
        if (start === end) {
            animations.push(["sorted", [start]]);
        }
        return;
    }
    
    const pivot = partition(array, start, end, animations);
    quickSortHelper(array, start, pivot - 1, animations);
    quickSortHelper(array, pivot + 1, end, animations);
}

function partition(array, start, end, animations) {
    const pivot = array[end];
    let i = start;
    
    for (let j = start; j < end; j++) {
        animations.push(["compare", [j, end]]);
        if (array[j] < pivot) {
            animations.push(["swap", [i, j]]);
            [array[i], array[j]] = [array[j], array[i]];
            i++;
        }
    }
    
    animations.push(["swap", [i, end]]);
    [array[i], array[end]] = [array[end], array[i]];
    
    animations.push(["sorted", [i]]);
    return i;
}

// HEAP SORT
function getAnimationsHeapSort(array) {
    const animations = [];
    buildMaxHeap(array, animations);
    
    for (let end = array.length - 1; end > 0; end--) {
        animations.push(["swap", [0, end]]);
        [array[0], array[end]] = [array[end], array[0]];
        animations.push(["sorted", [end]]);
        siftDown(array, 0, end - 1, animations);
    }
    
    animations.push(["sorted", [0]]);
    return animations;
}

function buildMaxHeap(array, animations) {
    const firstParent = Math.floor((array.length - 2) / 2);
    for (let current = firstParent; current >= 0; current--) {
        siftDown(array, current, array.length - 1, animations);
    }
}

function siftDown(array, start, end, animations) {
    let current = start;
    while (current <= end) {
        let left = current * 2 + 1;
        let right = current * 2 + 2;
        let toSwap = current;
        
        if (left <= end) {
            animations.push(["compare", [left, toSwap]]);
            if (array[left] > array[toSwap]) {
                toSwap = left;
            }
        }
        
        if (right <= end) {
            animations.push(["compare", [right, toSwap]]);
            if (array[right] > array[toSwap]) {
                toSwap = right;
            }
        }
        
        if (toSwap === current) return;
        
        animations.push(["swap", [current, toSwap]]);
        [array[current], array[toSwap]] = [array[toSwap], array[current]];
        current = toSwap;
    }
}

// Check for saved theme preference
if (localStorage.getItem("darkTheme") === "true") {
    document.body.classList.add("dark-theme");
    const icon = themeToggle.querySelector("i");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
}

// Initialize the app
window.addEventListener("load", initialize);
window.addEventListener("resize", () => {
    if (!isSorting) randomizeBars();
});