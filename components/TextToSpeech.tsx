'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Pause, Play, Square, Gauge, Info, Terminal, RefreshCw } from 'lucide-react';

interface TextToSpeechProps {
  contentHtml?: string;
  articleTitle?: string;
}

export default function TextToSpeech({ contentHtml = '', articleTitle = '' }: TextToSpeechProps) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [hasError, setHasError] = useState(false);
  const [isLinuxNotice, setIsLinuxNotice] = useState(false);

  const chunksRef = useRef<string[]>([]);
  const currentChunkIdxRef = useRef<number>(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);

      const checkVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          setHasError(false);
          setIsLinuxNotice(false);
        }
      };

      checkVoices();
      window.speechSynthesis.onvoiceschanged = checkVoices;
    }

    const timer = resumeTimerRef.current;
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timer) clearInterval(timer);
    };
  }, []);

  // Utility to convert HTML string to clean readable text, stripping code blocks
  const prepareCleanSentences = (html: string, title: string): string[] => {
    if (typeof window === 'undefined') return [];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Remove code blocks, scripts, and tables from audio text
    const unwanted = tempDiv.querySelectorAll('pre, code, script, style');
    unwanted.forEach((node) => node.remove());

    const plainText = (tempDiv.textContent || tempDiv.innerText || '').replace(/\s+/g, ' ').trim();
    const fullText = title ? `${title}. ${plainText}` : plainText;

    if (!fullText) return [];

    // Split into short sentence chunks
    const rawChunks = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
    const finalChunks: string[] = [];

    for (const chunk of rawChunks) {
      const clean = chunk.trim();
      if (!clean) continue;

      if (clean.length > 150) {
        const subParts = clean.match(/[^,;]+[,;]+/g) || [clean];
        finalChunks.push(...subParts.map((s) => s.trim()).filter(Boolean));
      } else {
        finalChunks.push(clean);
      }
    }
    return finalChunks;
  };

  // Native Web Speech Synthesis Engine
  const speakChunk = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    if (index >= chunksRef.current.length) {
      setSpeaking(false);
      setPaused(false);
      if (resumeTimerRef.current) clearInterval(resumeTimerRef.current);
      return;
    }

    currentChunkIdxRef.current = index;
    const chunkText = chunksRef.current[index];
    const utterance = new SpeechSynthesisUtterance(chunkText);

    utterance.rate = rate;
    utterance.lang = 'en-US';

    // Pick available voice if loaded
    const voices = synth.getVoices();
    if (voices && voices.length > 0) {
      const preferred = voices.find((v) => v.lang.includes('en')) || voices[0];
      if (preferred) utterance.voice = preferred;
    }

    utterance.onend = () => {
      speakChunk(index + 1);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error encountered:', e.error);
      setHasError(true);

      const isLinux = typeof navigator !== 'undefined' && /linux/i.test(navigator.userAgent);
      if (isLinux || e.error === 'synthesis-failed') {
        setIsLinuxNotice(true);
      }
      setSpeaking(false);
      setPaused(false);
    };

    synth.speak(utterance);
  };

  const handlePlay = () => {
    if (!supported) return;
    setHasError(false);
    setIsLinuxNotice(false);

    const synth = window.speechSynthesis;

    if (paused && synth.speaking) {
      synth.resume();
      setPaused(false);
      setSpeaking(true);
      return;
    }

    // Stop existing speech
    synth.cancel();
    if (resumeTimerRef.current) clearInterval(resumeTimerRef.current);

    const sentenceChunks = prepareCleanSentences(contentHtml, articleTitle);
    if (sentenceChunks.length === 0) return;

    chunksRef.current = sentenceChunks;
    setSpeaking(true);
    setPaused(false);

    // Chrome bugfix: periodic resume to prevent speech engine freeze on long texts
    resumeTimerRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);

    speakChunk(0);
  };

  const handlePause = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (synth.speaking && !synth.paused) {
      synth.pause();
      setPaused(true);
      setSpeaking(false);
    }
  };

  const handleStop = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    if (resumeTimerRef.current) clearInterval(resumeTimerRef.current);
    setSpeaking(false);
    setPaused(false);
    currentChunkIdxRef.current = 0;
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (speaking) {
      const currentIdx = currentChunkIdxRef.current;
      handleStop();
      setTimeout(() => {
        setSpeaking(true);
        speakChunk(currentIdx);
      }, 50);
    }
  };

  if (!supported) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 sm:p-5 shadow-xs my-6 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <Volume2 className={`w-5 h-5 ${speaking ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              Listen to Article (Audio Reader)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {speaking
                ? `🔊 Playing section ${currentChunkIdxRef.current + 1} of ${chunksRef.current.length}...`
                : paused
                ? '⏸️ Audio narration paused'
                : 'Click Listen to hear natural speech narration'}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          {!speaking || paused ? (
            <button
              onClick={handlePlay}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
              aria-label="Play Audio Narration"
            >
              <Play className="w-4 h-4 fill-current" />
              {paused ? 'Resume' : 'Listen'}
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
              aria-label="Pause Audio Narration"
            >
              <Pause className="w-4 h-4 fill-current" />
              Pause
            </button>
          )}

          {(speaking || paused) && (
            <button
              onClick={handleStop}
              className="inline-flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all active:scale-95"
              aria-label="Stop Audio Narration"
            >
              <Square className="w-3.5 h-3.5 fill-current text-slate-700" />
              Stop
            </button>
          )}

          {/* Speed Rate Toggle Buttons */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 text-xs shadow-xs">
            <Gauge className="w-3.5 h-3.5 text-slate-400 ml-1" />
            {[1.0, 1.25, 1.5].map((s) => (
              <button
                key={s}
                onClick={() => handleRateChange(s)}
                className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-colors ${
                  rate === s ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {hasError && isLinuxNotice && (
        <div className="bg-amber-50 border border-amber-200/90 text-amber-950 text-xs p-3.5 rounded-xl space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
              Linux OS Speech Dispatcher Notice:
            </div>
            <button
              onClick={handlePlay}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Retry Audio
            </button>
          </div>
          <p className="leading-relaxed text-[11px]">
            If speech synthesis fails, Chrome requires system speech binaries. If you just ran <code>sudo apt install espeak-ng</code>, click <strong>Retry Audio</strong> or refresh your browser tab.
          </p>
        </div>
      )}
    </div>
  );
}
