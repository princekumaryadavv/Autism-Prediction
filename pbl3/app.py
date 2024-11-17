from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the saved model
try:
    model = joblib.load('autism_model.pkl')
except FileNotFoundError:
    model = None
    print("Model file not found. Ensure 'autism_model.pkl' exists.")

@app.route('/')

def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({"result": "Model file not found. Please ensure the model is correctly loaded."})

    try:
        # Parse features from JSON data sent by client-side JavaScript
        data = request.get_json()
        features = np.array(data['features']).reshape(1, -1)  # Reshape to fit model input

        # Make prediction
        prediction = model.predict(features)
        result = "The patient is predicted to have autism." if prediction[0] == 1 else "The patient is not predicted to have autism."
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"result": f"Error during prediction: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
