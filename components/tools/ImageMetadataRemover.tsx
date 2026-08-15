'use client';

import React, { useState } from 'react';
import { ShieldCheck, Upload, Download, Eye, FileImage, Trash2, CheckCircle2, Sparkles, Lock } from 'lucide-react';

export default function ImageMetadataRemover() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cleanDataUrl, setCleanDataUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [cleanSize, setCleanSize] = useState<number>(0);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      processImage(file, format);
    }
  };

  const processImage = (file: File, outputFormat: 'image/jpeg' | 'image/png' | 'image/webp') => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Draw onto a fresh, metadata-free HTML5 canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (outputFormat === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, img.width, img.height);
        }

        ctx.drawImage(img, 0, 0);

        // Export clean image data URL with 0 EXIF / AI C2PA metadata
        const dataUrl = canvas.toDataURL(outputFormat, 0.95);
        setCleanDataUrl(dataUrl);

        // Calculate clean size in bytes
        const head = `data:${outputFormat};base64,`;
        const sizeInBytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
        setCleanSize(sizeInBytes);
        setIsProcessing(false);
      };
      img.src = evt.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFormatChange = (newFmt: 'image/jpeg' | 'image/png' | 'image/webp') => {
    setFormat(newFmt);
    if (selectedFile) {
      processImage(selectedFile, newFmt);
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" /> Image EXIF &amp; AI Metadata Remover
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Strip camera EXIF data, GPS location, camera serial numbers, and AI-generation markers (Midjourney, DALL-E, Stable Diffusion C2PA) 100% in your browser.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-emerald-600" /> 100% Private Browser Processing
        </div>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-zinc-300 hover:border-emerald-500 rounded-2xl p-8 text-center bg-zinc-50/50 transition-colors">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          id="metaImageInput"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="metaImageInput" className="cursor-pointer space-y-3 inline-block">
          <FileImage className="w-10 h-10 text-emerald-600 mx-auto" />
          <div>
            <span className="font-extrabold text-sm text-zinc-900 block">Click to Upload Image / AI Artwork</span>
            <span className="text-xs text-zinc-500 font-medium">Supports JPG, PNG, WebP up to 25MB</span>
          </div>
        </label>
      </div>

      {/* Controls & Results */}
      {selectedFile && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase text-zinc-700">Choose Clean Output Format</span>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleFormatChange('image/jpeg')}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl border transition-all ${
                    format === 'image/jpeg' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-zinc-700 border-zinc-300'
                  }`}
                >
                  JPG (Clean EXIF)
                </button>
                <button
                  onClick={() => handleFormatChange('image/png')}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl border transition-all ${
                    format === 'image/png' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-zinc-700 border-zinc-300'
                  }`}
                >
                  PNG (Lossless Clean)
                </button>
                <button
                  onClick={() => handleFormatChange('image/webp')}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl border transition-all ${
                    format === 'image/webp' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-zinc-700 border-zinc-300'
                  }`}
                >
                  WebP (Web Optimized)
                </button>
              </div>
            </div>

            <div className="text-xs font-bold space-y-1">
              <div>Original File Size: <span className="text-zinc-900 font-mono">{(originalSize / 1024).toFixed(1)} KB</span></div>
              <div>Cleaned File Size: <span className="text-emerald-700 font-mono">{(cleanSize / 1024).toFixed(1)} KB</span></div>
            </div>
          </div>

          {/* Privacy Audit Checklist */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Privacy &amp; AI Metadata Removal Audit
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                100% Sanitized
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Camera GPS &amp; Geo-location Stripped
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Camera Make, Model &amp; Serial Number Removed
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> AI Prompts &amp; Software Model Tags Cleared
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Original Creation Timestamp Erased
              </div>
            </div>

            {cleanDataUrl && (
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={cleanDataUrl} alt="Sanitized Clean Output" className="w-12 h-12 rounded-lg object-cover border border-slate-700 bg-slate-950" />
                  <span className="text-xs font-bold text-slate-200">Metadata-Free Image Ready</span>
                </div>

                <a
                  href={cleanDataUrl}
                  download={`sanitized_image.${format.split('/')[1]}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all border border-emerald-400/30"
                >
                  <Download className="w-4 h-4" /> Download Metadata-Free Image
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
