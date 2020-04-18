import wave, struct
import numpy as np
import scipy.signal as ss
import matplotlib.pyplot as plt
from tqdm import tqdm

from scipy.io.wavfile import write
import sounddevice as sd

fs = 48000
sd.default.samplerate = fs
sd.default.channels = 1
duration = 30

recording = sd.rec(int(duration*fs))
sd.wait()
write('recording.wav', fs, recording)

plt.plot(recording)
plt.show()

