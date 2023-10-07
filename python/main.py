from astropy.io import fits
import matplotlib.pyplot as plt
from astropy.visualization import astropy_mpl_style
from astropy.utils.data import get_pkg_data_filename
from pathlib import Path

in_fits = list(Path("in").rglob("*.fits"))

for fits_path in in_fits:
  fits_path = fits_path.as_posix()

  print("Processing '" + fits_path + "'...")
  image_file = get_pkg_data_filename(fits_path)

  plt.style.use(astropy_mpl_style)
  header = fits.getheader(image_file)
  image_data = fits.getdata(image_file, ext=0)

  date_str = header["DATE_OBS"]

  fig, ax = plt.subplots(figsize=(6, 6))
  fig.set_facecolor("black")

  ax.imshow(image_data, cmap="inferno", vmin=10, vmax=80)
  ax.axis("off")

  plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
  plt.savefig("out/" + date_str + ".png")