'use client';

import React, { useState } from 'react';
import { FileSearch, Sparkles, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function ResumeKeywordAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  // Extract clean keywords (length > 3, alphanumeric)
  const extractKeywords = (text: string) => {
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !['with', 'this', 'that', 'from', 'have', 'your', 'will', 'about', 'must', 'each', 'such', 'into', 'than', 'them', 'their'].includes(w));

    const freq: Record<string, number> = {};
    words.forEach((w) => {
      freq[w] = (freq[w] || 0) + 1;
    });

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word);
  };

  const resumeWords = resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0;
  const resumeChars = resumeText.length;
  const readingTime = Math.ceil(resumeWords / 200);

  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = new Set(extractKeywords(resumeText));

  const matchedKeywords = jobKeywords.filter((k) => resumeKeywords.has(k));
  const missingKeywords = jobKeywords.filter((k) => !resumeKeywords.has(k)).slice(0, 15);

  const matchPercentage = jobKeywords.length > 0
    ? Math.round((matchedKeywords.length / jobKeywords.length) * 100)
    : 0;

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <FileSearch className="w-6 h-6 text-blue-600" /> ATS Resume Keyword &amp; Match Analyzer
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Analyze your resume text against job descriptions to optimize ATS keyword scores and pass recruiter filters.
          </p>
        </div>
      </div>

      {/* Input Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Paste Resume Text</label>
          <textarea
            rows={8}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your full resume text here..."
            className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 text-xs font-medium text-zinc-900 focus:bg-white focus:outline-none focus:border-blue-600 leading-relaxed"
          />
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-bold px-1">
            <span>Words: <strong>{resumeWords}</strong></span>
            <span>Characters: <strong>{resumeChars}</strong></span>
            <span>Reading Time: <strong>~{readingTime} min</strong></span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Paste Target Job Description (Optional)</label>
          <textarea
            rows={8}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job posting or requirements text here to calculate match score..."
            className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 text-xs font-medium text-zinc-900 focus:bg-white focus:outline-none focus:border-blue-600 leading-relaxed"
          />
          <div className="text-[11px] text-zinc-500 font-bold px-1">
            Target Keywords Identified: <strong>{jobKeywords.length}</strong>
          </div>
        </div>
      </div>

      {/* Results Box */}
      {jobDescription.trim() && (
        <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">ATS Match Analysis Score</span>
            <span className={`text-xs font-black px-3 py-1 rounded-full uppercase ${
              matchPercentage >= 70 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {matchPercentage >= 70 ? 'High ATS Match' : 'Optimization Recommended'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-4xl font-black text-blue-400">{matchPercentage}% Match</div>
            <p className="text-xs text-slate-300 font-medium">
              Matched {matchedKeywords.length} out of {jobKeywords.length} core keywords found in the job description.
            </p>
          </div>

          {/* Missing Keywords */}
          {missingKeywords.length > 0 && (
            <div className="space-y-2 border-t border-slate-800 pt-3">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Key Terms Missing from Your Resume:
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {missingKeywords.map((word, i) => (
                  <span key={i} className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold">
                    + {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
