import sys
import json
import pickle
import numpy as np
import warnings
warnings.filterwarnings("ignore")

# Load model
with open('career_model.pkl', 'rb') as f:
    data = pickle.load(f)

model    = data['model']
encoders = data['encoders']
questions = data['questions']
le       = encoders['career_label']

# Get input from Node.js
input_data = json.loads(sys.argv[1])

# Encode input
encoded = []
for q in questions:
    val = input_data.get(q, '')
    try:
        enc = encoders[q].transform([val])[0]
    except:
        enc = 0
    encoded.append(enc)

# Predict
pred  = model.predict([encoded])[0]
proba = model.predict_proba([encoded])[0]

# Top 3 careers
top3_idx = np.argsort(proba)[::-1][:3]
top3 = []
for idx in top3_idx:
    top3.append({
        'career': le.inverse_transform([idx])[0],
        'match':  round(float(proba[idx]) * 100, 1)
    })

print(json.dumps({ 'top3': top3 }))