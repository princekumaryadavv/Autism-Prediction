let currentFeature = 1;
let totalFeatures = 66;
let featureValues = [];

// Listen for Enter key on the input field
document.getElementById('feature-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitAnswer();
    }
});

function submitAnswer() {
    const inputBox = document.getElementById('feature-input');
    const value = parseFloat(inputBox.value);

    if (isNaN(value)) {
        alert("Please enter a valid number");
        return;
    }

    featureValues.push(value);
    inputBox.value = "";

    if (currentFeature < totalFeatures) {
        currentFeature++;
        document.querySelector('.question').innerText = 'Feature ' + currentFeature + ':';
    } else {
        // Send data to the prediction endpoint
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ features: featureValues })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('question-container').style.display = 'none';
            document.getElementById('result').innerText = data.result;
        })
        .catch(error => {
            document.getElementById('result').innerText = "Error during prediction.";
            console.error(error);
        });
    }
}
