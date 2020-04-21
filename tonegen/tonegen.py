import wave, struct

import numpy as np
import scipy.signal as ss
import matplotlib.pyplot as plt
from tqdm import tqdm

def savemono(fname, samples, fs):
    obj = wave.open(fname,'w')
    obj.setnchannels(1) # mono
    obj.setsampwidth(2)
    obj.setframerate(fs)

    samples *= 32767 / np.max(np.abs(samples))
    for i in tqdm(range(samples.size)):
       value = int(samples[i])
       data = struct.pack('<h', value)
       obj.writeframesraw( data )
    obj.close()

def savestereo(fname, left, right, fs):
    obj = wave.open(fname, 'w')
    obj.setnchannels(2)
    obj.setsampwidth(2)
    obj.setframerate(fs)

    left *= 32767 / (np.max(np.abs(left))+1e-10)
    right *= 32767 / (np.max(np.abs(right))+1e-10)
    for i in tqdm(range(left.size)):
        data = struct.pack('<hh', int(left[i]), int(right[i]))
        obj.writeframesraw(data)

if __name__ == '__main__':

    fs = 48000 # sampling rate (Hz)

    # duration = 20 # seconds
    # N = int(duration * fs)
    # n = np.arange(N)
    # t = n / fs

    # f = 21e3 # Hz
    # samples = np.sin(2 * np.pi * f * t)
    # savestereo('./audio/sine21k.wav', samples, np.zeros_like(samples), fs)

    # # chirps
    # duration = 60
    # chirp_freq = 10
    # fcenter = 20e3
    # fradius = 300
    # chirp_dur = 1 / chirp_freq
    # N = int(chirp_dur * fs)
    # n = np.arange(N)
    # t = n / fs
    # samples = ss.chirp(t, fcenter-fradius, np.max(t), fcenter+fradius, method='linear')
    # samples = np.tile(samples, int(duration / chirp_dur))
    # savemono('./audio/chirp20k.wav', samples, fs)

    # duration = 10 # seconds
    # N = int(duration * fs)
    # n = np.arange(N)
    # t = n / fs

    # f1 = 440 #Hz
    # f2 = 554.365 #Hz
    # # f = 18.5e3 + 100 * ss.sawtooth(t*10, 1)
    # left = np.sin(2 * np.pi * f1 * t)
    # right = np.sin(2 * np.pi * f2 * t)
    # savestereo('./audio/harmony.wav', left, right, fs)


    # # chirps
    # duration = 20
    # chirp_freq = 10
    # chirp_dur = 1 / chirp_freq
    # N = int(chirp_dur * fs)
    # n = np.arange(N)
    # t = n / fs

    # fcenter = 20e3
    # fradius = 500
    # # fcenter = 500
    # # fradius = 100
    # fcenterl = fcenter - 3*fradius
    # fcenterr = fcenter + 3*fradius

    # smoother = ss.get_window(('tukey', 0.2), N)

    # leftchirp = ss.chirp(t, fcenterl-fradius, np.max(t), fcenterl+fradius, method='linear')
    # leftchirp *= smoother
    # left = np.tile(leftchirp, int(duration / chirp_dur))
    # rightchirp = ss.chirp(t, fcenterr-fradius, np.max(t), fcenterr+fradius, method='linear')
    # rightchirp *= smoother
    # right = np.tile(rightchirp, int(duration / chirp_dur))
    # savestereo('./audio/stereochirp.wav', left, right, fs)


    duration = 20
    chirp_freq = 10
    chirp_dur = 1 / chirp_freq
    N = int(chirp_dur * fs)
    n = np.arange(N)
    t = n / fs

    fcenter = 21.5e3
    fradius = 500
    chirp = ss.chirp(t, fcenter-fradius, np.max(t), fcenter+fradius, method='linear')
    chirp *= ss.get_window(('tukey', 0.2), N)
    signal = np.tile(chirp, int(duration / chirp_dur))
    savestereo('../audio/chirp.wav', signal, np.zeros_like(signal), fs)
    np.save('chirp.npy', signal)



