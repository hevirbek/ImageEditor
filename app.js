const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('canvas');

const handleChange = (e) => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = e.target.result;
        const img = new Image();
        img.src = data;
        img.onload = () => {
            let imgHeight = img.height;
            let imgWidth = img.width;
            let ratio = imgHeight / imgWidth;
            let canvasHeight = 600;
            let canvasWidth = canvasHeight / ratio;
            if (canvasWidth > 800) {
                canvasWidth = 800;
                canvasHeight = canvasWidth * ratio;
            }
            if (canvasHeight > 600) {
                canvasHeight = 600;
                canvasWidth = canvasHeight / ratio;
            }
            let startX = (800 - canvasWidth) / 2;
            let startY = (600 - canvasHeight) / 2;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, startX, startY, canvasWidth, canvasHeight);
        }
    }

    reader.readAsDataURL(file);
}


fileInput.addEventListener('change', (e) => {
    handleChange(e);
}
)


const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const saturation = document.getElementById('saturation');
const hue = document.getElementById('hue');
const grayscale = document.getElementById('grayscale');
const sepia = document.getElementById('sepia');
const invert = document.getElementById('invert');
const blur = document.getElementById('blur');

const rangeList = [brightness, contrast, saturation, hue, grayscale, sepia, invert, blur];


const handleRangeChange = (e) => {
    const ctx = canvas.getContext('2d');
    const filters = {
        brightness: brightness.value,
        contrast: contrast.value,
        saturation: saturation.value,
        hue: hue.value,
        grayscale: grayscale.value,
        sepia: sepia.value,
        invert: invert.value,
        blur: blur.value
    }
    ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) sepia(${filters.sepia}%) hue-rotate(${filters.hue}deg) blur(${filters.blur}px) grayscale(${filters.grayscale}%) invert(${filters.invert}%)`;
    handleChange(fileInput);
}

rangeList.forEach(filter => {
    filter.addEventListener('input', (e) => {
        handleRangeChange(e);
    }
    )
}
)


const save = document.getElementById('save');

save.addEventListener('click', (e) => {
    // download part of the canvas
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
)

