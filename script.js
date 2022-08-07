const default_size = 16;
const default_color = '#000000';
const default_mode = 'color';

let currentSize = default_size;
let currentColor = default_color;
let currentMode = default_mode;

const grid = document.getElementById('grid-container');

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
    }
}


window.onload = () => {
    createGrid(default_size);
};  