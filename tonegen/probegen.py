import wave, struct

import numpy as np
import scipy.signal as ss
import matplotlib.pyplot as plt
from tqdm import tqdm

N = 100
t = np.arange(N) / fs
ss.chirp(t, 21, 22, np.max(t))

plt.plot(chirp)
plt.show()

