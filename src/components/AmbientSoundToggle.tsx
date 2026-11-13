"use client";

import React, { useState, useEffect, useRef } from "react";
import { Music2 } from "lucide-react";

/**
 * 🎹 ContemplativeSoundEngine
 * Menghasilkan alunan musik instrumen kontemplatif yang sangat menenangkan,
 * hangat, dan tidak membosankan (durasi loop panjang ~64 detik, 8 akor diperkaya)
 * dengan nuansa Felt Piano, Ambient Chimes, dan Pad Meditatif yang bernapas perlahan.
 *
 * Dirancang khusus untuk menemani pembaca Nalar Nanti merenung dan menata nalar:
 * - Progresi Akor Panjang (64 Detik):
 *   1. Fmaj9       (~8.0s) — Rasa lapang, hening, dan menerima.
 *   2. Cmaj7/E     (~8.0s) — Kehangatan, pulang ke dalam diri.
 *   3. Dm9         (~8.0s) — Refleksi tenang, jeda sejenak.
 *   4. Am7         (~8.0s) — Ketulusan, berserah pada ketetapan.
 *   5. Bbmaj7      (~8.0s) — Kelapangan hati dan prasangka baik.
 *   6. Fmaj7/A     (~8.0s) — Kesejukan, keikhlasan yang mekar.
 *   7. Gsus4 -> G6 (~8.0s) — Menata nalar, merakit asa.
 *   8. Cadd9       (~8.0s) — Kedamaian batin seutuhnya, kembali hening.
 * - Karakter Suara Felt Piano Asli: Paduan Sine + Triangle detuned + Harmonic Octave Ping
 *   dengan filter low-pass hangat (800Hz -> 420Hz) dan peluruhan panjang (hingga 6.5 detik).
 * - Ruang Akustik Teduh: Dual-tap delay stereo hangat (480ms / 720ms) dengan pantulan lembut.
 * - Latar Drone Bernapas: Sub-bass hangat (C2 & G2) dengan LFO breathing cycle ~12 detik.
 * - 100% Native Web Audio API browser: Ringan, instan, tanpa file audio luar yang bisa rusak.
 */
class ContemplativeSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private dryGain: GainNode | null = null;
  private delayNodeL: DelayNode | null = null;
  private delayNodeR: DelayNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private lfoOsc: OscillatorNode | null = null;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private stopTimeout: ReturnType<typeof setTimeout> | null = null;

  private nextNoteTime: number = 0;
  private currentPatternIndex: number = 0;

  // 8 Bagian Progresi Akor Kontemplatif Panjang (Total Durasi: 64 Detik)
  private readonly CHORD_PATTERNS = [
    // 1. Fmaj9 (F2 – C4 – E4 – G4 – A4) — Lapang & Menerima
    {
      notes: [
        { offset: 0.0, freq: 87.31, vel: 0.85, dur: 6.8 },  // F2 (Bass hangat)
        { offset: 1.2, freq: 261.63, vel: 0.55, dur: 5.5 }, // C4
        { offset: 2.5, freq: 329.63, vel: 0.6, dur: 5.0 },  // E4 (Maj7)
        { offset: 4.0, freq: 392.0, vel: 0.65, dur: 4.8 },  // G4 (Ninth - nada teduh)
        { offset: 5.6, freq: 440.0, vel: 0.45, dur: 4.0 },  // A4
      ],
      duration: 8.0,
    },
    // 2. Cmaj7 / E (E3 – G3 – B3 – E4 – G5) — Kehangatan & Pulang
    {
      notes: [
        { offset: 0.0, freq: 164.81, vel: 0.78, dur: 6.5 }, // E3 (Inversi hangat)
        { offset: 1.3, freq: 196.0, vel: 0.5, dur: 5.2 },   // G3
        { offset: 2.6, freq: 246.94, vel: 0.58, dur: 4.8 }, // B3 (Maj7)
        { offset: 4.1, freq: 329.63, vel: 0.62, dur: 4.5 }, // E4
        { offset: 5.5, freq: 783.99, vel: 0.32, dur: 4.2 }, // G5 (Gentle chime)
      ],
      duration: 8.0,
    },
    // 3. Dm9 (D3 – A3 – C4 – E4 – D4) — Refleksi Hening
    {
      notes: [
        { offset: 0.0, freq: 146.83, vel: 0.82, dur: 6.8 }, // D3 (Bass lembut)
        { offset: 1.4, freq: 220.0, vel: 0.55, dur: 5.4 },  // A3
        { offset: 2.8, freq: 261.63, vel: 0.6, dur: 5.0 },  // C4 (Seventh)
        { offset: 4.2, freq: 329.63, vel: 0.66, dur: 4.6 }, // E4 (Ninth)
        { offset: 5.8, freq: 293.66, vel: 0.48, dur: 4.0 }, // D4
      ],
      duration: 8.0,
    },
    // 4. Am7 (A2 – E3 – C4 – G4 – E5) — Berserah & Ikhlas
    {
      notes: [
        { offset: 0.0, freq: 110.0, vel: 0.88, dur: 7.0 },  // A2 (Bass dalam)
        { offset: 1.2, freq: 164.81, vel: 0.52, dur: 5.5 }, // E3
        { offset: 2.5, freq: 261.63, vel: 0.6, dur: 5.0 },  // C4
        { offset: 3.9, freq: 392.0, vel: 0.68, dur: 4.8 },  // G4 (Seventh)
        { offset: 5.4, freq: 659.25, vel: 0.35, dur: 4.5 }, // E5 (Chime sparkle)
      ],
      duration: 8.0,
    },
    // 5. Bbmaj7 (Bb2 – F3 – A3 – C4 – D4) — Kelapangan Hati
    {
      notes: [
        { offset: 0.0, freq: 116.54, vel: 0.82, dur: 6.8 }, // Bb2
        { offset: 1.3, freq: 174.61, vel: 0.55, dur: 5.2 }, // F3
        { offset: 2.7, freq: 220.0, vel: 0.6, dur: 4.8 },   // A3 (Maj7)
        { offset: 4.1, freq: 261.63, vel: 0.68, dur: 4.6 }, // C4
        { offset: 5.6, freq: 293.66, vel: 0.5, dur: 4.2 },  // D4
      ],
      duration: 8.0,
    },
    // 6. Fmaj7 / A (A2 – F3 – C4 – E4 – C6) — Kesejukan & Doa
    {
      notes: [
        { offset: 0.0, freq: 110.0, vel: 0.8, dur: 6.8 },   // A2
        { offset: 1.4, freq: 174.61, vel: 0.55, dur: 5.4 }, // F3
        { offset: 2.8, freq: 261.63, vel: 0.6, dur: 5.0 },  // C4
        { offset: 4.3, freq: 329.63, vel: 0.65, dur: 4.6 }, // E4 (Maj7)
        { offset: 5.8, freq: 1046.5, vel: 0.26, dur: 4.5 }, // C6 (Ethereal distant chime)
      ],
      duration: 8.0,
    },
    // 7. Gsus4 -> G6 (G2 – D3 – C4 – B3 – E4) — Menata Nalar, Merakit Asa
    {
      notes: [
        { offset: 0.0, freq: 98.0, vel: 0.85, dur: 7.0 },   // G2 (Bass mantap)
        { offset: 1.3, freq: 146.83, vel: 0.55, dur: 5.5 }, // D3
        { offset: 2.6, freq: 261.63, vel: 0.62, dur: 4.8 }, // C4 (Suspended fourth)
        { offset: 4.0, freq: 246.94, vel: 0.65, dur: 4.6 }, // B3 (Resolusi indah)
        { offset: 5.4, freq: 329.63, vel: 0.6, dur: 4.2 },  // E4 (Sixth extension)
      ],
      duration: 8.0,
    },
    // 8. Cadd9 (C3 – G3 – D4 – E4 – G4) — Kedamaian Seutuhnya & Hening
    {
      notes: [
        { offset: 0.0, freq: 130.81, vel: 0.85, dur: 7.2 }, // C3 (Root kepulangan)
        { offset: 1.4, freq: 196.0, vel: 0.55, dur: 5.8 },  // G3
        { offset: 2.8, freq: 293.66, vel: 0.62, dur: 5.2 }, // D4 (Add9)
        { offset: 4.3, freq: 329.63, vel: 0.68, dur: 4.8 }, // E4
        { offset: 5.8, freq: 392.0, vel: 0.45, dur: 4.2 },  // G4
      ],
      duration: 8.0, // Menyisakan ruang hening sebelum berulang ke Bar 1
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

      // 1. Master Output Gain dengan Fade-In Lembut
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.connect(this.ctx.destination);

      // Jalur suara piano langsung (Dry Path)
      this.dryGain = this.ctx.createGain();
      this.dryGain.gain.setValueAtTime(0.85, now);
      this.dryGain.connect(this.masterGain);

      // 2. Dual Stereo Acoustic Space (Spacious Reverb / Warm Delay)
      this.delayNodeL = this.ctx.createDelay();
      this.delayNodeL.delayTime.setValueAtTime(0.48, now); // 480ms channel kiri

      this.delayNodeR = this.ctx.createDelay();
      this.delayNodeR.delayTime.setValueAtTime(0.72, now); // 720ms channel kanan

      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = "lowpass";
      delayFilter.frequency.setValueAtTime(520, now); // Pantulan ruangan kayu hangat

      const delayFeedback = this.ctx.createGain();
      delayFeedback.gain.setValueAtTime(0.28, now); // Feedback lembut & tenang

      const delayWetGain = this.ctx.createGain();
      delayWetGain.gain.setValueAtTime(0.32, now);

      // Routing delay stereo
      this.delayNodeL.connect(delayFilter);
      this.delayNodeR.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(this.delayNodeL);
      delayFeedback.connect(this.delayNodeR);

      delayFilter.connect(delayWetGain);
      delayWetGain.connect(this.masterGain);

      // 3. Ambient Breathing Drone (Cushion Sub-bass yang Bernapas Perlahan)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = "sine";
      this.droneOsc1.frequency.setValueAtTime(65.41, now); // C2 (Pondasi sangat dalam)

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = "triangle";
      this.droneOsc2.frequency.setValueAtTime(98.0, now); // G2 (Harmoni kelima)

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(140, now);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.028, now); // Sangat halus dan lembut

      // LFO Lambat untuk efek "bernapas" (~12 detik per siklus tarikan & hembusan napas)
      this.lfoOsc = this.ctx.createOscillator();
      this.lfoOsc.type = "sine";
      this.lfoOsc.frequency.setValueAtTime(0.08, now); // ~12.5 detik per siklus napas

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.012, now);
      this.lfoOsc.connect(lfoGain);
      lfoGain.connect(this.droneGain.gain);

      this.droneOsc1.connect(droneFilter);
      this.droneOsc2.connect(droneFilter);
      droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      this.droneOsc1.start(now);
      this.droneOsc2.start(now);
      this.lfoOsc.start(now);

      // 4. Mulai Penjadwalan Progresi 64 Detik
      this.currentPatternIndex = 0;
      this.nextNoteTime = now + 0.15;

      this.timerId = setInterval(() => {
        this.scheduleNotes();
      }, 300);

      // Fade-In Naik Perlahan Selama 2.5 Detik
      this.masterGain.gain.exponentialRampToValueAtTime(0.5, now + 2.5);
    } catch (err) {
      console.error("Gagal memulai Contemplative Sound Engine:", err);
    }
  }

  /**
   * Menjadwalkan nada-nada akor secara berkelanjutan menggunakan clock audio browser
   */
  private scheduleNotes() {
    if (!this.ctx || !this.dryGain || !this.delayNodeL || !this.delayNodeR) return;

    while (this.nextNoteTime < this.ctx.currentTime + 1.5) {
      const pattern = this.CHORD_PATTERNS[this.currentPatternIndex];
      const baseTime = this.nextNoteTime;

      // Mainkan setiap nada di dalam pola akor
      for (const note of pattern.notes) {
        // Humanisasi mikro acak (±15ms) agar terasa hidup dan tidak kaku
        const humanJitter = (Math.random() - 0.5) * 0.03;
        this.playPianoNote(
          note.freq,
          baseTime + note.offset + humanJitter,
          note.vel,
          note.dur
        );
      }

      this.nextNoteTime += pattern.duration;
      this.currentPatternIndex =
        (this.currentPatternIndex + 1) % this.CHORD_PATTERNS.length;
    }
  }

  /**
   * Mensintesis satu petikan nada Felt Piano & Ambient Chime yang empuk dan syahdu:
   * - Sine fundamental: inti nada hangat
   * - Triangle detuned (+1.2 cent): vibrasi akustik kayu
   * - Octave Harmonic Ping: resonansi petikan senar piano
   * - Filter dinamis: meluruh dari 800Hz ke 380Hz
   */
  private playPianoNote(
    freq: number,
    startTime: number,
    velocity: number = 0.5,
    noteDuration: number = 5.0
  ) {
    if (!this.ctx || !this.dryGain || !this.delayNodeL || !this.delayNodeR) return;

    const now = startTime;

    // 1. Osilator Inti: Sine (nada murni) + Triangle detuned (kayu felt piano)
    const oscSine = this.ctx.createOscillator();
    const oscTri = this.ctx.createOscillator();
    oscSine.type = "sine";
    oscTri.type = "triangle";

    oscSine.frequency.setValueAtTime(freq, now);
    oscTri.frequency.setValueAtTime(freq * 1.0012, now); // Chorus hangat

    // 2. Osilator Resonansi Harmoni Lembut (Overtone Oktaf)
    const oscHarmonic = this.ctx.createOscillator();
    oscHarmonic.type = "sine";
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.18, now);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6); // Luruh cepat seperti senar dipetik

    oscHarmonic.connect(harmonicGain);

    // 3. Filter Low-Pass Dinamis (Nada empuk, lembut, tidak menusuk telinga)
    const noteFilter = this.ctx.createBiquadFilter();
    noteFilter.type = "lowpass";
    const startCutoff = Math.min(880, freq * 3.5);
    noteFilter.frequency.setValueAtTime(startCutoff, now);
    noteFilter.frequency.exponentialRampToValueAtTime(360, now + 1.4);

    // 4. Amplop ADSR Felt Piano (Sentuhan Velvety & Peluruhan Panjang)
    const noteGain = this.ctx.createGain();
    const peakVolume = 0.26 * velocity;

    noteGain.gain.setValueAtTime(0.0001, now);
    // Soft attack lembut (45ms) tanpa bunyi klik tajam
    noteGain.gain.linearRampToValueAtTime(peakVolume, now + 0.045);
    // Decay bertahap
    noteGain.gain.exponentialRampToValueAtTime(peakVolume * 0.55, now + 0.8);
    // Release panjang alami sesuai durasi nada
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration);

    // Sambungkan osilator ke filter
    oscSine.connect(noteFilter);
    oscTri.connect(noteFilter);
    harmonicGain.connect(noteFilter);
    noteFilter.connect(noteGain);

    // Kirim ke jalur suara utama dan jalur gema delay stereo
    noteGain.connect(this.dryGain);
    noteGain.connect(this.delayNodeL);
    noteGain.connect(this.delayNodeR);

    // Mulai dan hentikan osilator
    oscSine.start(now);
    oscTri.start(now);
    oscHarmonic.start(now);

    const stopTime = now + noteDuration + 0.15;
    oscSine.stop(stopTime);
    oscTri.stop(stopTime);
    oscHarmonic.stop(stopTime);

    // Bersihkan node memori setelah nada selesai berdering
    setTimeout(() => {
      try {
        oscSine.disconnect();
        oscTri.disconnect();
        oscHarmonic.disconnect();
        harmonicGain.disconnect();
        noteFilter.disconnect();
        noteGain.disconnect();
      } catch {}
    }, (noteDuration + 0.5) * 1000);
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    try {
      const now = this.ctx.currentTime;
      // Fade-Out Halus Turun Selama 1.5 Detik
      const currentGain = Math.max(0.0001, this.masterGain.gain.value);
      this.masterGain.gain.setValueAtTime(currentGain, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

      this.stopTimeout = setTimeout(() => {
        this.cleanup();
      }, 1550);
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
      if (this.lfoOsc) {
        this.lfoOsc.stop();
        this.lfoOsc.disconnect();
        this.lfoOsc = null;
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
  const engineRef = useRef<ContemplativeSoundEngine | null>(null);

  useEffect(() => {
    setMounted(true);
    engineRef.current = new ContemplativeSoundEngine();

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
            : "Dengarkan alunan instrumen syahdu untuk menemani membaca & menata nalar"
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
