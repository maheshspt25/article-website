'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ListOrdered, RefreshCw } from 'lucide-react';

export interface StepItem {
  step: number;
  title: string;
  text: string;
}

interface HowToStepTrackerProps {
  steps: StepItem[];
  articleSlug: string;
}

export default function HowToStepTracker({ steps, articleSlug }: HowToStepTrackerProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`howto_progress_${articleSlug}`);
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [articleSlug]);

  const toggleStep = (stepNumber: number) => {
    const updated = completedSteps.includes(stepNumber)
      ? completedSteps.filter((s) => s !== stepNumber)
      : [...completedSteps, stepNumber];
    
    setCompletedSteps(updated);
    try {
      localStorage.setItem(`howto_progress_${articleSlug}`, JSON.stringify(updated));
    } catch {
      // Ignore localStorage errors
    }
  };

  const resetProgress = () => {
    setCompletedSteps([]);
    try {
      localStorage.removeItem(`howto_progress_${articleSlug}`);
    } catch {
      // Ignore localStorage errors
    }
  };

  if (!steps || steps.length === 0) return null;

  const progressPercentage = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="my-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-blue-600" />
            Interactive Step-by-Step Progress Checklist
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Check off steps as you follow this tutorial to track your progress.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700">{completedSteps.length} of {steps.length} completed</span>
            <div className="w-28 bg-slate-100 rounded-full h-2 mt-1 overflow-hidden border border-slate-200">
              <div
                className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {completedSteps.length > 0 && (
            <button
              onClick={resetProgress}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Reset step progress"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {steps.map((item) => {
          const isDone = completedSteps.includes(item.step);
          return (
            <div
              key={item.step}
              onClick={() => toggleStep(item.step)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isDone
                  ? 'bg-blue-50/60 border-blue-200/80 text-slate-800 shadow-xs'
                  : 'bg-slate-50/50 border-slate-200/60 hover:bg-white hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 shrink-0 text-blue-600 focus:outline-none"
                aria-label={`Toggle step ${item.step}`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded ${isDone ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    Step {item.step}
                  </span>
                  <h4 className={`text-sm font-bold ${isDone ? 'text-blue-900 line-through' : 'text-slate-900'}`}>
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
