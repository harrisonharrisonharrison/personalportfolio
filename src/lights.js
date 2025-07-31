const xSlider = document.getElementById('x-slider');
const ySlider = document.getElementById('y-slider');
const zSlider = document.getElementById('z-slider');

const xValue = document.getElementById('x-value');
const yValue = document.getElementById('y-value');
const zValue = document.getElementById('z-value');

xSlider.addEventListener('input', function() {
    xValue.textContent = this.value;
});

ySlider.addEventListener('input', function() {
    yValue.textContent = this.value;
});

zSlider.addEventListener('input', function() {
    zValue.textContent = this.value;
});