'use client';

import React, { useState, useRef } from 'react';
import { Camera, Download, Image as ImageIcon, Crop, Info } from 'lucide-react';

export default function PassportPhotoMaker() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [preset, setPreset] = useState<string>('passport-india');
  const [targetWidth, setTargetWidth] = useState<number>(350); // 3.5cm (350px @ 100dpi)
  const [targetHeight, setTargetHeight] = useState<number>(450); // 4.5cm (450px @ 100dpi)
  const [maxKb, setMaxKb] = useState<number>(50); // <50KB default for UPSC/SSC
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [fileSizeKb, setFileSizeKb] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImageSrc(evt.target?.result as string);
        setProcessedUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPreset = (p: string) => {
    setPreset(p);
    if (p === 'passport-india') {
      setTargetWidth(350);
      setTargetHeight(450);
      setMaxKb(50);
    } else if (p === 'signature-india') {
      setTargetWidth(500);
      setTargetHeight(200);
      setMaxKb(20);
    } else if (p === 'upsc-photo') {
      setTargetWidth(350);
      setTargetHeight(350);
      setMaxKb(300);
    } else if (p === 'us-visa') {
      setTargetWidth(600);
      setTargetHeight(600);
      setMaxKb(240);
    }
  };

  const processImage = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      // Center cover crop
      const imgRatio = img.width / img.height;
      const targetRatio = targetWidth / targetHeight;
      let drawWidth = targetWidth;
      let drawHeight = targetHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > targetRatio) {
        drawWidth = targetHeight * imgRatio;
        offsetX = (targetWidth - drawWidth) / 2;
      } else {
        drawHeight = targetWidth / imgRatio;
        offsetY = (targetHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Compression loop to satisfy maxKb
      let quality = 0.92;
      let dataUrl = canvas.toDataURL('image/jpeg', quality);

      while (dataUrl.length * 0.75 > maxKb * 1024 && quality > 0.1) {
        quality -= 0.08;
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      setProcessedUrl(dataUrl);
      setFileSizeKb(Math.round((dataUrl.length * 0.75) / 1024));
    };
    img.src = imageSrc;
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Camera className="w-6 h-6 text-indigo-600" /> Passport Photo &amp; Signature Maker (Indian Exams)
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Resize photos &amp; signatures to exact dimensions &amp; file size limits for UPSC, SSC, Banking, IBPS, and State PSC applications.
          </p>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => applyPreset('passport-india')}
          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
            preset === 'passport-india' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
          }`}
        >
          Indian Passport Photo (3.5x4.5cm, &lt;50KB)
        </button>

        <button
          onClick={() => applyPreset('signature-india')}
          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
            preset === 'signature-india' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
          }`}
        >
          Signature Resizer (&lt;20KB)
        </button>

        <button
          onClick={() => applyPreset('upsc-photo')}
          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
            preset === 'upsc-photo' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
          }`}
        >
          UPSC / SSC Photo (350x350px)
        </button>

        <button
          onClick={() => applyPreset('us-visa')}
          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
            preset === 'us-visa' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
          }`}
        >
          US Visa / Passport (2x2 inch, 600x600px)
        </button>
      </div>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-zinc-300 hover:border-indigo-500 rounded-2xl p-8 text-center bg-zinc-50/50 transition-colors">
        <input
          type="file"
          accept="image/*"
          id="photoInput"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="photoInput" className="cursor-pointer space-y-3 inline-block">
          <ImageIcon className="w-10 h-10 text-indigo-600 mx-auto" />
          <div>
            <span className="font-extrabold text-sm text-zinc-900 block">Click to Upload Image / Photo / Signature</span>
            <span className="text-xs text-zinc-500 font-medium">Supports JPG, PNG, WebP up to 10MB</span>
          </div>
        </label>
      </div>

      {/* Controls & Preview */}
      {imageSrc && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase text-zinc-700">Target Output Dimensions &amp; Size</h3>

            <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
              <div>
                <label className="block text-zinc-500 mb-1">Width (px)</label>
                <input
                  type="number"
                  value={targetWidth}
                  onChange={(e) => setTargetWidth(parseInt(e.target.value, 10) || 100)}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-1.5 font-bold text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-zinc-500 mb-1">Height (px)</label>
                <input
                  type="number"
                  value={targetHeight}
                  onChange={(e) => setTargetHeight(parseInt(e.target.value, 10) || 100)}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-1.5 font-bold text-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-1 font-semibold">Max File Size Limit (KB)</label>
              <input
                type="number"
                value={maxKb}
                onChange={(e) => setMaxKb(parseInt(e.target.value, 10) || 20)}
                className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-1.5 font-bold text-zinc-900"
              />
            </div>

            <button
              onClick={processImage}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Crop className="w-4 h-4" /> Process &amp; Format Photo
            </button>
          </div>

          {/* Processed Output */}
          <div className="text-center space-y-3 flex flex-col items-center justify-center border-l border-zinc-200 pl-4">
            {processedUrl ? (
              <>
                <div className="border-2 border-indigo-600 rounded-xl overflow-hidden shadow-md inline-block bg-white p-1">
                  <img src={processedUrl} alt="Processed Passport Output" style={{ maxWidth: '180px', maxHeight: '200px' }} />
                </div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Format Ready! File Size: {fileSizeKb} KB ({targetWidth}x{targetHeight}px)
                </div>
                <a
                  href={processedUrl}
                  download={`official_photo_${targetWidth}x${targetHeight}.jpg`}
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all"
                >
                  <Download className="w-4 h-4" /> Download Official Photo (JPG)
                </a>
              </>
            ) : (
              <div className="text-xs text-zinc-400 font-medium italic">
                Click &quot;Process &amp; Format Photo&quot; to generate output.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
