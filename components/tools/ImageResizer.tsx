'use client';

import React, { useState } from 'react';
import { Crop, Download, Upload } from 'lucide-react';

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetWidth, setTargetWidth] = useState<number>(300);
  const [targetHeight, setTargetHeight] = useState<number>(300);
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true);
  const [originalAspect, setOriginalAspect] = useState<number>(1);
  const [resizedDataUrl, setResizedDataUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          setTargetWidth(img.width);
          setTargetHeight(img.height);
          setOriginalAspect(img.width / img.height);
          resizeImage(img, img.width, img.height);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (w: number) => {
    setTargetWidth(w);
    if (maintainAspect && originalAspect) {
      const h = Math.round(w / originalAspect);
      setTargetHeight(h);
    }
  };

  const resizeImage = (img: HTMLImageElement, w: number, h: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, w, h);
    setResizedDataUrl(canvas.toDataURL('image/jpeg', 0.9));
  };

  const handleApplyResize = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        resizeImage(img, targetWidth, targetHeight);
      };
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
          <Crop className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Image Resizer</h2>
          <p className="text-xs text-slate-500">Resize images to exact pixel dimensions for passport photos, exam forms, and job applications.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center transition-colors">
          <input type="file" accept="image/*" onChange={handleFileChange} id="resizer-upload" className="hidden" />
          <label htmlFor="resizer-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="w-8 h-8 text-slate-400 mb-2" />
            <span className="text-sm font-bold text-slate-800">Select Image to Resize</span>
          </label>
        </div>

        {selectedFile && (
          <div className="space-y-4 bg-slate-50 p-4 rounded-xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Width (px)</label>
                <input
                  type="number"
                  value={targetWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Height (px)</label>
                <input
                  type="number"
                  value={targetHeight}
                  onChange={(e) => setTargetHeight(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                id="aspect"
                checked={maintainAspect}
                onChange={(e) => setMaintainAspect(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="aspect" className="text-slate-700 font-medium cursor-pointer">
                Maintain aspect ratio
              </label>
            </div>

            <button
              onClick={handleApplyResize}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs"
            >
              Apply Resize Dimensions
            </button>

            {resizedDataUrl && (
              <a
                href={resizedDataUrl}
                download={`resized_${targetWidth}x${targetHeight}_${selectedFile.name}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm text-sm"
              >
                <Download className="w-4 h-4" /> Download Resized Image
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
