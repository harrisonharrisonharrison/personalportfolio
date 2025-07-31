const xSlider = document.getElementById('x-slider');
const ySlider = document.getElementById('y-slider');
const zSlider = document.getElementById('z-slider');
const bSlider = document.getElementById('b-slider');

const xValue = document.getElementById('x-value');
const yValue = document.getElementById('y-value');
const zValue = document.getElementById('z-value');
const bValue = document.getElementById('b-value');

export const lightPosition = { x: parseFloat(xValue.textContent), y: parseFloat(yValue.textContent), z: parseFloat(zValue.textContent), brightness: parseFloat(bValue.textContent) };

xSlider.addEventListener('input', function() {
    xValue.textContent = this.value;
    lightPosition.x = this.value;
});

ySlider.addEventListener('input', function() {
    yValue.textContent = this.value;
    lightPosition.y = this.value;
});

zSlider.addEventListener('input', function() {
    zValue.textContent = this.value;
    lightPosition.z = this.value;
});

bSlider.addEventListener('input', function() {
    bValue.textContent = this.value;
    lightPosition.brightness = this.value;
});