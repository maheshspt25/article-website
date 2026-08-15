'use client';

import React, { useState } from 'react';
import { Calculator, Plus, Trash2, Award, Info } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  gradePoint: number;
  credits: number;
}

export default function GpaCalculator() {
  const [scale, setScale] = useState<'10' | '4'>('10');
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', gradePoint: 9, credits: 4 },
    { id: '2', name: 'Course 2', gradePoint: 8, credits: 3 },
    { id: '3', name: 'Course 3', gradePoint: 10, credits: 3 },
    { id: '4', name: 'Course 4', gradePoint: 9, credits: 2 }
  ]);

  const addCourse = () => {
    const id = Date.now().toString();
    setCourses([...courses, { id, name: `Course ${courses.length + 1}`, gradePoint: scale === '10' ? 8 : 3.5, credits: 3 }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, val: any) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  // Calculations
  const totalCredits = courses.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
  const totalGradePoints = courses.reduce((sum, c) => sum + (Number(c.gradePoint) || 0) * (Number(c.credits) || 0), 0);
  const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
  const percentage = scale === '10' ? (parseFloat(gpa) * 9.5).toFixed(1) + '%' : ((parseFloat(gpa) / 4) * 100).toFixed(1) + '%';

  const gradeOptions = scale === '10'
    ? [
        { label: 'O / S (10 - Outstanding)', value: 10 },
        { label: 'A+ (9 - Excellent)', value: 9 },
        { label: 'A (8 - Very Good)', value: 8 },
        { label: 'B+ (7 - Good)', value: 7 },
        { label: 'B (6 - Above Average)', value: 6 },
        { label: 'C (5 - Average)', value: 5 },
        { label: 'P / D (4 - Pass)', value: 4 },
        { label: 'F (0 - Fail)', value: 0 }
      ]
    : [
        { label: 'A+ / A (4.0)', value: 4.0 },
        { label: 'A- (3.7)', value: 3.7 },
        { label: 'B+ (3.3)', value: 3.3 },
        { label: 'B (3.0)', value: 3.0 },
        { label: 'B- (2.7)', value: 2.7 },
        { label: 'C+ (2.3)', value: 2.3 },
        { label: 'C (2.0)', value: 2.0 },
        { label: 'F (0.0)', value: 0 }
      ];

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-indigo-600" /> Semester GPA &amp; CGPA Calculator
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Calculate your Grade Point Average and percentage conversion for college &amp; university exams.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
          <button
            onClick={() => setScale('10')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              scale === '10' ? 'bg-indigo-600 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            10-Point CGPA Scale (India)
          </button>
          <button
            onClick={() => setScale('4')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              scale === '4' ? 'bg-indigo-600 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            4.0 GPA Scale (US / Global)
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md">
        <div className="space-y-1">
          <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Calculated GPA / CGPA</span>
          <div className="text-4xl font-black text-white">{gpa} <span className="text-xs text-indigo-300 font-semibold">/ {scale}.0</span></div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Equivalent Percentage</span>
          <div className="text-3xl font-extrabold text-emerald-400">{percentage}</div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Total Credits Passed</span>
          <div className="text-3xl font-extrabold text-amber-300">{totalCredits} Credits</div>
        </div>
      </div>

      {/* Course Inputs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-zinc-900 uppercase tracking-wider">Enrolled Courses &amp; Subjects</h3>
          <button
            onClick={addCourse}
            className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors border border-indigo-200"
          >
            <Plus className="w-4 h-4" /> Add Subject
          </button>
        </div>

        <div className="space-y-3">
          {courses.map((course, idx) => (
            <div key={course.id} className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs font-extrabold text-zinc-400 w-6">#{idx + 1}</span>

              <input
                type="text"
                value={course.name}
                onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                className="w-full sm:w-1/3 bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-900 focus:outline-none focus:border-indigo-600"
                placeholder="Course Subject Name"
              />

              <div className="w-full sm:w-1/3">
                <select
                  value={course.gradePoint}
                  onChange={(e) => updateCourse(course.id, 'gradePoint', parseFloat(e.target.value))}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-indigo-600"
                >
                  {gradeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-1/4">
                <span className="text-xs font-bold text-zinc-500 whitespace-nowrap">Credits:</span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-extrabold text-zinc-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <button
                onClick={() => removeCourse(course.id)}
                disabled={courses.length <= 1}
                className="text-rose-500 hover:text-rose-700 p-1 disabled:opacity-30"
                title="Remove course"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1">
        <div className="font-extrabold flex items-center gap-1">
          <Info className="w-4 h-4 text-amber-600" /> Percentage Formula Reference:
        </div>
        <p className="leading-relaxed">
          • <strong>10-Point Scale (CBSE/AICTE/Anna Univ/VTU):</strong> Percentage = CGPA × 9.5
          <br />
          • <strong>4.0 Scale (US Universities):</strong> Percentage = (GPA / 4.0) × 100
        </p>
      </div>
    </div>
  );
}
