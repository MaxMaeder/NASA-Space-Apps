import cv2
  
# Read image. 
img = cv2.imread("./my_plot.png", cv2.IMREAD_COLOR) 
  
# Convert to grayscale. 
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
  
# Blur using 3 * 3 kernel. 
img_blur = cv2.blur(img_gray, (3, 3)) 
img_thresh = cv2.threshold(img_blur, 70, 255, cv2.THRESH_BINARY)[1]

# Find contours
contours, _ = cv2.findContours(img_thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Contour lists
contour_info = []
min_size = 30
kept_contours = []

# Iterate through the contours
for contour in contours:
    # Calculate the x, y, and size of the bounding rectangle for the contour
    x, y, w, h = cv2.boundingRect(contour)

    # Skip small images
    if w * h < min_size:
        continue

    # Append the x, y, and size to the list
    kept_contours.append(contour)
    contour_info.append((x, y, w, h))

# Print the list of contour information
for info in contour_info:
    x, y, w, h = info
    print(f"X: {x}, Y: {y}, Size (Width x Height): {w} x {h}")

# Optionally, you can draw the contours on the original image for visualization
cv2.drawContours(img, kept_contours, -1, (0, 255, 0), 2)
cv2.imshow('Image with Contours', img)
cv2.waitKey(0)
cv2.destroyAllWindows()