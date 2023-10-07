import cv2
from pathlib import Path
import json

in_imgs = list(Path("out").rglob("*.png"))

for img_path in in_imgs:
  img_name = img_path.name.split(".")[0]

  img_path = img_path.as_posix()
  print("Processing '" + img_path + "'...")

  # Read image. 
  img = cv2.imread(img_path, cv2.IMREAD_COLOR) 

  # Convert to grayscale. 
  img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 

  # Blur using 3 * 3 kernel. 
  img_blur = cv2.blur(img_gray, (3, 3)) 
  img_thresh = cv2.threshold(img_blur, 70, 255, cv2.THRESH_BINARY)[1]

  # Find contours
  contours, _ = cv2.findContours(img_thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

  # Contour lists
  contour_items = []
  min_size = 30
  #kept_contours = []

  # Iterate through the contours
  for contour in contours:
      # Calculate the x, y, and size of the bounding rectangle for the contour
      x, y, w, h = cv2.boundingRect(contour)

      # Skip small images
      size = w * h
      if size < min_size:
          continue
      
      mid_x, mid_y = x + w / 2, y + h / 2

      # Append the x, y, and size to the list
      #kept_contours.append(contour)
      # contour_info.append((mid_x, mid_y, size))

      contour_item = {}
      contour_item["x"] = mid_x
      contour_item["y"] = mid_y
      contour_item["size"] = size
      contour_items.append(contour_item)

  # Sort by size
  contour_items = sorted(contour_items, key=lambda x: x["size"], reverse=True)
  # contour_items = dict(sorted(contour_items.items(), key=lambda item: item[1]["size"], reverse=True))
    
  with open(f"out_son/{img_name}.json", 'w') as f:
    json.dump(contour_items, f)

  '''
  # Print the list of contour information
  for info in contour_info:
      x, y, w, h = info
      print(f"X: {x}, Y: {y}, Size (Width x Height): {w} x {h}")

  # Optionally, you can draw the contours on the original image for visualization
  cv2.drawContours(img, kept_contours, -1, (0, 255, 0), 2)
  cv2.imshow('Image with Contours', img)
  cv2.waitKey(0)
  cv2.destroyAllWindows()
  '''