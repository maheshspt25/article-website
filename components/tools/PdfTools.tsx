'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, CheckCircle, FileCheck, Layers, Minimize2 } from 'lucide-react';

export default function PdfTools() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">PDF Utility Tools & Guides Hub</h2>
          <p className="text-xs text-slate-500">Essential PDF utilities for job seekers, students, and official document submission.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/how-to/pdf/how-to-convert-pdf-to-word"
          className="bg-slate-50 border border-slate-200 hover:border-red-400 p-5 rounded-xl transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors mb-1">
              PDF to Word Converter Guide
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Step-by-step instructions to convert PDF files into editable DOCX format without losing fonts or table layouts.
            </p>
          </div>
          <span className="text-xs font-bold text-red-600 flex items-center gap-1">
            Read Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl flex flex-col justify-between opacity-80">
          <div>
            <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center mb-3">
              <Minimize2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              PDF File Size Reducer
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Compress PDF documents under 200KB for government job portals (SSC, TNPSC, RRB).
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Integrated in Image & Document Compressor
          </span>
        </div>
      </div>
    </div>
  );
}
