from astropy.io import fits
from astropy.utils.data import get_pkg_data_filename
from pathlib import Path
import shutil

in_fits = list(Path("in").rglob("*.fits"))

for fits_path in in_fits:
  fits_path = fits_path.as_posix()

  print("Processing '" + fits_path + "'...")
  image_file = get_pkg_data_filename(fits_path)

  header = fits.getheader(image_file)
  date_str = header["DATE_OBS"]

  shutil.copy(fits_path,f"out_fits/{date_str}.fits")
