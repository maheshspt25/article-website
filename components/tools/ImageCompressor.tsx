'use client';

import React, { useState } from 'react';
import { FileImage, Download, Upload } from 'lucide-react';

export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.75);
  const [compressedDataUrl, setCompressedDataUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      compressImage(file, quality);
    }
  };

  const compressImage = (file: File, q: number) => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL('image/jpeg', q);
        setCompressedDataUrl(dataUrl);

        // Estimate size in bytes
        const head = 'data:image/jpeg;base64,';
        const sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
        setCompressedSize(sizeInBytes);
        setIsProcessing(false);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleQualityChange = (newQ: number) => {
    setQuality(newQ);
    if (selectedFile) {
      compressImage(selectedFile, newQ);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <FileImage className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Image Compressor</h2>
          <p className="text-xs text-slate-500">Compress JPEG & PNG files directly in your browser without uploading to any server.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 text-center transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="image-upload"
            className="hidden"
          />
          <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="w-10 h-10 text-slate-400 mb-2" />
            <span className="text-sm font-bold text-slate-800">Click to upload an image</span>
            <span className="text-xs text-slate-500 mt-1">Supports JPEG, PNG, WebP up to 10MB</span>
          </label>
        </div>

        {selectedFile && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Compression Quality</span>
                <span>{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.95"
                step="0.05"
                value={quality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-center bg-slate-50 p-4 rounded-xl text-xs">
              <div>
                <span className="text-slate-500 block font-semibold">Original Size</span>
                <strong className="text-slate-900 text-sm">{(selectedFile.size / 1024).toFixed(1)} KB</strong>
              </div>
              <div>
                <span className="text-slate-500 block font-semibold">Compressed Size</span>
                <strong className="text-emerald-700 text-sm">
                  {compressedSize ? `${(compressedSize / 1024).toFixed(1)} KB` : 'Processing...'}
                </strong>
              </div>
            </div>

            {compressedDataUrl && (
              <a
                href={compressedDataUrl}
                download={`compressed_${selectedFile.name}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm text-sm"
              >
                <Download className="w-4 h-4" /> Download Compressed Image
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
