document.getElementById('generateBtn').addEventListener('click', async () => {
    const textInput = document.getElementById('textInput').value;

    if (!textInput) {
        alert("Please enter text!");
        return;
    }

    try {
        const response = await fetch(`/generate-image?text=${encodeURIComponent(textInput)}`);
        const data = await response.json();

        if (data.imageUrl) {
            const generatedImage = document.getElementById('generatedImage');
            generatedImage.src = data.imageUrl;
            generatedImage.style.display = 'block';

            const downloadBtn = document.getElementById('downloadBtn');
            downloadBtn.style.display = 'inline-block';
            downloadBtn.href = data.imageUrl;
            downloadBtn.download = 'generated-image.jpg';
        } else {
            alert("Failed to generate image. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});

// Adjust filters
const generatedImage = document.getElementById('generatedImage');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const saturationInput = document.getElementById('saturation');

brightnessInput.addEventListener('input', updateFilters);
contrastInput.addEventListener('input', updateFilters);
saturationInput.addEventListener('input', updateFilters);

function updateFilters() {
    const brightness = brightnessInput.value;
    const contrast = contrastInput.value;
    const saturation = saturationInput.value;

    generatedImage.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
}

// Apply grayscale filter
document.getElementById('grayscaleBtn').addEventListener('click', () => {
    generatedImage.style.filter = 'grayscale(100%)';
});

// Apply inverse filter
document.getElementById('inverseBtn').addEventListener('click', () => {
    generatedImage.style.filter = 'invert(100%)';
});
