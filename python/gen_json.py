from pathlib import Path
import json

in_png = list(Path("out").rglob("*.png"))

final_dict = []

for png_path in in_png:
  png_name = png_path.name
  json_name = png_name.split(".")[0]

  dict_item = {}
  dict_item["image"] = f"images/{png_name}"
  dict_item["data"] = f"images_data/{json_name}.json"
  final_dict.append(dict_item)

  print(png_path)

  with open(f"images.json", 'w') as f:
    json.dump(final_dict, f)