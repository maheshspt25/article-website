'use client';

import React, { useState } from 'react';
import { ShieldCheck, Upload, Download, FileImage, CheckCircle2, Lock, Sparkles, RefreshCw, Info } from 'lucide-react';

export default function ImageMetadataRemover() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cleanDataUrl, setCleanDataUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [cleanSize, setCleanSize] = useState<number>(0);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleIncomingFile(file);
    }
  };

  const handleIncomingFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }
    setSelectedFile(file);
    setOriginalSize(file.size);
    processImage(file, format);
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
        if (!ctx) {
          setIsProcessing(false);
          return;
        }

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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleIncomingFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCleanDataUrl(null);
    setOriginalSize(0);
    setCleanSize(0);
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-stone-200/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Image EXIF &amp; Metadata Remover
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1.5 max-w-2xl leading-relaxed">
            Strip camera EXIF data, GPS coordinates, device serial numbers, and AI generation metadata (C2PA, Midjourney, DALL-E) 100% in your browser.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 text-xs px-3.5 py-1.5 rounded-full font-semibold self-start sm:self-auto shrink-0 shadow-xs">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>100% Client-Side Privacy</span>
        </div>
      </div>

      {/* Upload Zone */}
      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-amber-600 bg-amber-50/50'
              : 'border-stone-300 hover:border-amber-500 bg-[#FAF8F5]/80 hover:bg-amber-50/20'
          }`}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            id="metaImageInput"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="metaImageInput" className="cursor-pointer space-y-3 block">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-xs">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-stone-900 block">
                Click to Upload or Drag &amp; Drop Image
              </span>
              <span className="text-xs text-stone-500 font-medium mt-0.5 block">
                Supports JPG, PNG, and WebP (up to 25MB)
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Zero server upload — instant raster sanitize</span>
            </div>
          </label>
        </div>
      ) : (
        /* Processing & Results View */
        <div className="space-y-6">
          {/* Format Selector Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FAF8F5] border border-stone-200/90 rounded-xl p-4 sm:p-5">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                Output Format
              </span>
              <div className="flex items-center gap-2">
                {(['image/jpeg', 'image/png', 'image/webp'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => handleFormatChange(fmt)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      format === fmt
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    {fmt === 'image/jpeg' ? 'JPG (Clean EXIF)' : fmt === 'image/png' ? 'PNG (Lossless)' : 'WebP (Modern)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <div>
                <span className="text-stone-500 block">Original Size</span>
                <span className="text-stone-900 font-mono font-bold">{(originalSize / 1024).toFixed(1)} KB</span>
              </div>
              <div className="border-l border-stone-200 pl-4">
                <span className="text-stone-500 block">Sanitized Size</span>
                <span className="text-emerald-700 font-mono font-bold">{(cleanSize / 1024).toFixed(1)} KB</span>
              </div>
              <button
                onClick={handleReset}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-white rounded-lg transition-colors ml-2"
                title="Upload Another Image"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Privacy Audit & Sanitization Card */}
          <div className="bg-white border border-stone-200/90 rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Privacy &amp; Metadata Sanitization Status
                </span>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                100% Sanitized
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>GPS Coordinates &amp; Location Data Stripped</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Camera Make, Model &amp; Serial Number Erased</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>AI Prompts &amp; C2PA Provenance Tags Cleared</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Original Timestamp &amp; Author Info Removed</span>
              </div>
            </div>

            {cleanDataUrl && (
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cleanDataUrl}
                    alt="Sanitized Clean Output"
                    className="w-14 h-14 rounded-lg object-cover border border-stone-200 bg-[#FAF8F5] shadow-xs"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Clean Image Generated</span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Ready for safe public upload and sharing
                    </span>
                  </div>
                </div>

                <a
                  href={cleanDataUrl}
                  download={`clean_image.${format.split('/')[1]}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Clean Image
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Educational Notice */}
      <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-xl p-4 text-xs text-stone-600 space-y-1 leading-relaxed font-medium flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-stone-800">Why remove image metadata? </strong>
          Modern smartphones and digital cameras embed sensitive personal details into every photo—including exact latitude/longitude GPS coordinates, camera serial numbers, and software edit history. InfoMitra&apos;s clean rasterization completely redraws pixels onto an isolated canvas, guaranteeing zero leaked metadata before you post to the web.
        </div>
      </div>
    </div>
  );
}
