const imageUpload = document.getElementById('imageUpload');
const imgElement = document.getElementById('img');
const classifyBtn = document.getElementById('classifyBtn');
const predictionResult = document.getElementById('predictionResult');
let model;

// Load the MobileNet model
mobilenet.load().then(loadedModel => {
    model = loadedModel;
    console.log('MobileNet model loaded successfully.');
});

// Event listener for file input
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        imgElement.src = e.target.result; // Set the chosen image
    };
    reader.readAsDataURL(file);
});

// Event listener for classification button
classifyBtn.addEventListener('click', () => {
    if (imgElement.src) {
        model.classify(imgElement).then(predictions => {
            console.log('Predictions:', predictions);
            predictionResult.innerText = `Predicted: ${predictions[0].className}, Probability: ${(predictions[0].probability * 100).toFixed(2)}%`; // Updated to show percentage
        }).catch(err => {
            console.error('Error in classification:', err);
            predictionResult.innerText = 'Error in classification.';
        });
    } else {
        predictionResult.innerText = 'Please select an image first!';
    }
});
