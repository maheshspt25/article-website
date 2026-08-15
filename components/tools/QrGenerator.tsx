'use client';

import React, { useState } from 'react';
import { QrCode, Download } from 'lucide-react';

export default function QrGenerator() {
  const [text, setText] = useState('https://your-project.vercel.app');
  const [size, setSize] = useState(200);

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <QrCode className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">QR Code Generator</h2>
          <p className="text-xs text-slate-500">Generate instantly downloadable high-resolution QR codes for websites, WiFi, and contact details.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Enter URL or Plain Text</label>
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste link here..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {text.trim() && (
          <div className="flex flex-col items-center bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrApiUrl}
              alt="Generated QR Code"
              className="w-48 h-48 bg-white p-2 rounded-lg border border-slate-200 shadow-sm"
            />

            <a
              href={qrApiUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="qrcode.png"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Download QR Code Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
