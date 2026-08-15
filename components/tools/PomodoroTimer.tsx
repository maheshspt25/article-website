'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Clock, Volume2, Sparkles } from 'lucide-react';

export default function PomodoroTimer() {
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const modeDurations = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  const modeTitles = {
    work: '🧠 Deep Work Focus (25 Min)',
    shortBreak: '☕ Short Break (5 Min)',
    longBreak: '🌴 Long Break (15 Min)'
  };

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'work') {
        setCompletedSessions((prev) => prev + 1);
        setMode('shortBreak');
        setTimeLeft(modeDurations.shortBreak);
      } else {
        setMode('work');
        setTimeLeft(modeDurations.work);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const handleModeChange = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(modeDurations[newMode]);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeDurations[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = ((modeDurations[mode] - timeLeft) / modeDurations[mode]) * 100;

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" /> Pomodoro Study &amp; Focus Timer
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Boost academic performance &amp; work productivity using 25-minute structured focus cycles.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {completedSessions} Focus Sessions Completed
        </div>
      </div>

      {/* Mode Switches */}
      <div className="flex items-center justify-center gap-2 bg-zinc-100 p-1.5 rounded-2xl">
        <button
          onClick={() => handleModeChange('work')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
            mode === 'work' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Deep Focus (25m)
        </button>

        <button
          onClick={() => handleModeChange('shortBreak')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
            mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Short Break (5m)
        </button>

        <button
          onClick={() => handleModeChange('longBreak')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
            mode === 'longBreak' ? 'bg-purple-600 text-white shadow-md' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Long Break (15m)
        </button>
      </div>

      {/* Main Timer Display */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
        {/* Top bar progress */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              mode === 'work' ? 'bg-blue-500' : mode === 'shortBreak' ? 'bg-emerald-500' : 'bg-purple-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="text-xs font-extrabold tracking-wider uppercase text-slate-400">
          {modeTitles[mode]}
        </div>

        <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white">
          {formattedTime}
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={toggleTimer}
            className={`inline-flex items-center gap-2 font-extrabold px-8 py-3.5 rounded-2xl text-base shadow-lg transition-all border ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-400/40'
                : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400/40'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            {isRunning ? 'Pause Timer' : 'Start Session'}
          </button>

          <button
            onClick={resetTimer}
            className="p-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-2xl border border-slate-700 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-zinc-600">
        <div className="bg-zinc-50 border border-zinc-200 p-3.5 rounded-xl">
          <strong className="text-zinc-900 block font-bold mb-1">1. Choose a Task</strong>
          Pick a single assignment, exam topic, or work ticket to complete.
        </div>
        <div className="bg-zinc-50 border border-zinc-200 p-3.5 rounded-xl">
          <strong className="text-zinc-900 block font-bold mb-1">2. 25-Min Sprint</strong>
          Work continuously with zero phone or tab distractions until the timer rings.
        </div>
        <div className="bg-zinc-50 border border-zinc-200 p-3.5 rounded-xl">
          <strong className="text-zinc-900 block font-bold mb-1">3. 5-Min Rest</strong>
          Take a 5-minute break to stretch, hydrate, and relax before repeating.
        </div>
      </div>
    </div>
  );
}
