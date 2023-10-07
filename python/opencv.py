from astropy.io import fits
import numpy as np
from matplotlib.colors import ListedColormap
from matplotlib import cm
import matplotlib.pyplot as plt
from astropy.visualization import astropy_mpl_style
from astropy.utils.data import get_pkg_data_filename

image_file = get_pkg_data_filename('sample.fits')
plt.style.use(astropy_mpl_style)
image_data = fits.getdata(image_file, ext=0)
print(image_data.shape)

plt.figure()

viridisBig = cm.get_cmap('plasma', 512)
newcmp = ListedColormap(viridisBig(np.linspace(0.1, 0.75, 512)))

plt.imshow(image_data, cmap=newcmp)
plt.colorbar()
plt.show()