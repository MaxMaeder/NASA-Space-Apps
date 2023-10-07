import numpy as np
import argparse
import cv2

# We want size, intensity, coordinate from least to greatest

# Finds the brighest hotspot of the image
# Returns the coordinates
def findBrightspot(image):
    # Convert image to grayscale for simplified analysis
    image = cv2.imread(args["image"])
    orig = image.copy()
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply a gaussian blur
    gray = cv2.GaussianBlur(gray, (args["radius"], args["radius"]), 0)
    (minVal, maxVal, minLoc, maxLoc) = cv2.minMaxLoc(gray)
    
    return maxLoc

# Centers an image around an origin, with a cropping about the origin by offset
def centerImage(image, origin, offset):
    crop_img = img[y: y + offset, x: x + offset]
    cv2.imshow("cropped", crop_img)
    cv2.waitKey(0)
