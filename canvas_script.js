// Настройки
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const sizeInput = document.getElementById('size');
const eraserButton = document.getElementById('eraser');
const saveButton = document.getElementById('save');
const loadInput = document.getElementById('load');

let drawing = false;
let currentColor = colorPicker.value;
let brushSize = parseInt(sizeInput.value, 10);

// Функция начала рисования
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Функция рисования
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.stroke();
});

// Функция остановки рисования
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

// Обновление цвета
colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
});

// Обновление размера кисти
sizeInput.addEventListener('input', () => {
    brushSize = parseInt(sizeInput.value, 10);
});

// Ластик
eraserButton.addEventListener('click', () => {
    currentColor = '#ffffff';
});

// Сохранение изображения
saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Загрузка изображения
loadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();
    reader.onload = (event) => {
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});