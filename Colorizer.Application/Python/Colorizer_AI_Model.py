import tensorflow as tf
from keras.models import load_model
import sys
from flask import Flask
from flask import request
from flask import jsonify


model = load_model('model.h5')

print(model.summary())


import json
import sys
import base64
import os
from bitmap import BitMap


import numpy as np
from flask import Flask
from flask import request
from flask import jsonify


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