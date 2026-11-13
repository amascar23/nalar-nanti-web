"use client";

import React, { useState, useEffect, useRef } from "react";
import { Music2 } from "lucide-react";

/**
 * 🎹 InstrumentSoundEngine
 * Menghasilkan alunan instrumen kontemplatif lembut (soft felt piano & warm ambient chimes)
 * dengan progresi akor harmonis Fmaj7 – Cmaj7 – Am7 – G6 pada tempo santai (~55 BPM)
 * menggunakan Web Audio API native bawaan browser.
 * 100% bebas dependensi luar, bebas file audio eksternal, dan hemat memori.
 */
class InstrumentSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private dryGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private stopTimeout: ReturnType<typeof setTimeout> | null = null;

  // Waktu penanda penjadwalan progresi
  private nextNoteTime: number = 0;
  private currentPatternIndex: number = 0;

  // Progresi akor: Fmaj7 -> Cmaj7 -> Am7 -> G6
  // Setiap akor berisi susunan petikan nada lembut (frekuensi dalam Hz dan timing relatif)
  private readonly CHORD_PATTERNS = [
    // 1. Fmaj7 (F – C – E – A – C)
    {
      notes: [
        { offset: 0.0, freq: 174.61, vel: 0.85 }, // F3 (Bass root)
        { offset: 0.55, freq: 261.63, vel: 0.55 }, // C4
        { offset: 1.15, freq: 329.63, vel: 0.6 },  // E4 (Mayor ke-7)
        { offset: 1.95, freq: 440.0, vel: 0.7 },   // A4 (Chime petikan atas)
        { offset: 2.85, freq: 261.63, vel: 0.45 }, // C4
      ],
      duration: 4.2, // ~55 BPM
    },
    // 2. Cmaj7 (C – G – B – E – G)
    {
      notes: [
        { offset: 0.0, freq: 130.81, vel: 0.8 },  // C3 (Bass root)
        { offset: 0.55, freq: 196.0, vel: 0.55 },  // G3
        { offset: 1.15, freq: 246.94, vel: 0.6 }, // B3 (Mayor ke-7)
        { offset: 1.95, freq: 329.63, vel: 0.68 },// E4
        { offset: 2.85, freq: 196.0, vel: 0.45 }, // G3
      ],
      duration: 4.2,
    },
    // 3. Am7 (A – E – G – C – E)
    {
      notes: [
        { offset: 0.0, freq: 110.0, vel: 0.8 },   // A2 (Bass root dalam)
        { offset: 0.55, freq: 164.81, vel: 0.55 },// E3
        { offset: 1.15, freq: 196.0, vel: 0.6 },  // G3
        { offset: 1.95, freq: 261.63, vel: 0.7 }, // C4
        { offset: 2.85, freq: 329.63, vel: 0.5 }, // E4
      ],
      duration: 4.2,
    },
    // 4. G6 / Gadd9 (G – D – B – E – D)
    {
      notes: [
        { offset: 0.0, freq: 98.0, vel: 0.8 },    // G2 (Bass root hangat)
        { offset: 0.55, freq: 146.83, vel: 0.55 },// D3
        { offset: 1.15, freq: 246.94, vel: 0.6 }, // B3
        { offset: 1.95, freq: 329.63, vel: 0.7 }, // E4 (Nada ke-6)
        { offset: 2.85, freq: 293.66, vel: 0.5 }, // D4
      ],
      duration: 4.2,
    },
  ];

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

      const now = this.ctx.currentTime;

      // 1. Master Gain Node untuk Fade-In dan Fade-Out yang mulus
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.connect(this.ctx.destination);

      // Jalur suara utama (Dry Path)
      this.dryGain = this.ctx.createGain();
      this.dryGain.gain.setValueAtTime(0.85, now);
      this.dryGain.connect(this.masterGain);

      // 2. Efek Gema Ruang Sunyi (Subtle Delay & Acoustic Space)
      this.delayNode = this.ctx.createDelay();
      this.delayNode.delayTime.setValueAtTime(0.38, now); // 380ms delay halus

      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = "lowpass";
      delayFilter.frequency.setValueAtTime(650, now); // Pantulan hangat

      const delayFeedback = this.ctx.createGain();
      delayFeedback.gain.setValueAtTime(0.28, now); // Gema lembut tidak berisik

      const delayOutputGain = this.ctx.createGain();
      delayOutputGain.gain.setValueAtTime(0.35, now);

      // Routing loop delay: input -> delay -> filter -> feedback -> delay
      this.delayNode.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(this.delayNode);

      // Sambungkan delay ke master
      delayFilter.connect(delayOutputGain);
      delayOutputGain.connect(this.masterGain);

      // 3. Dengung Latar Meditatif (Warm Harmonic Drone F2 & C3)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = "sine";
      this.droneOsc1.frequency.setValueAtTime(87.31, now); // F2

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = "sine";
      this.droneOsc2.frequency.setValueAtTime(130.81, now); // C3

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(180, now);

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.035, now); // Sangat pelan sebagai latar hangat

      this.droneOsc1.connect(droneFilter);
      this.droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.masterGain);

      this.droneOsc1.start(now);
      this.droneOsc2.start(now);

      // 4. Inisialisasi Penjadwalan Progresi Akor
      this.currentPatternIndex = 0;
      this.nextNoteTime = now + 0.1;

      // Timer presisi untuk menjadwalkan nada-nada akor ke depan
      this.timerId = setInterval(() => {
        this.scheduleNotes();
      }, 250);

      // Transisi Volume Naik Perlahan (Smooth Fade-In ~ 2 detik)
      this.masterGain.gain.exponentialRampToValueAtTime(0.55, now + 2.0);
    } catch (err) {
      console.error("Gagal memulai Instrument Sound Engine:", err);
    }
  }

  /**
   * Menjadwalkan nada-nada akor berikutnya menggunakan audio clock waktu-nyata
   */
  private scheduleNotes() {
    if (!this.ctx || !this.dryGain || !this.delayNode) return;

    // Jadwalkan jika waktu nada berikutnya sudah mendekati jendela saat ini
    while (this.nextNoteTime < this.ctx.currentTime + 1.2) {
      const pattern = this.CHORD_PATTERNS[this.currentPatternIndex];
      const baseTime = this.nextNoteTime;

      // Jadwalkan setiap nada di dalam akor
      for (const note of pattern.notes) {
        this.playPianoNote(note.freq, baseTime + note.offset, note.vel);
      }

      this.nextNoteTime += pattern.duration;
      this.currentPatternIndex =
        (this.currentPatternIndex + 1) % this.CHORD_PATTERNS.length;
    }
  }

  /**
   * Mensintesis satu petikan nada felt piano lembut (Sine + Triangle dengan ADSR hangat)
   */
  private playPianoNote(freq: number, startTime: number, velocity: number = 0.5) {
    if (!this.ctx || !this.dryGain || !this.delayNode) return;

    const duration = 3.4; // Release panjang alami
    const now = startTime;

    // 1. Osilator Ganda: Sine (nada murni) + Triangle (karakter kayu felt piano)
    const oscSine = this.ctx.createOscillator();
    const oscTri = this.ctx.createOscillator();
    oscSine.type = "sine";
    oscTri.type = "triangle";

    oscSine.frequency.setValueAtTime(freq, now);
    // Sedikit detune (+1.5 cent) untuk efek akustik hangat mekar
    oscTri.frequency.setValueAtTime(freq * 1.001, now);

    // 2. Filter Low-Pass Hangat (850Hz turun perlahan ke 500Hz)
    const noteFilter = this.ctx.createBiquadFilter();
    noteFilter.type = "lowpass";
    noteFilter.frequency.setValueAtTime(950, now);
    noteFilter.frequency.exponentialRampToValueAtTime(550, now + 0.9);

    // 3. Amplop Suara (ADSR): Soft Attack (60ms) dan Long Natural Decay
    const noteGain = this.ctx.createGain();
    const peakVolume = 0.28 * velocity;

    noteGain.gain.setValueAtTime(0.0001, now);
    // Soft attack tanpa suara klik/letupan tajam
    noteGain.gain.linearRampToValueAtTime(peakVolume, now + 0.06);
    // Decay lembut ke peluruhan panjang
    noteGain.gain.exponentialRampToValueAtTime(peakVolume * 0.45, now + 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // 4. Hubungkan sinyal
    oscSine.connect(noteFilter);
    oscTri.connect(noteFilter);
    noteFilter.connect(noteGain);

    // Kirim ke jalur suara utama dan jalur gema delay
    noteGain.connect(this.dryGain);
    noteGain.connect(this.delayNode);

    // Mulai dan hentikan osilator
    oscSine.start(now);
    oscTri.start(now);
    oscSine.stop(now + duration + 0.1);
    oscTri.stop(now + duration + 0.1);

    // Bersihkan node setelah nada selesai berdering
    setTimeout(() => {
      try {
        oscSine.disconnect();
        oscTri.disconnect();
        noteFilter.disconnect();
        noteGain.disconnect();
      } catch {}
    }, (duration + 0.4) * 1000);
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

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
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    try {
      if (this.droneOsc1) {
        this.droneOsc1.stop();
        this.droneOsc1.disconnect();
        this.droneOsc1 = null;
      }
      if (this.droneOsc2) {
        this.droneOsc2.stop();
        this.droneOsc2.disconnect();
        this.droneOsc2 = null;
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
  const engineRef = useRef<InstrumentSoundEngine | null>(null);

  useEffect(() => {
    setMounted(true);
    engineRef.current = new InstrumentSoundEngine();

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
            ? "Hentikan alunan instrumen teduh"
            : "Nyalakan alunan instrumen teduh (felt piano & ambient chimes)"
        }
        title={
          isPlaying
            ? "Klik untuk mematikan alunan instrumen"
            : "Dengarkan alunan instrumen lembut untuk menemani membaca & menata nalar"
        }
        className={`group flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full border transition-all duration-300 shadow-card hover:shadow-floating active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C8A98E]/50 select-none ${
          isPlaying
            ? "bg-[#C8A98E] border-[#C8A98E] text-[#FAF7F2] shadow-soft"
            : "bg-[#FAF7F2] border-[#E5DDD0] text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E]"
        }`}
      >
        {isPlaying ? (
          // Animasi Gelombang Nada Aktif
          <>
            <div className="flex items-center gap-[2.5px] h-3.5 px-0.5" aria-hidden="true">
              <span className="w-[2.5px] h-3 bg-[#FAF7F2] rounded-full animate-pulse" />
              <span className="w-[2.5px] h-4 bg-[#FAF7F2] rounded-full animate-bounce" />
              <span className="w-[2.5px] h-2 bg-[#FAF7F2] rounded-full animate-pulse delay-75" />
            </div>
            <span className="text-xs font-semibold tracking-wide">
              Instrumen Aktif
            </span>
          </>
        ) : (
          // Tampilan Default OFF
          <>
            <Music2 className="w-4 h-4 text-[#7A6F64] group-hover:text-[#C8A98E] transition-colors" />
            <span className="text-xs font-semibold text-[#7A6F64] group-hover:text-[#3E362E] transition-colors">
              Instrumen Teduh
            </span>
          </>
        )}
      </button>
    </div>
  );
}
