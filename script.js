const default_size = 16;
const default_color = '#000000';
const default_mode = 'color';

let currentSize = default_size;
let currentColor = default_color;
let currentMode = default_mode;

const grid = document.getElementById('grid-container');
const colorPick = document.getElementById('color-pick');
const colorBtn = document.getElementById('color-btn');
const rgbBtn = document.getElementById('rgb-btn');
const eraseBtn = document.getElementById('erase-btn');
const clearBtn = document.getElementById('clear-btn');
const smlSizeBtn = document.getElementById('sml-size-btn');
const medSizeBtn = document.getElementById('med-size-btn');
const lgeSizeBtn = document.getElementById('lge-size-btn');

colorPick.oninput = (e) => setNewColor(e.target.value);
colorBtn.onclick = () => setMode('color');
rgbBtn.onclick = () => setMode('rgb');
eraseBtn.onclick = () => setMode('erase');
clearBtn.onclick = () => reloadGrid();
smlSizeBtn.onclick = (e) => changeSize(e.target.value);
medSizeBtn.onclick = (e) => changeSize(e.target.value);
lgeSizeBtn.onclick = (e) => changeSize(e.target.value);

function setNewColor(newColor) {
    currentColor = newColor
}

function setMode(newMode) {
    selectedBtn(newMode)
    currentMode = newMode
}

function reloadGrid() {
    clearGrid()
    createGrid(currentSize)
}

function clearGrid() {
    grid.innerHTML = ''
}

function setSize(newSize) {
    currentSize = newSize
}

function changeSize(value) {
    setSize(value)
    reloadGrid()
}

function reloadGrid() {
    clearGrid()
    createGrid(currentSize)
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


function createGrid (size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size * size; i++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.addEventListener('mouseover', changeColor);
        gridCell.addEventListener('mousedown', changeColor);
        grid.appendChild(gridCell);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'rgb') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'erase') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function selectedBtn(newMode) {
    if (currentMode === 'rgb') {
      rgbBtn.classList.remove('selected-btn')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('selected-btn')
    } else if (currentMode === 'erase') {
      eraseBtn.classList.remove('selected-btn')
    }
  
    if (newMode === 'rgb') {
      rgbBtn.classList.add('selected-btn')
    } else if (newMode === 'color') {
      colorBtn.classList.add('selected-btn')
    } else if (newMode === 'erase') {
      eraseBtn.classList.add('selected-btn')
    }
  }

window.onload = () => {
    createGrid(default_size);
    selectedBtn(default_mode);
};  