from astropy.io import fits
import matplotlib.pyplot as plt
from astropy.visualization import astropy_mpl_style
from astropy.utils.data import get_pkg_data_filename

image_file = get_pkg_data_filename("sample.fits")
plt.style.use(astropy_mpl_style)
image_data = fits.getdata(image_file, ext=0)

fig, ax = plt.subplots(figsize=(6, 6))
fig.set_facecolor('black')

ax.imshow(image_data, cmap="inferno", vmin=10, vmax=80)
ax.axis('off')

plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
plt.savefig('my_plot.png')