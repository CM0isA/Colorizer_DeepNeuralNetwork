import tensorflow as tf
from keras.models import load_model


model = load_model('model.h5')

print(model.summary())


import json
import sys
import base64
import os
import numpy as np



app = Flask(__name__)


@app.route('/ruta', methods=['POST'])
def function():
    # aico returnezi raspuns, nu ceea ce prelucrezi
    return jsonify(data)


@app.route('/sendToCDiez')
def send():
    
    return encodedPanorama   # dai return la ce vrei tu, ai grija la tip. de recomandat un json, sau daca ai poza bitmap

if __name__ == "__main__":
    app.run(host='0.0.0.0')