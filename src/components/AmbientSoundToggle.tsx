"use client";

import React, { useState, useEffect, useRef } from "react";
import { Headphones, Volume2, VolumeX } from "lucide-react";

/**
 * 🌧️ AmbientSoundEngine
 * Menghasilkan suara rintik hujan lembut dan dengung ambient hangat
 * secara sintetis menggunakan Web Audio API native bawaan browser.
 * 100% bebas ketergantungan file eksternal, ringan, dan zero network traffic.
 */
class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private stopTimeout: ReturnType<typeof setTimeout> | null = null;

  public start() {
    if (this.stopTimeout) {
      clearTimeout(this.stopTimeout);
      this.stopTimeout = null;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      // 1. Master Gain Node untuk transisi fade-in & fade-out yang mulus
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // 2. Generator Suara Rintik Hujan (Pink / Brown Noise Sintetis)
      // Buffer loop 4 detik stereo
      const bufferSize = this.ctx.sampleRate * 4;
      const noiseBuffer = this.ctx.createBuffer(
        2,
        bufferSize,
        this.ctx.sampleRate
      );

      for (let channel = 0; channel < 2; channel++) {
        const data = noiseBuffer.getChannelData(channel);
        let b0 = 0,
          b1 = 0,
          b2 = 0,
          b3 = 0,
          b4 = 0,
          b5 = 0,
          b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Filter Paul Kellet untuk pink noise organik
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          data[i] =
            (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.065;
          b6 = white * 0.115926;
        }
      }

      this.noiseSource = this.ctx.createBufferSource();
      this.noiseSource.buffer = noiseBuffer;
      this.noiseSource.loop = true;

      // Filter Lowpass: memotong desis tajam frekuensi tinggi (efek hujan hangat di balik jendela)
      const rainLowpass = this.ctx.createBiquadFilter();
      rainLowpass.type = "lowpass";
      rainLowpass.frequency.setValueAtTime(700, this.ctx.currentTime);
      rainLowpass.Q.setValueAtTime(0.8, this.ctx.currentTime);

      // Filter Highpass: membuang gemuruh bass berlebihan
      const rainHighpass = this.ctx.createBiquadFilter();
      rainHighpass.type = "highpass";
      rainHighpass.frequency.setValueAtTime(160, this.ctx.currentTime);

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

      this.noiseSource.connect(rainHighpass);
      rainHighpass.connect(rainLowpass);
      rainLowpass.connect(rainGain);
      rainGain.connect(this.masterGain);
      this.noiseSource.start();

      // 3. Dengung Ambient Hangat (Harmonic Meditative Drone)
      // Nada dasar F2 (87.31 Hz) dan kuinta C3 (130.81 Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(87.31, this.ctx.currentTime);

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = "sine";
      this.osc2.frequency.setValueAtTime(130.81, this.ctx.currentTime);

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(200, this.ctx.currentTime);

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

      this.osc1.connect(droneFilter);
      this.osc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.masterGain);

      this.osc1.start();
      this.osc2.start();

      // Transisi Volume Naik Perlahan (Smooth Fade-In ~ 2 detik)
      this.masterGain.gain.exponentialRampToValueAtTime(
        0.65,
        this.ctx.currentTime + 2.0
      );
    } catch (err) {
      console.error("Gagal memulai Ambient Sound Engine:", err);
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // Transisi Volume Turun Perlahan (Smooth Fade-Out ~ 1.2 detik)
      const currentGain = Math.max(0.0001, this.masterGain.gain.value);
      this.masterGain.gain.setValueAtTime(currentGain, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      this.stopTimeout = setTimeout(() => {
        this.cleanup();
      }, 1250);
    } catch {
      this.cleanup();
    }
  }

  public cleanup() {
    try {
      if (this.noiseSource) {
        this.noiseSource.stop();
        this.noiseSource.disconnect();
        this.noiseSource = null;
      }
      if (this.osc1) {
        this.osc1.stop();
        this.osc1.disconnect();
        this.osc1 = null;
      }
      if (this.osc2) {
        this.osc2.stop();
        this.osc2.disconnect();
        this.osc2 = null;
      }
      if (this.ctx && this.ctx.state !== "closed") {
        this.ctx.close();
        this.ctx = null;
      }
    } catch {
      // Abaikan jika sudah dibersihkan
    }
  }
}

export default function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const engineRef = useRef<AmbientSoundEngine | null>(null);

  useEffect(() => {
    setMounted(true);
    engineRef.current = new AmbientSoundEngine();

    return () => {
      engineRef.current?.cleanup();
    };
  }, []);

  const handleToggle = () => {
    if (!engineRef.current) return;

    if (!isPlaying) {
      engineRef.current.start();
      setIsPlaying(true);
    } else {
      engineRef.current.stop();
      setIsPlaying(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-40">
      <button
        onClick={handleToggle}
        aria-label={
          isPlaying
            ? "Hentikan suara teduh latar belakang"
            : "Nyalakan suara teduh latar belakang (hujan lembut & ambient)"
        }
        title={
          isPlaying
            ? "Klik untuk mematikan suara teduh"
            : "Dengarkan rintik hujan & ambient teduh untuk menemani membaca"
        }
        className={`group flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full border transition-all duration-300 shadow-card hover:shadow-floating active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C8A98E]/50 select-none ${
          isPlaying
            ? "bg-[#C8A98E] border-[#C8A98E] text-[#FAF7F2] shadow-soft"
            : "bg-[#FAF7F2] border-[#E5DDD0] text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E]"
        }`}
      >
        {isPlaying ? (
          // Animasi Gelombang Suara Aktif
          <>
            <div className="flex items-center gap-[2px] h-3.5 px-0.5" aria-hidden="true">
              <span className="w-[2.5px] h-3 bg-[#FAF7F2] rounded-full animate-pulse" />
              <span className="w-[2.5px] h-4 bg-[#FAF7F2] rounded-full animate-bounce" />
              <span className="w-[2.5px] h-2 bg-[#FAF7F2] rounded-full animate-pulse delay-75" />
            </div>
            <span className="text-xs font-semibold tracking-wide">
              Teduh Aktif
            </span>
          </>
        ) : (
          // Tampilan Default OFF
          <>
            <VolumeX className="w-4 h-4 text-[#7A6F64] group-hover:text-[#C8A98E] transition-colors" />
            <span className="text-xs font-semibold text-[#7A6F64] group-hover:text-[#3E362E] transition-colors">
              Suara Teduh
            </span>
          </>
        )}
      </button>
    </div>
  );
}
