#!/usr/bin/python

from keras.models import load_model
from keras.preprocessing.image import load_img, img_to_array, array_to_img
from skimage.color import rgb2lab, lab2rgb
from numpy import array, zeros, asarray, uint8
import sys
from skimage.io import imsave

model = load_model('model.h5')

img = load_img(sys.argv[1])
size = img.size
img = img.resize((256,256))



arr = img_to_array(img)
arr = array(arr, dtype=float)
arr = rgb2lab(1.0/255*arr)[:,:,:]
arr = arr.reshape(arr.shape+(1,))


output = model.predict(arr)
output = output * 128


cur = zeros((256, 256, 3))


cur[:,:,0] = arr[:,:,0,0]
cur[:,:,1:] = output[:,:,:,0]
cur = lab2rgb(cur)
cur = cur * 255
imag = cur.astype(uint8)
path = "E:/Licenta/Colorizer/Colorizer.Application/Python/Results/"+ sys.argv[2] + ".png"
imsave(path, imag )
print(path)

