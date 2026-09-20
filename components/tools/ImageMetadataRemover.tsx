'use client';

import React, { useState, useCallback } from 'react';
import {
  ShieldCheck,
  Upload,
  Download,
  CheckCircle2,
  Lock,
  Sparkles,
  RefreshCw,
  Eye,
  Camera,
  AlertTriangle,
  FileText,
  PenTool,
  Copy,
  Check,
  FileDown,
  HelpCircle,
  MapPin,
  ChevronDown,
  Zap,
  Info,
  Cpu,
  Layers,
  Fingerprint,
  Binary,
  UserCheck,
  ExternalLink,
  Aperture,
  Sun,
  Focus,
  Timer,
  Compass,
  Mountain,
  ChevronRight,
  Globe,
  Tag,
} from 'lucide-react';

export interface C2PaMetadata {
  found: boolean;
  jumdType?: string;
  jumdLabel?: string;
  softwareAgentName?: string;
  softwareAgentVersion?: string;
  digitalSourceType?: string;
  claimGeneratorName?: string;
  claimGeneratorOrg?: string;
  specVersion?: string;
  instanceId?: string;
  signatureUri?: string;
  algorithm?: string;
  manifestName?: string;
  rawJsonSnippet?: string;
}

export interface EncodingProperties {
  encodingProcess?: string;
  bitsPerSample?: number;
  colorComponents?: number;
  yCbCrSubSampling?: string;
  jfifVersion?: string;
  resolutionUnit?: string;
  xResolution?: number;
  yResolution?: number;
}

export interface CustomOwnership {
  author?: string;
  copyright?: string;
  title?: string;
  description?: string;
  keywords?: string;
  comment?: string;
  sourceType?: string;
}

export interface ExtractedMetadata {
  fileName: string;
  fileSize: number;
  fileType: string;
  fileTypeExtension: string;
  mimeType: string;
  category: string;
  lastModified: string;
  width: number;
  height: number;
  imageSize: string;
  megapixels: string;
  aspectRatio: string;

  // EXIF & Hardware
  make?: string;
  model?: string;
  software?: string;
  dateTime?: string;
  hasGps: boolean;
  gpsCoordinates?: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
  gpsAltitude?: number;
  rawTagsCount: number;

  // Camera settings (from exifr)
  exposureTime?: number;
  fNumber?: number;
  iso?: number;
  focalLength?: number;
  focalLengthIn35mm?: number;
  flash?: string;
  whiteBalance?: string;
  lensModel?: string;
  lensInfo?: string;
  meteringMode?: string;
  exposureProgram?: string;
  exposureCompensation?: number;
  sceneCaptureType?: string;
  colorSpace?: string;
  orientation?: number;
  contrast?: string;
  saturation?: string;
  sharpness?: string;
  digitalZoomRatio?: number;
  subjectDistance?: number;
  lightSource?: string;

  // Encoding & Format specs
  encoding: EncodingProperties;

  // C2PA & AI Provenance
  c2pa: C2PaMetadata;

  // Custom Metadata / Copyright & Ownership
  customOwnership?: CustomOwnership;

  // Raw Header Hex
  rawHeaderHex: string[];
  rawHeaderAscii: string[];

  // Complete metadata from exifr (all parsed tags)
  allExifrTags?: Record<string, any>;
}

interface CustomMetadata {
  author: string;
  copyright: string;
  title: string;
  description: string;
  keywords: string;
}

// CRC32 table for PNG tEXt chunks
function makeCrcTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
}

const crcTable = makeCrcTable();

function calculateCrc32(bytes: Uint8Array): number {
  let crc = -1;
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function injectPngTextChunks(pngBuffer: ArrayBuffer, tags: Record<string, string>): Uint8Array {
  const chunksToAdd: Uint8Array[] = [];
  const encoder = new TextEncoder();

  for (const [key, value] of Object.entries(tags)) {
    if (!value || !value.trim()) continue;
    const keyBytes = encoder.encode(key);
    const valBytes = encoder.encode(value.trim());

    const data = new Uint8Array(keyBytes.length + 1 + valBytes.length);
    data.set(keyBytes, 0);
    data[keyBytes.length] = 0;
    data.set(valBytes, keyBytes.length + 1);

    const typeBytes = encoder.encode('tEXt');
    const typeAndData = new Uint8Array(4 + data.length);
    typeAndData.set(typeBytes, 0);
    typeAndData.set(data, 4);

    const crc = calculateCrc32(typeAndData);

    const fullChunk = new Uint8Array(4 + 4 + data.length + 4);
    const view = new DataView(fullChunk.buffer);
    view.setUint32(0, data.length);
    fullChunk.set(typeAndData, 4);
    view.setUint32(8 + data.length, crc);

    chunksToAdd.push(fullChunk);
  }

  if (chunksToAdd.length === 0) return new Uint8Array(pngBuffer);

  const originalBytes = new Uint8Array(pngBuffer);
  let iendIndex = -1;
  for (let i = originalBytes.length - 12; i >= 0; i--) {
    if (
      originalBytes[i + 4] === 0x49 &&
      originalBytes[i + 5] === 0x45 &&
      originalBytes[i + 6] === 0x4e &&
      originalBytes[i + 7] === 0x44
    ) {
      iendIndex = i;
      break;
    }
  }

  if (iendIndex === -1) return originalBytes;

  let addedLength = 0;
  for (const c of chunksToAdd) addedLength += c.length;

  const result = new Uint8Array(originalBytes.length + addedLength);
  result.set(originalBytes.subarray(0, iendIndex), 0);

  let currentOffset = iendIndex;
  for (const chunk of chunksToAdd) {
    result.set(chunk, currentOffset);
    currentOffset += chunk.length;
  }
  result.set(originalBytes.subarray(iendIndex), currentOffset);

  return result;
}

function injectJpegComment(jpegBuffer: ArrayBuffer, comment: string): Uint8Array {
  const originalBytes = new Uint8Array(jpegBuffer);
  const encoder = new TextEncoder();
  const commentBytes = encoder.encode(comment);
  const length = commentBytes.length + 2;

  const header = new Uint8Array(4);
  header[0] = 0xff;
  header[1] = 0xfe;
  header[2] = (length >> 8) & 0xff;
  header[3] = length & 0xff;

  const comChunk = new Uint8Array(4 + commentBytes.length);
  comChunk.set(header, 0);
  comChunk.set(commentBytes, 4);

  // Insert after APP0 if present (bytes 2..3 is 0xFFE0), otherwise directly after SOI (offset 2)
  let insertPos = 2;
  if (
    originalBytes.length > 4 &&
    originalBytes[2] === 0xff &&
    originalBytes[3] === 0xe0
  ) {
    const app0Len = (originalBytes[4] << 8) | originalBytes[5];
    if (4 + app0Len <= originalBytes.length) {
      insertPos = 4 + app0Len;
    }
  }

  const result = new Uint8Array(originalBytes.length + comChunk.length);
  result.set(originalBytes.subarray(0, insertPos), 0);
  result.set(comChunk, insertPos);
  result.set(originalBytes.subarray(insertPos), insertPos + comChunk.length);

  return result;
}

/**
 * Parses deep image metadata including JFIF, SOF encoding, EXIF, C2PA Content Credentials,
 * PNG tEXt chunks, and JPEG COM custom metadata comments.
 */
export function parseDeepImageMetadata(buffer: ArrayBuffer, file: { name: string; size: number; type: string; lastModified?: number }): ExtractedMetadata {
  const dataView = new DataView(buffer);
  const length = dataView.byteLength;
  const uint8Arr = new Uint8Array(buffer);

  const ext = file.name.split('.').pop()?.toLowerCase() || (file.type.includes('png') ? 'png' : file.type.includes('webp') ? 'webp' : 'jpg');
  const typeName = ext === 'png' ? 'PNG' : ext === 'webp' ? 'WebP' : 'JPEG';
  const mimeType = file.type || (ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg');

  // 1. Raw Header Hex dump (First 64 bytes)
  const headerSliceLen = Math.min(length, 64);
  const hexLines: string[] = [];
  const asciiLines: string[] = [];

  for (let i = 0; i < headerSliceLen; i += 16) {
    const chunk = uint8Arr.subarray(i, Math.min(i + 16, headerSliceLen));
    let hexStr = '';
    let asciiStr = '';
    for (let j = 0; j < chunk.length; j++) {
      const b = chunk[j];
      hexStr += b.toString(16).toUpperCase().padStart(2, '0') + ' ';
      asciiStr += b >= 32 && b <= 126 ? String.fromCharCode(b) : '.';
    }
    hexLines.push(hexStr.trim());
    asciiLines.push(asciiStr);
  }

  const result: ExtractedMetadata = {
    fileName: file.name,
    fileSize: file.size,
    fileType: typeName,
    fileTypeExtension: ext,
    mimeType: mimeType,
    category: 'image',
    lastModified: file.lastModified ? new Date(file.lastModified).toISOString() : new Date().toISOString(),
    width: 0,
    height: 0,
    imageSize: '0x0',
    megapixels: '0',
    aspectRatio: '1:1',
    hasGps: false,
    rawTagsCount: 0,
    encoding: {},
    c2pa: {
      found: false,
    },
    rawHeaderHex: hexLines,
    rawHeaderAscii: asciiLines,
  };

  // Decode a text representation for C2PA, IPTC, XMP, and custom metadata scanning
  const textScanSliceLen = Math.min(length, 262144); // 256 KB slice
  let rawText = '';
  for (let i = 0; i < textScanSliceLen; i++) {
    const code = uint8Arr[i];
    rawText += code >= 32 && code <= 126 ? String.fromCharCode(code) : ' ';
  }

  // 2. PNG Chunk Scanner (for tEXt custom author, copyright, and title tags)
  if (
    uint8Arr.length > 8 &&
    uint8Arr[0] === 0x89 &&
    uint8Arr[1] === 0x50 &&
    uint8Arr[2] === 0x4e &&
    uint8Arr[3] === 0x47
  ) {
    let pngOffset = 8;
    while (pngOffset + 8 <= length) {
      const chunkLen = dataView.getUint32(pngOffset);
      const chunkType = String.fromCharCode(
        uint8Arr[pngOffset + 4],
        uint8Arr[pngOffset + 5],
        uint8Arr[pngOffset + 6],
        uint8Arr[pngOffset + 7]
      );

      // Extract IHDR Dimensions
      if (chunkType === 'IHDR' && chunkLen >= 8) {
        const w = dataView.getUint32(pngOffset + 8);
        const h = dataView.getUint32(pngOffset + 12);
        result.width = w;
        result.height = h;
        result.imageSize = `${w}x${h}`;
        result.megapixels = ((w * h) / 1000000).toFixed(1);
        result.encoding.encodingProcess = 'Deflate Lossless (PNG IHDR)';
        result.encoding.bitsPerSample = uint8Arr[pngOffset + 16] || 8;
        result.encoding.yCbCrSubSampling = 'RGBA 8:8:8:8';
      }

      // Extract tEXt chunks (Author, Copyright, Title, Keywords)
      if (chunkType === 'tEXt' && chunkLen > 0 && pngOffset + 8 + chunkLen <= length) {
        const chunkData = uint8Arr.subarray(pngOffset + 8, pngOffset + 8 + chunkLen);
        let nullPos = -1;
        for (let k = 0; k < chunkData.length; k++) {
          if (chunkData[k] === 0) {
            nullPos = k;
            break;
          }
        }
        if (nullPos !== -1) {
          let keyword = '';
          for (let k = 0; k < nullPos; k++) keyword += String.fromCharCode(chunkData[k]);
          let textVal = '';
          try {
            textVal = new TextDecoder('utf-8', { fatal: false }).decode(chunkData.subarray(nullPos + 1)).trim();
          } catch {
            for (let k = nullPos + 1; k < chunkData.length; k++) textVal += String.fromCharCode(chunkData[k]);
          }

          if (textVal) {
            result.customOwnership = result.customOwnership || {};
            result.customOwnership.sourceType = 'PNG tEXt Chunks';
            const keyLower = keyword.toLowerCase();
            if (keyLower === 'author') result.customOwnership.author = textVal;
            if (keyLower === 'copyright') result.customOwnership.copyright = textVal;
            if (keyLower === 'title') result.customOwnership.title = textVal;
            if (keyLower === 'description') result.customOwnership.description = textVal;
            if (keyLower === 'keywords') result.customOwnership.keywords = textVal;
            if (keyLower === 'comment') result.customOwnership.comment = textVal;
          }
        }
      }

      pngOffset += 8 + chunkLen + 4;
    }
  }

  // 3. JPEG Marker Iteration (SOF, JFIF, EXIF, COM, JUMBF)
  if (dataView.byteLength >= 2 && dataView.getUint16(0) === 0xffd8) {
    let offset = 2;
    while (offset < length - 4) {
      if (dataView.getUint8(offset) !== 0xff) {
        offset++;
        continue;
      }
      const marker = dataView.getUint16(offset);
      offset += 2;

      // Standalone markers without length
      if (marker === 0xffd8 || marker === 0xffd9 || (marker >= 0xffd0 && marker <= 0xffd7)) {
        continue;
      }

      if (offset + 2 > length) break;
      const markerLength = dataView.getUint16(offset);

      // APP0: JFIF Check
      if (marker === 0xffe0 && markerLength >= 16) {
        const jfifIdent = String.fromCharCode(
          dataView.getUint8(offset + 2),
          dataView.getUint8(offset + 3),
          dataView.getUint8(offset + 4),
          dataView.getUint8(offset + 5)
        );
        if (jfifIdent === 'JFIF') {
          const major = dataView.getUint8(offset + 7);
          const minor = dataView.getUint8(offset + 8);
          result.encoding.jfifVersion = `${major}.${minor < 10 ? '0' : ''}${minor}`;
          const units = dataView.getUint8(offset + 9);
          result.encoding.resolutionUnit = units === 1 ? 'inches (DPI)' : units === 2 ? 'cm' : 'None';
          result.encoding.xResolution = dataView.getUint16(offset + 10);
          result.encoding.yResolution = dataView.getUint16(offset + 12);
        }
      }

      // COM: JPEG Comment (0xFFFE) - Holds Author, Copyright, Title, Keywords
      if (marker === 0xfffe && markerLength > 2) {
        const comLen = markerLength - 2;
        const comBytes = uint8Arr.subarray(offset + 2, offset + 2 + comLen);
        let comStr = '';
        try {
          comStr = new TextDecoder('utf-8', { fatal: false }).decode(comBytes).trim();
        } catch {
          for (let c = 0; c < comBytes.length; c++) comStr += String.fromCharCode(comBytes[c]);
        }

        if (comStr) {
          result.customOwnership = result.customOwnership || {};
          result.customOwnership.comment = comStr;
          result.customOwnership.sourceType = 'JPEG Comment (COM Marker)';

          const authorMatch = comStr.match(/Author:\s*([^|]+)/i);
          if (authorMatch && authorMatch[1].trim()) result.customOwnership.author = authorMatch[1].trim();

          const copyMatch = comStr.match(/Copyright:\s*([^|]+)/i);
          if (copyMatch && copyMatch[1].trim()) result.customOwnership.copyright = copyMatch[1].trim();

          const titleMatch = comStr.match(/Title:\s*([^|]+)/i);
          if (titleMatch && titleMatch[1].trim()) result.customOwnership.title = titleMatch[1].trim();

          const tagsMatch = comStr.match(/Tags:\s*([^|]+)/i);
          if (tagsMatch && tagsMatch[1].trim()) result.customOwnership.keywords = tagsMatch[1].trim();
        }
      }

      // APP1: EXIF Header
      if (marker === 0xffe1 && markerLength > 8) {
        const exifIdent = String.fromCharCode(
          dataView.getUint8(offset + 2),
          dataView.getUint8(offset + 3),
          dataView.getUint8(offset + 4),
          dataView.getUint8(offset + 5)
        );
        if (exifIdent === 'Exif') {
          const tiffStart = offset + 8;
          if (tiffStart + 8 <= length) {
            const byteOrder = dataView.getUint16(tiffStart);
            const littleEndian = byteOrder === 0x4949;
            const firstIfdOffset = dataView.getUint32(tiffStart + 4, littleEndian);

            if (firstIfdOffset >= 8 && tiffStart + firstIfdOffset + 2 <= length) {
              let ifdOffset = tiffStart + firstIfdOffset;
              const tagCount = dataView.getUint16(ifdOffset, littleEndian);
              ifdOffset += 2;
              result.rawTagsCount = tagCount;

              for (let i = 0; i < Math.min(tagCount, 50); i++) {
                const tagPos = ifdOffset + i * 12;
                if (tagPos + 12 > length) break;
                const tag = dataView.getUint16(tagPos, littleEndian);
                const numValues = dataView.getUint32(tagPos + 4, littleEndian);
                const valOffset = tiffStart + dataView.getUint32(tagPos + 8, littleEndian);

                const readAscii = () => {
                  if (valOffset + numValues > length || numValues > 200) return '';
                  let s = '';
                  for (let j = 0; j < numValues - 1; j++) {
                    const ch = dataView.getUint8(valOffset + j);
                    if (ch === 0) break;
                    s += String.fromCharCode(ch);
                  }
                  return s.trim();
                };

                if (tag === 0x010f) result.make = readAscii();
                if (tag === 0x0110) result.model = readAscii();
                if (tag === 0x0131) result.software = readAscii();
                if (tag === 0x0132) result.dateTime = readAscii();
                if (tag === 0x013b) {
                  result.customOwnership = result.customOwnership || {};
                  result.customOwnership.author = readAscii();
                  result.customOwnership.sourceType = 'EXIF Artist Tag';
                }
                if (tag === 0x8298) {
                  result.customOwnership = result.customOwnership || {};
                  result.customOwnership.copyright = readAscii();
                  result.customOwnership.sourceType = 'EXIF Copyright Tag';
                }
                if (tag === 0x010e) {
                  result.customOwnership = result.customOwnership || {};
                  result.customOwnership.title = readAscii();
                }
                if (tag === 0x8825) {
                  result.hasGps = true;
                  result.gpsCoordinates = 'Latitude & Longitude embedded (Exif GPS IFD)';
                }
              }
            }
          }
        }
      }

      // APP11: JUMBF / C2PA marker (0xFFEB)
      if (marker === 0xffeb && markerLength > 8) {
        // Try to read JUMBF box type and label from the marker data
        const jumbfStart = offset + 2;
        if (jumbfStart + 20 <= length) {
          let jumbfStr = '';
          for (let j = jumbfStart; j < Math.min(jumbfStart + markerLength - 2, jumbfStart + 200); j++) {
            const ch = uint8Arr[j];
            jumbfStr += ch >= 32 && ch <= 126 ? String.fromCharCode(ch) : ' ';
          }
          if (jumbfStr.includes('c2pa') || jumbfStr.includes('jumb')) {
            result.c2pa.found = true;
            // Try to extract the JUMD type UUID from the raw bytes
            const jumdTypeIdx = jumbfStr.indexOf('jumd');
            if (jumdTypeIdx >= 0 && jumbfStart + jumdTypeIdx + 20 <= length) {
              const uuidStart = jumbfStart + jumdTypeIdx + 4;
              const uuidBytes: string[] = [];
              for (let u = 0; u < 16; u++) {
                uuidBytes.push(uint8Arr[uuidStart + u].toString(16).padStart(2, '0'));
              }
              result.c2pa.jumdType = uuidBytes.join('');
            }
            // Try to extract label
            const labelMatch = jumbfStr.match(/c2pa[\s.]*([a-z_.]*)/);
            result.c2pa.jumdLabel = labelMatch ? `c2pa${labelMatch[1]}` : 'c2pa';
          }
        }
      }

      // SOF (Start of Frame) - Dimensions & Color Subsampling
      if (marker >= 0xffc0 && marker <= 0xffc3) {
        const procName =
          marker === 0xffc0
            ? 'Baseline DCT, Huffman coding'
            : marker === 0xffc2
            ? 'Progressive DCT, Huffman coding'
            : marker === 0xffc1
            ? 'Extended sequential DCT, Huffman coding'
            : 'Lossless DCT, Huffman coding';

        result.encoding.encodingProcess = procName;
        result.encoding.bitsPerSample = dataView.getUint8(offset + 2);
        const h = dataView.getUint16(offset + 3);
        const w = dataView.getUint16(offset + 5);
        if (w > 0 && h > 0) {
          result.width = w;
          result.height = h;
          result.imageSize = `${w}x${h}`;
          result.megapixels = ((w * h) / 1000000).toFixed(1);
        }

        const components = dataView.getUint8(offset + 7);
        result.encoding.colorComponents = components;

        if (components >= 3 && offset + 11 <= length) {
          const ySampling = dataView.getUint8(offset + 9);
          const hFactor = (ySampling >> 4) & 0x0f;
          const vFactor = ySampling & 0x0f;
          if (hFactor === 2 && vFactor === 2) {
            result.encoding.yCbCrSubSampling = 'YCbCr4:2:0 (2 2)';
          } else if (hFactor === 2 && vFactor === 1) {
            result.encoding.yCbCrSubSampling = 'YCbCr4:2:2 (2 1)';
          } else if (hFactor === 1 && vFactor === 1) {
            result.encoding.yCbCrSubSampling = 'YCbCr4:4:4 (1 1)';
          } else {
            result.encoding.yCbCrSubSampling = `YCbCr (${hFactor} ${vFactor})`;
          }
        }
      }

      offset += markerLength;
    }
  }

  // 4. Fallback scanner for custom ownership tags in decoded text/XMP
  if (!result.customOwnership || (!result.customOwnership.author && !result.customOwnership.copyright)) {
    const authorMatch = rawText.match(/Author:\s*([^|\r\n\0]+)/i);
    const copyMatch = rawText.match(/Copyright:\s*([^|\r\n\0]+)/i);
    const titleMatch = rawText.match(/Title:\s*([^|\r\n\0]+)/i);
    const tagsMatch = rawText.match(/Tags:\s*([^|\r\n\0]+)/i);

    if (authorMatch || copyMatch || titleMatch || tagsMatch) {
      result.customOwnership = result.customOwnership || {};
      result.customOwnership.sourceType = result.customOwnership.sourceType || 'Embedded Text Metadata';
      if (authorMatch && !result.customOwnership.author) result.customOwnership.author = authorMatch[1].trim();
      if (copyMatch && !result.customOwnership.copyright) result.customOwnership.copyright = copyMatch[1].trim();
      if (titleMatch && !result.customOwnership.title) result.customOwnership.title = titleMatch[1].trim();
      if (tagsMatch && !result.customOwnership.keywords) result.customOwnership.keywords = tagsMatch[1].trim();
    }
  }

  // 5. Deep C2PA / Content Credentials & AI Provenance Scanning
  const hasC2paKeyword =
    rawText.includes('c2pa') ||
    rawText.includes('jumb') ||
    rawText.includes('trainedAlgorithmicMedia') ||
    rawText.includes('OpenAI') ||
    rawText.includes('gpt-image');

  if (hasC2paKeyword) {
    result.c2pa.found = true;

    const gptMatch = rawText.match(/(gpt-image-\w+|gpt-image-2|dall-e-\w+|midjourney[\w.-]*)/i);
    if (gptMatch) {
      result.c2pa.softwareAgentVersion = gptMatch[0];
      result.c2pa.softwareAgentName = 'API';
    }

    if (rawText.includes('trainedAlgorithmicMedia')) {
      result.c2pa.digitalSourceType = 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';
    }

    if (rawText.includes('OpenAI Media Service API')) {
      result.c2pa.claimGeneratorName = 'OpenAI Media Service API';
    } else if (rawText.includes('Adobe Firefly')) {
      result.c2pa.claimGeneratorName = 'Adobe Firefly Engine';
    } else if (rawText.includes('Content Authenticity')) {
      result.c2pa.claimGeneratorName = 'Content Authenticity Initiative (CAI)';
    }

    const orgMatch = rawText.match(/(contentauth[\s\w.-]*rs[\d.]+|contentauth[\s\w.-]*)/i);
    if (orgMatch) {
      result.c2pa.claimGeneratorOrg = orgMatch[0].trim();
    }

    const specMatch = rawText.match(/(?:spec|version)[^\d]{1,10}(2\.[0-9]\.[0-9]|1\.[0-9])/i);
    if (specMatch) {
      result.c2pa.specVersion = specMatch[1];
    }

    const iidMatch = rawText.match(/(xmp:iid:[a-zA-Z0-9-]+|urn:uuid:[a-zA-Z0-9-]+)/i);
    if (iidMatch) {
      result.c2pa.instanceId = iidMatch[0];
    }

    const sigMatch = rawText.match(/(?:self#jumbf=)?([^\s"']*(?:c2pa\.signature|urn:c2pa:[a-zA-Z0-9-]+)[^\s"']*)/i);
    if (sigMatch) {
      result.c2pa.signatureUri = sigMatch[0];
    }

    if (!result.c2pa.algorithm) {
      // Try to detect algorithm from raw text
      if (rawText.includes('sha256')) result.c2pa.algorithm = 'sha256';
      else if (rawText.includes('sha384')) result.c2pa.algorithm = 'sha384';
      else if (rawText.includes('sha512')) result.c2pa.algorithm = 'sha512';
    }
    if (rawText.includes('jumbf manifest') || rawText.includes('jumb')) {
      result.c2pa.manifestName = 'jumbf manifest';
    }
  }

  // Format aspect ratio
  if (result.width > 0 && result.height > 0) {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(result.width, result.height);
    const wRatio = Math.round(result.width / divisor);
    const hRatio = Math.round(result.height / divisor);
    result.aspectRatio = wRatio <= 16 && hRatio <= 16 ? `${wRatio}:${hRatio}` : `${(result.width / result.height).toFixed(2)}:1`;
  }

  return result;
}

export default function ImageMetadataRemover() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cleanDataUrl, setCleanDataUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [cleanSize, setCleanSize] = useState<number>(0);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDownloadingCustom, setIsDownloadingCustom] = useState<boolean>(false);
  const [customDownloadSuccess, setCustomDownloadSuccess] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<ExtractedMetadata | null>(null);
  const [activeAction, setActiveAction] = useState<'clean' | 'custom' | 'details'>('clean');
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [copiedHex, setCopiedHex] = useState<boolean>(false);

  // Custom metadata input fields
  const [customMeta, setCustomMeta] = useState<CustomMetadata>({
    author: '',
    copyright: `© ${new Date().getFullYear()} All Rights Reserved`,
    title: '',
    description: '',
    keywords: '',
  });

  const handleIncomingFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    setSelectedFile(file);
    setOriginalSize(file.size);
    setIsProcessing(true);

    let exifrData: any = null;
    try {
      const exifr = await import('exifr');
      exifrData = await exifr.default.parse(file, { tiff: true, xmp: true, icc: true, iptc: true, jfif: true, gps: true });
    } catch (err) {
      console.warn("exifr parsing failed:", err);
    }

    const binaryReader = new FileReader();
    binaryReader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const parsedMeta = parseDeepImageMetadata(buffer, file);

      if (exifrData) {
        parsedMeta.allExifrTags = exifrData;
        parsedMeta.make = exifrData.Make || parsedMeta.make;
        parsedMeta.model = exifrData.Model || parsedMeta.model;
        parsedMeta.software = exifrData.Software || parsedMeta.software;
        // Keep string representations but use exifr's if available
        if (exifrData.DateTimeOriginal || exifrData.CreateDate || exifrData.ModifyDate) {
          const dt = exifrData.DateTimeOriginal || exifrData.CreateDate || exifrData.ModifyDate;
          parsedMeta.dateTime = typeof dt === 'string' ? dt : (dt instanceof Date ? dt.toISOString() : String(dt));
        }
        
        if (exifrData.latitude != null && exifrData.longitude != null) {
          parsedMeta.hasGps = true;
          parsedMeta.gpsLatitude = exifrData.latitude;
          parsedMeta.gpsLongitude = exifrData.longitude;
          parsedMeta.gpsAltitude = exifrData.GPSAltitude;
          const latDir = exifrData.latitude >= 0 ? 'N' : 'S';
          const lngDir = exifrData.longitude >= 0 ? 'E' : 'W';
          parsedMeta.gpsCoordinates = `${Math.abs(exifrData.latitude).toFixed(4)}° ${latDir}, ${Math.abs(exifrData.longitude).toFixed(4)}° ${lngDir}`;
        }
        
        parsedMeta.exposureTime = exifrData.ExposureTime;
        parsedMeta.fNumber = exifrData.FNumber;
        parsedMeta.iso = exifrData.ISO;
        parsedMeta.focalLength = exifrData.FocalLength;
        parsedMeta.focalLengthIn35mm = exifrData.FocalLengthIn35mmFormat;
        parsedMeta.flash = exifrData.Flash;
        parsedMeta.whiteBalance = exifrData.WhiteBalance;
        parsedMeta.lensModel = exifrData.LensModel || exifrData.Lens;
        parsedMeta.meteringMode = exifrData.MeteringMode;
        parsedMeta.exposureProgram = exifrData.ExposureProgram;
        parsedMeta.exposureCompensation = exifrData.ExposureCompensation;
        parsedMeta.sceneCaptureType = exifrData.SceneCaptureType;
        parsedMeta.colorSpace = exifrData.ColorSpace;
        parsedMeta.orientation = exifrData.Orientation;
        parsedMeta.contrast = exifrData.Contrast;
        parsedMeta.saturation = exifrData.Saturation;
        parsedMeta.sharpness = exifrData.Sharpness;
        parsedMeta.digitalZoomRatio = exifrData.DigitalZoomRatio;
        parsedMeta.subjectDistance = exifrData.SubjectDistance;
        parsedMeta.lightSource = exifrData.LightSource;
      }


      // If the uploaded file already has custom ownership (e.g. from previous download), pre-populate input fields!
      if (parsedMeta.customOwnership) {
        setCustomMeta((prev) => ({
          author: parsedMeta.customOwnership?.author || prev.author,
          copyright: parsedMeta.customOwnership?.copyright || prev.copyright,
          title: parsedMeta.customOwnership?.title || prev.title,
          description: parsedMeta.customOwnership?.description || prev.description,
          keywords: parsedMeta.customOwnership?.keywords || prev.keywords,
        }));
      }

      const imgReader = new FileReader();
      imgReader.onload = (evt) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          if (parsedMeta.width === 0 || parsedMeta.height === 0) {
            parsedMeta.width = img.width;
            parsedMeta.height = img.height;
            parsedMeta.imageSize = `${img.width}x${img.height}`;
            parsedMeta.megapixels = ((img.width * img.height) / 1000000).toFixed(1);
          }
          setMetadata(parsedMeta);

          // Generate clean rasterized version via HTML5 Canvas
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const cleanUrl = canvas.toDataURL(format, 0.95);
            setCleanDataUrl(cleanUrl);

            const head = `data:${format};base64,`;
            const cleanBytes = Math.round(((cleanUrl.length - head.length) * 3) / 4);
            setCleanSize(cleanBytes);
          }
          setIsProcessing(false);
        };
        img.src = evt.target?.result as string;
      };
      imgReader.readAsDataURL(file);
    };
    binaryReader.readAsArrayBuffer(file);
  };

  // Pre-load an authentic DALL-E / OpenAI AI-generated Duck sample
  const loadAiGeneratedDuckSample = () => {
    setIsProcessing(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1122;
    canvas.height = 1402;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const bgGrad = ctx.createLinearGradient(0, 0, 1122, 1402);
      bgGrad.addColorStop(0, '#fef3c7');
      bgGrad.addColorStop(0.5, '#fde68a');
      bgGrad.addColorStop(1, '#d97706');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1122, 1402);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 4;
      for (let r = 80; r < 500; r += 70) {
        ctx.beginPath();
        ctx.ellipse(561, 850, r, r * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(561, 650, 140, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(650, 520, 80, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.moveTo(710, 510);
      ctx.lineTo(810, 535);
      ctx.lineTo(710, 560);
      ctx.fill();

      ctx.fillStyle = '#1c1917';
      ctx.beginPath();
      ctx.arc(660, 500, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.roundRect?.(100, 1250, 922, 90, 20);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🤖 AI Generated Media • C2PA Manifest • gpt-image-2', 561, 1306);
    }

    const mockAiMeta: ExtractedMetadata = {
      fileName: 'Duck-ai-image-2026-09-20-10-20.jpeg',
      fileSize: 224 * 1024,
      fileType: 'JPEG',
      fileTypeExtension: 'jpg',
      mimeType: 'image/jpeg',
      category: 'image',
      lastModified: '2026-09-20T10:20:00.000Z',
      width: 1122,
      height: 1402,
      imageSize: '1122x1402',
      megapixels: '1.6',
      aspectRatio: '4:5',
      hasGps: false,
      rawTagsCount: 0,
      encoding: {
        encodingProcess: 'Baseline DCT, Huffman coding',
        bitsPerSample: 8,
        colorComponents: 3,
        yCbCrSubSampling: 'YCbCr4:2:0 (2 2)',
        jfifVersion: '1.01',
        resolutionUnit: 'None',
        xResolution: 1,
        yResolution: 1,
      },
      c2pa: {
        found: true,
        jumdType: '(c2pa)-0011-0010-800000aa00389b71',
        jumdLabel: 'c2pa',
        softwareAgentName: 'API',
        softwareAgentVersion: 'gpt-image-2',
        digitalSourceType: 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
        claimGeneratorName: 'OpenAI Media Service API',
        claimGeneratorOrg: 'contentauth c2 pa rs0.79.2',
        specVersion: '2.2.0',
        instanceId: 'xmp:iid:4f309a99-d6d3-4065-9fff-536644046d22',
        signatureUri: 'self#jumbf=/c2pa/urn:c2pa:28a3e788-a454-4934-afb5-1a487ec06905/c2pa.signature',
        algorithm: 'sha256',
        manifestName: 'jumbf manifest',
      },
      rawHeaderHex: [
        'FF D8 FF E0 00 10 4A 46 49 46 00 01 01 00 00 01',
        '00 01 00 00 FF EB 5C 27 4A 50 02 11 00 00 00 01',
        '00 00 5C 1D 6A 75 6D 62 00 00 00 1E 6A 75 6D 64',
        '63 32 70 61 00 11 00 10 80 00 00 AA 00 38 9B 71',
      ],
      rawHeaderAscii: [
        '......JFIF......',
        '......\\\'JP......',
        '..\\.jumb....jumd',
        'c2pa.........8.q',
      ],
    };

    const cleanUrl = canvas.toDataURL('image/jpeg', 0.95);
    const mockFile = new File([''], 'Duck-ai-image-2026-09-20-10-20.jpeg', { type: 'image/jpeg' });

    setSelectedFile(mockFile);
    setOriginalSize(224 * 1024);
    setCleanDataUrl(cleanUrl);
    setCleanSize(Math.round(((cleanUrl.length - 'data:image/jpeg;base64,'.length) * 3) / 4));
    setMetadata(mockAiMeta);
    setActiveAction('details');
    setIsProcessing(false);
  };

  // Pre-load Camera Sample with EXIF & GPS
  const loadCameraSample = () => {
    setIsProcessing(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 1920, 1080);
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.5, '#38bdf8');
      grad.addColorStop(1, '#fbbf24');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1920, 1080);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('📷 Kerala Sunset Beach • iPhone 15 Pro Sample Photo', 960, 540);
    }

    const mockCameraMeta: ExtractedMetadata = {
      fileName: 'IMG_2026_KERALA_BEACH.jpg',
      fileSize: 3.4 * 1024 * 1024,
      fileType: 'JPEG',
      fileTypeExtension: 'jpg',
      mimeType: 'image/jpeg',
      category: 'image',
      lastModified: '2026-09-15T18:45:00.000Z',
      width: 1920,
      height: 1080,
      imageSize: '1920x1080',
      megapixels: '2.1',
      aspectRatio: '16:9',
      make: 'Apple',
      model: 'iPhone 15 Pro Max',
      software: 'iOS 18.1 Camera Engine',
      dateTime: '2026:09:15 18:45:12',
      hasGps: true,
      gpsCoordinates: '9.9312° N, 76.2673° E (Kochi, Kerala)',
      rawTagsCount: 42,
      encoding: {
        encodingProcess: 'Baseline DCT, Huffman coding',
        bitsPerSample: 8,
        colorComponents: 3,
        yCbCrSubSampling: 'YCbCr4:2:0 (2 2)',
        jfifVersion: '1.02',
        resolutionUnit: 'inches (DPI)',
        xResolution: 72,
        yResolution: 72,
      },
      c2pa: {
        found: false,
      },
      rawHeaderHex: [
        'FF D8 FF E1 23 45 45 78 69 66 00 00 49 49 2A 00',
        '08 00 00 00 12 00 0F 01 02 00 06 00 00 00 8A 00',
      ],
      rawHeaderAscii: [
        '..#EExif..II*...',
        '................',
      ],
    };

    const cleanUrl = canvas.toDataURL('image/jpeg', 0.95);
    const mockFile = new File([''], 'IMG_2026_KERALA_BEACH.jpg', { type: 'image/jpeg' });

    setSelectedFile(mockFile);
    setOriginalSize(3.4 * 1024 * 1024);
    setCleanDataUrl(cleanUrl);
    setCleanSize(Math.round(((cleanUrl.length - 'data:image/jpeg;base64,'.length) * 3) / 4));
    setMetadata(mockCameraMeta);
    setActiveAction('clean');
    setIsProcessing(false);
  };

  const handleFormatChange = (newFormat: 'image/jpeg' | 'image/png' | 'image/webp') => {
    setFormat(newFormat);
    if (!cleanDataUrl) return;

    const img = new Image();
    img.src = cleanDataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const newUrl = canvas.toDataURL(newFormat, 0.95);
        setCleanDataUrl(newUrl);

        const head = `data:${newFormat};base64,`;
        const newBytes = Math.round(((newUrl.length - head.length) * 3) / 4);
        setCleanSize(newBytes);
      }
    };
  };

  const handleCustomMetaChange = (field: keyof CustomMetadata, value: string) => {
    setCustomMeta((prev) => ({ ...prev, [field]: value }));
  };

  // Immediate 100% reliable download with embedded custom metadata tags
  const handleDownloadCustomImage = async () => {
    if (!cleanDataUrl) return;
    setIsDownloadingCustom(true);

    try {
      const res = await fetch(cleanDataUrl);
      const buffer = await res.arrayBuffer();

      const effectiveMeta = {
        author: customMeta.author.trim(),
        copyright: customMeta.copyright.trim(),
        title: customMeta.title.trim(),
        description: customMeta.description.trim(),
        keywords: customMeta.keywords.trim(),
      };

      // Don't inject if nothing was entered
      if (!effectiveMeta.author && !effectiveMeta.copyright && !effectiveMeta.title && !effectiveMeta.keywords) {
        alert('Please enter at least one metadata field (Author, Copyright, Title, or Tags).');
        setIsDownloadingCustom(false);
        return;
      }

      let injectedBytes: Uint8Array;
      if (format === 'image/png') {
        injectedBytes = injectPngTextChunks(buffer, {
          Author: effectiveMeta.author,
          Copyright: effectiveMeta.copyright,
          Title: effectiveMeta.title,
          Description: effectiveMeta.description,
          Keywords: effectiveMeta.keywords,
        });
      } else {
        const comString = `Author: ${effectiveMeta.author} | Copyright: ${effectiveMeta.copyright} | Title: ${effectiveMeta.title} | Tags: ${effectiveMeta.keywords}`;
        injectedBytes = injectJpegComment(buffer, comString);
      }

      const blob = new Blob([injectedBytes.buffer as ArrayBuffer], { type: format });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      const baseName = metadata?.fileName ? metadata.fileName.replace(/\.[^/.]+$/, '') : 'image';
      const outExt = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
      a.download = `custom_${baseName}.${outExt}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      setCustomDownloadSuccess(true);
      setTimeout(() => setCustomDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating custom image with metadata:', err);
      alert('Failed to generate image with custom metadata.');
    } finally {
      setIsDownloadingCustom(false);
    }
  };

  // Export JSON Report formatted exactly matching standard schema
  const exportMetadataJson = () => {
    if (!metadata) return;

    const report: Record<string, any> = {
      'File Properties': {
        'file name': metadata.fileName,
        'file size': `${(metadata.fileSize / 1024).toFixed(0)} kB`,
        'file type': metadata.fileType,
        'file type extension': metadata.fileTypeExtension,
        'mime type': metadata.mimeType,
        'jfif version': metadata.encoding.jfifVersion || '1.01',
        'resolution unit': metadata.encoding.resolutionUnit || 'None',
        'x resolution': metadata.encoding.xResolution ?? 1,
        'y resolution': metadata.encoding.yResolution ?? 1,
        'category': metadata.category,
        'image width': metadata.width,
        'image height': metadata.height,
        'image size': metadata.imageSize,
        'megapixels': metadata.megapixels,
        'encoding process': metadata.encoding.encodingProcess || 'Baseline DCT, Huffman coding',
        'bits per sample': metadata.encoding.bitsPerSample || 8,
        'color components': metadata.encoding.colorComponents || 3,
        'y cb cr sub sampling': metadata.encoding.yCbCrSubSampling || 'YCbCr4:2:0 (2 2)',
      },
    };

    if (metadata.customOwnership) {
      report['Custom Ownership & Copyright'] = {
        'author': metadata.customOwnership.author || 'None',
        'copyright': metadata.customOwnership.copyright || 'None',
        'title': metadata.customOwnership.title || 'None',
        'keywords': metadata.customOwnership.keywords || 'None',
        'comment': metadata.customOwnership.comment || 'None',
        'source format': metadata.customOwnership.sourceType || 'Embedded Tags',
      };
    }

    if (metadata.c2pa.found) {
      const c2paReport: Record<string, string | undefined> = {};
      if (metadata.c2pa.jumdType) c2paReport['jumd type'] = metadata.c2pa.jumdType;
      if (metadata.c2pa.jumdLabel) c2paReport['jumd label'] = metadata.c2pa.jumdLabel;
      if (metadata.c2pa.softwareAgentName) c2paReport['actions software agent name'] = metadata.c2pa.softwareAgentName;
      if (metadata.c2pa.softwareAgentVersion) c2paReport['actions software agent version'] = metadata.c2pa.softwareAgentVersion;
      if (metadata.c2pa.digitalSourceType) c2paReport['actions digital source type'] = metadata.c2pa.digitalSourceType;
      if (metadata.c2pa.claimGeneratorName) c2paReport['claim generator info name'] = metadata.c2pa.claimGeneratorName;
      if (metadata.c2pa.claimGeneratorOrg) c2paReport['claim generator info org'] = metadata.c2pa.claimGeneratorOrg;
      if (metadata.c2pa.specVersion) c2paReport['claim generator info spec version'] = metadata.c2pa.specVersion;
      if (metadata.c2pa.instanceId) c2paReport['instance id'] = metadata.c2pa.instanceId;
      if (metadata.c2pa.signatureUri) c2paReport['signature'] = metadata.c2pa.signatureUri;
      if (metadata.c2pa.manifestName) c2paReport['name'] = metadata.c2pa.manifestName;
      if (metadata.c2pa.algorithm) c2paReport['alg'] = metadata.c2pa.algorithm;
      report['C2PA Content Credentials'] = c2paReport;
    } else {
      report['C2PA Content Credentials'] = { status: 'No C2PA manifest found' };
    }

    const cameraReport: Record<string, any> = {
      'camera make': metadata.make || 'None',
      'camera model': metadata.model || 'None',
      'lens model': metadata.lensModel || 'None',
      'camera software': metadata.software || 'None',
      'capture date': metadata.dateTime || 'None',
    };

    if (metadata.exposureTime) cameraReport['shutter speed'] = metadata.exposureTime >= 1 ? `${metadata.exposureTime}s` : `1/${Math.round(1 / metadata.exposureTime)}s`;
    if (metadata.fNumber) cameraReport['aperture'] = `f/${metadata.fNumber}`;
    if (metadata.iso) cameraReport['iso'] = metadata.iso;
    if (metadata.focalLength) cameraReport['focal length'] = `${metadata.focalLength}mm`;
    if (metadata.flash) cameraReport['flash'] = metadata.flash;
    if (metadata.whiteBalance) cameraReport['white balance'] = metadata.whiteBalance;
    if (metadata.exposureProgram) cameraReport['exposure program'] = metadata.exposureProgram;
    if (metadata.meteringMode) cameraReport['metering mode'] = metadata.meteringMode;

    cameraReport['has gps location'] = metadata.hasGps;
    if (metadata.hasGps) {
      cameraReport['gps coordinates'] = metadata.gpsCoordinates;
      cameraReport['gps latitude'] = metadata.gpsLatitude;
      cameraReport['gps longitude'] = metadata.gpsLongitude;
      if (metadata.gpsAltitude != null) cameraReport['gps altitude'] = metadata.gpsAltitude;
    }

    report['Camera & Hardware EXIF'] = cameraReport;

    if (metadata.allExifrTags) {
      report['All Raw Parsed Tags (exifr)'] = metadata.allExifrTags;
    }

    report['Raw Data'] = {
      'raw header hex': metadata.rawHeaderHex.join('\n'),
    };

    const jsonStr = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${metadata.fileName.replace(/\.[^/.]+$/, '')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJsonToClipboard = () => {
    if (!metadata) return;
    const jsonStr = JSON.stringify(metadata, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const copyHexToClipboard = () => {
    if (!metadata) return;
    navigator.clipboard.writeText(metadata.rawHeaderHex.join('\n'));
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCleanDataUrl(null);
    setOriginalSize(0);
    setCleanSize(0);
    setMetadata(null);
    setActiveAction('clean');
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 shadow-xs max-w-4xl mx-auto w-full min-w-0 overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-stone-200/80 gap-3 min-w-0 w-full">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70 shrink-0">
              <Eye className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Image Metadata &amp; C2PA AI Inspector
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1 leading-relaxed">
            Inspect C2PA AI credentials, camera EXIF, GPS location, and raw hex headers—or clean all metadata 100% privately.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 text-xs px-3.5 py-1.5 rounded-full font-semibold self-start sm:self-auto shrink-0 shadow-xs">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>100% Private (Browser Local)</span>
        </div>
      </div>

      {/* STEP 1: UPLOAD OR DEMO */}
      {!selectedFile ? (
        <div className="space-y-4 min-w-0 w-full">
          <div
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleIncomingFile(file);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-10 text-center transition-all cursor-pointer min-w-0 w-full ${
              isDragging
                ? 'border-amber-600 bg-amber-50/50'
                : 'border-stone-300 hover:border-amber-500 bg-[#FAF8F5]/80 hover:bg-amber-50/20'
            }`}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              id="metaImageInput"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleIncomingFile(file);
              }}
              className="hidden"
            />
            <label htmlFor="metaImageInput" className="cursor-pointer space-y-3 block min-w-0">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-xs">
                <Upload className="w-7 h-7" />
              </div>
              <div className="min-w-0 px-2">
                <span className="font-extrabold text-base sm:text-lg text-stone-900 block truncate">
                  Drop an image here, or click to browse
                </span>
                <span className="text-xs text-stone-500 font-medium mt-1 block">
                  Inspects C2PA AI credentials, EXIF, GPS, JFIF, and SOF markers (JPG, PNG, WebP)
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100/70 px-3.5 py-1.5 rounded-full max-w-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">Instantly reveals DALL-E / ChatGPT C2PA provenance &amp; camera hardware</span>
              </div>
            </label>
          </div>

          {/* Quick Demo Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 min-w-0">
            <button
              onClick={loadAiGeneratedDuckSample}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-3.5 py-2 rounded-xl transition-all shadow-2xs"
            >
              <Cpu className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Try with AI Image (OpenAI C2PA Manifest)</span>
            </button>

            <button
              onClick={loadCameraSample}
              className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 px-3.5 py-2 rounded-xl transition-all shadow-2xs"
            >
              <Camera className="w-3.5 h-3.5 text-stone-600 shrink-0" />
              <span>Try with Phone Photo (Camera EXIF &amp; GPS)</span>
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: SUMMARY & USER-FRIENDLY ACTION CARDS */
        <div className="space-y-6 min-w-0 w-full">
          {/* Quick Summary Card */}
          <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 min-w-0 w-full overflow-hidden">
            {/* Image Thumbnail */}
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cleanDataUrl || ''}
                alt={metadata?.fileName || 'Uploaded preview'}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-stone-200 shadow-xs bg-white"
              />
            </div>

            {/* Quick Badges */}
            <div className="flex-1 space-y-2 text-center sm:text-left min-w-0 w-full overflow-hidden">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 min-w-0">
                <span className="font-extrabold text-stone-900 text-sm truncate max-w-[180px] sm:max-w-[280px]" title={metadata?.fileName}>
                  {metadata?.fileName}
                </span>
                <span className="bg-white border border-stone-200 text-stone-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0">
                  {metadata?.megapixels} MP • {metadata?.width}×{metadata?.height}px
                </span>
                <span className="bg-white border border-stone-200 text-stone-600 font-mono text-[11px] px-2.5 py-0.5 rounded-full shrink-0">
                  {(originalSize / 1024).toFixed(0)} kB
                </span>
              </div>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs min-w-0">
                {/* Custom Ownership Badge (if already present in the uploaded image) */}
                {metadata?.customOwnership && (metadata.customOwnership.author || metadata.customOwnership.copyright) && (
                  <span className="inline-flex items-center gap-1 bg-amber-100/90 border border-amber-300 text-amber-900 font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                    <UserCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate max-w-[220px]">
                      {metadata.customOwnership.copyright || `© ${metadata.customOwnership.author}`}
                    </span>
                  </span>
                )}

                {/* AI Provenance Badge */}
                {metadata?.c2pa.found ? (
                  <span className="inline-flex items-center gap-1 bg-amber-100/80 border border-amber-300 text-amber-900 font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                    <Cpu className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate max-w-[220px]">C2PA AI ({metadata.c2pa.softwareAgentVersion || 'AI Generated'})</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 text-stone-600 font-medium px-2.5 py-1 rounded-lg">
                    <span>Standard Photo</span>
                  </span>
                )}

                {/* GPS Status */}
                {metadata?.hasGps ? (
                  <span className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 text-rose-800 font-bold px-2.5 py-1 rounded-lg">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>GPS Embedded</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>No GPS</span>
                  </span>
                )}

                {/* Encoding / Subsampling */}
                <span className="inline-flex items-center gap-1 bg-white border border-stone-200 text-stone-700 font-medium px-2.5 py-1 rounded-lg text-[11px]">
                  <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{metadata?.encoding.yCbCrSubSampling || 'RGB'}</span>
                </span>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-3.5 py-2 rounded-xl transition-all shadow-xs font-semibold shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Upload New</span>
            </button>
          </div>

          {/* STEP 3: THREE ACTION TABS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-w-0 w-full">
            {/* Tab 1: Clean & Safe */}
            <button
              onClick={() => setActiveAction('clean')}
              className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between gap-2 min-w-0 overflow-hidden ${
                activeAction === 'clean'
                  ? 'bg-amber-50/80 border-amber-500 shadow-xs ring-1 ring-amber-500'
                  : 'bg-white border-stone-200/90 hover:border-amber-300'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 font-extrabold text-sm text-stone-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">1. Download Clean</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed font-normal">
                  Strip all AI watermarks, GPS location, and camera tags with canvas sanitization.
                </p>
              </div>
              <span className="text-[11px] font-bold text-amber-800 self-start">Sanitize Image →</span>
            </button>

            {/* Tab 2: Add Custom Metadata */}
            <button
              onClick={() => setActiveAction('custom')}
              className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between gap-2 min-w-0 overflow-hidden ${
                activeAction === 'custom'
                  ? 'bg-amber-50/80 border-amber-500 shadow-xs ring-1 ring-amber-500'
                  : 'bg-white border-stone-200/90 hover:border-amber-300'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 font-extrabold text-sm text-stone-900">
                  <PenTool className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">2. Add My Copyright</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed font-normal">
                  Inject your photographer name, copyright, and title into the clean binary.
                </p>
              </div>
              <span className="text-[11px] font-bold text-amber-800 self-start">Add Ownership →</span>
            </button>

            {/* Tab 3: Detailed Technical EXIF & C2PA */}
            <button
              onClick={() => setActiveAction('details')}
              className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between gap-2 min-w-0 overflow-hidden ${
                activeAction === 'details'
                  ? 'bg-amber-50/80 border-amber-500 shadow-xs ring-1 ring-amber-500'
                  : 'bg-white border-stone-200/90 hover:border-amber-300'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 font-extrabold text-sm text-stone-900">
                  <Eye className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">3. View All Metadata</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed font-normal">
                  Inspect C2PA credentials, JFIF, SOF encoding, EXIF, and export JSON report.
                </p>
              </div>
              <span className="text-[11px] font-bold text-amber-800 self-start">View Details &amp; JSON →</span>
            </button>
          </div>

          {/* ACTION PANEL 1: CLEAN DOWNLOAD */}
          {activeAction === 'clean' && (
            <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-5 min-w-0 w-full overflow-hidden">
              <div className="space-y-1 min-w-0">
                <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Download 100% Sanitized Image</span>
                </h3>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  The image pixels have been cleanly redrawn onto an isolated canvas. All embedded C2PA manifests, GPS coordinates, camera serial numbers, and creation timestamps have been completely stripped.
                </p>
              </div>

              {/* Format Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200 min-w-0 w-full">
                <span className="text-xs font-bold text-stone-700">Choose Output File Format:</span>
                <div className="flex items-center gap-2">
                  {(['image/jpeg', 'image/png', 'image/webp'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => handleFormatChange(fmt)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        format === fmt
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {fmt === 'image/jpeg' ? 'JPG' : fmt === 'image/png' ? 'PNG' : 'WebP'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Download Button */}
              <div className="pt-1 min-w-0 w-full">
                <a
                  href={cleanDataUrl || ''}
                  download={`clean_${metadata?.fileName || 'image'}.${format.split('/')[1]}`}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-card transition-all"
                >
                  <Download className="w-5 h-5 shrink-0" />
                  <span>Download Clean Image ({format.split('/')[1].toUpperCase()})</span>
                </a>
              </div>
            </div>
          )}

          {/* ACTION PANEL 2: ADD CUSTOM METADATA */}
          {activeAction === 'custom' && (
            <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-5 min-w-0 w-full overflow-hidden">
              <div className="space-y-1 min-w-0">
                <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Add Your Name &amp; Copyright Notice</span>
                </h3>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  Enter your details below. We embed them directly into the clean binary (JPEG COM marker or PNG tEXt chunks) so your ownership travels with the file and can be verified by any inspector.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs min-w-0 w-full">
                <div className="space-y-1 min-w-0">
                  <label className="font-bold text-stone-700 block">Photographer / Author Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={customMeta.author}
                    onChange={(e) => handleCustomMetaChange('author', e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-hidden focus:border-amber-600 font-medium"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <label className="font-bold text-stone-700 block">Copyright Notice</label>
                  <input
                    type="text"
                    placeholder={`© ${new Date().getFullYear()} All Rights Reserved`}
                    value={customMeta.copyright}
                    onChange={(e) => handleCustomMetaChange('copyright', e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-hidden focus:border-amber-600 font-medium"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <label className="font-bold text-stone-700 block">Photo Title (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Golden Sunset in Kochi"
                    value={customMeta.title}
                    onChange={(e) => handleCustomMetaChange('title', e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-hidden focus:border-amber-600 font-medium"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <label className="font-bold text-stone-700 block">Tags / Keywords (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. art, photography, landscape"
                    value={customMeta.keywords}
                    onChange={(e) => handleCustomMetaChange('keywords', e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-hidden focus:border-amber-600 font-medium"
                  />
                </div>
              </div>

              {/* Download with Custom Metadata Button */}
              <div className="pt-2 min-w-0 w-full space-y-2">
                <button
                  type="button"
                  onClick={handleDownloadCustomImage}
                  disabled={isDownloadingCustom}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-card transition-all disabled:opacity-50 cursor-pointer"
                >
                  {customDownloadSuccess ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  ) : (
                    <Download className="w-5 h-5 shrink-0" />
                  )}
                  <span>
                    {customDownloadSuccess
                      ? 'Downloaded with Your Metadata!'
                      : isDownloadingCustom
                      ? 'Injecting Metadata & Downloading...'
                      : `Download Image with My Copyright (${format.split('/')[1].toUpperCase()})`}
                  </span>
                </button>
                <p className="text-[11px] text-center text-stone-500 font-medium">
                  When re-uploaded, this file will show your author name and copyright in the inspection tab.
                </p>
              </div>
            </div>
          )}

          {/* ACTION PANEL 3: DEEP C2PA, EXIF, ENCODING & JSON REPORT */}
          {activeAction === 'details' && metadata && (
            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-6 space-y-6 min-w-0 w-full overflow-hidden">
              {/* Header with Export Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-4 gap-3 min-w-0 w-full">
                <div className="min-w-0">
                  <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>Deep Image Inspection &amp; Metadata Report</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    Detailed breakdown of C2PA provenance, SOF compression, JFIF, EXIF, and raw headers.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={copyJsonToClipboard}
                    className="inline-flex items-center gap-1.5 text-xs text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 font-bold px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                    <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                  </button>

                  <button
                    onClick={exportMetadataJson}
                    className="inline-flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 font-bold px-3.5 py-1.5 rounded-lg transition-colors shadow-xs"
                  >
                    <FileDown className="w-3.5 h-3.5 text-amber-700" />
                    <span>Download JSON</span>
                  </button>
                </div>
              </div>

              {/* 1. CUSTOM EMBEDDED OWNERSHIP (IF FOUND IN THE IMAGE) */}
              {metadata.customOwnership &&
                (metadata.customOwnership.author ||
                  metadata.customOwnership.copyright ||
                  metadata.customOwnership.title ||
                  metadata.customOwnership.comment) && (
                  <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 sm:p-4.5 space-y-3 min-w-0 w-full overflow-hidden">
                    <div className="flex items-center justify-between pb-2 border-b border-amber-200 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="p-1 rounded-md bg-amber-200 text-amber-900 shrink-0">
                          <UserCheck className="w-4 h-4 text-amber-800" />
                        </span>
                        <span className="font-extrabold text-sm text-stone-900 truncate">
                          Custom Ownership &amp; Embedded Copyright
                        </span>
                      </div>
                      <span className="text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full shrink-0">
                        {metadata.customOwnership.sourceType || 'Embedded Tags'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs min-w-0 w-full">
                      {metadata.customOwnership.author && (
                        <div className="flex justify-between py-1 border-b border-amber-100 min-w-0 gap-2">
                          <span className="text-stone-600 shrink-0">Author / Photographer:</span>
                          <span className="font-bold text-stone-900 truncate text-right">{metadata.customOwnership.author}</span>
                        </div>
                      )}
                      {metadata.customOwnership.copyright && (
                        <div className="flex justify-between py-1 border-b border-amber-100 min-w-0 gap-2">
                          <span className="text-stone-600 shrink-0">Copyright Notice:</span>
                          <span className="font-bold text-stone-900 truncate text-right">{metadata.customOwnership.copyright}</span>
                        </div>
                      )}
                      {metadata.customOwnership.title && (
                        <div className="flex justify-between py-1 border-b border-amber-100 min-w-0 gap-2">
                          <span className="text-stone-600 shrink-0">Photo Title:</span>
                          <span className="font-semibold text-stone-900 truncate text-right">{metadata.customOwnership.title}</span>
                        </div>
                      )}
                      {metadata.customOwnership.keywords && (
                        <div className="flex justify-between py-1 border-b border-amber-100 min-w-0 gap-2">
                          <span className="text-stone-600 shrink-0">Keywords / Tags:</span>
                          <span className="font-mono text-stone-800 truncate text-right">{metadata.customOwnership.keywords}</span>
                        </div>
                      )}
                      {metadata.customOwnership.comment && !metadata.customOwnership.author && (
                        <div className="md:col-span-2 flex flex-col py-1 min-w-0">
                          <span className="text-stone-600 font-medium">Raw Comment:</span>
                          <span className="font-mono text-stone-800 text-[11px] break-all select-all mt-0.5">
                            {metadata.customOwnership.comment}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* 2. C2PA / CONTENT CREDENTIALS SECTION (IF PRESENT) */}
              {metadata.c2pa.found ? (
                <div className="bg-amber-50/60 border border-amber-300 rounded-xl p-4 sm:p-4.5 space-y-3 min-w-0 w-full overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-200 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="p-1 rounded-md bg-amber-200 text-amber-900 shrink-0">
                        <Cpu className="w-4 h-4 text-amber-800" />
                      </span>
                      <span className="font-extrabold text-sm text-stone-900 truncate">
                        C2PA Content Credentials &amp; AI Provenance
                      </span>
                    </div>
                    <span className="text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full shrink-0">
                      Verified AI Media
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs min-w-0 w-full">
                    {metadata.c2pa.softwareAgentName && (
                    <div className="flex justify-between py-1 border-b border-amber-100 min-w-0 gap-2">
                      <span className="text-stone-600 shrink-0">Software Agent Name:</span>
                      <span className="font-bold text-stone-900 font-mono truncate">{metadata.c2pa.softwareAgentName}</span>
                    </div>
                    )}
                    {metadata.c2pa.softwareAgentVersion && (
                    <div className="flex justify-between py-1 border-b border-amber-100 min-w-0 gap-2">
                      <span className="text-stone-600 shrink-0">Software Agent Version:</span>
                      <span className="font-bold text-amber-900 font-mono truncate">{metadata.c2pa.softwareAgentVersion}</span>
                    </div>
                    )}
                    {metadata.c2pa.claimGeneratorName && (
                    <div className="flex justify-between py-1 border-b border-amber-100 min-w-0 gap-2">
                      <span className="text-stone-600 shrink-0">Claim Generator:</span>
                      <span className="font-semibold text-stone-900 truncate">{metadata.c2pa.claimGeneratorName}</span>
                    </div>
                    )}
                    {(metadata.c2pa.specVersion || metadata.c2pa.claimGeneratorOrg) && (
                    <div className="flex justify-between py-1 border-b border-amber-100 min-w-0 gap-2">
                      <span className="text-stone-600 shrink-0">Spec Version & Org:</span>
                      <span className="font-mono text-stone-800 truncate">{metadata.c2pa.specVersion || '—'} {metadata.c2pa.claimGeneratorOrg ? `(${metadata.c2pa.claimGeneratorOrg})` : ''}</span>
                    </div>
                    )}
                    {(metadata.c2pa.jumdLabel || metadata.c2pa.jumdType) && (
                    <div className="flex justify-between py-1 border-b border-amber-100 min-w-0 gap-2">
                      <span className="text-stone-600 shrink-0">JUMD Type & Label:</span>
                      <span className="font-mono text-stone-800 text-[11px] truncate">{metadata.c2pa.jumdLabel || '—'} {metadata.c2pa.jumdType ? `(${metadata.c2pa.jumdType})` : ''}</span>
                    </div>
                    )}
                    {metadata.c2pa.algorithm && (
                    <div className="flex justify-between py-1 border-b border-amber-100 min-w-0 gap-2">
                      <span className="text-stone-600 shrink-0">Hash Algorithm:</span>
                      <span className="font-mono text-stone-800">{metadata.c2pa.algorithm}</span>
                    </div>
                    )}
                    {metadata.c2pa.digitalSourceType && (
                    <div className="md:col-span-2 flex flex-col py-1.5 border-b border-amber-100 min-w-0">
                      <span className="text-stone-600 font-medium">Digital Source Type:</span>
                      <span className="font-mono text-amber-900 text-[11px] break-all select-all mt-0.5" title={metadata.c2pa.digitalSourceType}>
                        {metadata.c2pa.digitalSourceType}
                      </span>
                    </div>
                    )}
                    {metadata.c2pa.instanceId && (
                      <div className="md:col-span-2 flex flex-col py-1.5 border-b border-amber-100 min-w-0">
                        <span className="text-stone-600 font-medium">Instance ID:</span>
                        <span className="font-mono text-stone-700 text-[11px] break-all select-all mt-0.5" title={metadata.c2pa.instanceId}>
                          {metadata.c2pa.instanceId}
                        </span>
                      </div>
                    )}
                    {metadata.c2pa.signatureUri && (
                      <div className="md:col-span-2 flex flex-col py-1.5 min-w-0">
                        <span className="text-stone-600 font-medium">Signature Manifest:</span>
                        <span className="font-mono text-stone-700 text-[11px] break-all select-all mt-0.5" title={metadata.c2pa.signatureUri}>
                          {metadata.c2pa.signatureUri}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-stone-600 font-medium min-w-0 w-full">
                  <span className="flex items-center gap-2 truncate">
                    <Cpu className="w-4 h-4 text-stone-500 shrink-0" />
                    <span className="truncate">No C2PA AI Content Credentials manifest detected in this image.</span>
                  </span>
                  <span className="text-stone-500 text-[11px] shrink-0 ml-2">Human / Camera</span>
                </div>
              )}

              {/* 3. FILE PROPERTIES & ENCODING TABLES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs min-w-0 w-full">
                {/* File Properties Card */}
                <div className="bg-[#FAF8F5] p-4 sm:p-4.5 rounded-xl border border-stone-200/80 space-y-2 min-w-0 w-full overflow-hidden">
                  <span className="font-extrabold text-stone-900 block pb-1 border-b border-stone-200">
                    File Properties
                  </span>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">File Name:</span>
                    <span className="font-semibold text-stone-900 truncate max-w-[180px] text-right" title={metadata.fileName}>{metadata.fileName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">File Size:</span>
                    <span className="font-semibold text-stone-900 text-right">{(metadata.fileSize / 1024).toFixed(0)} kB</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">File Type:</span>
                    <span className="font-semibold text-stone-900 text-right">{metadata.fileType} (.{metadata.fileTypeExtension})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">MIME Type:</span>
                    <span className="font-mono text-stone-800 text-right truncate">{metadata.mimeType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">JFIF Version:</span>
                    <span className="font-mono text-stone-800 text-right">{metadata.encoding.jfifVersion || '—'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">Resolution Unit:</span>
                    <span className="font-semibold text-stone-900 text-right">{metadata.encoding.resolutionUnit || '—'}</span>
                  </div>
                  <div className="flex justify-between py-1 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">X / Y Resolution:</span>
                    <span className="font-mono text-stone-800 text-right">{metadata.encoding.xResolution ?? '—'} / {metadata.encoding.yResolution ?? '—'}</span>
                  </div>
                </div>

                {/* Encoding & Compression Card */}
                <div className="bg-[#FAF8F5] p-4 sm:p-4.5 rounded-xl border border-stone-200/80 space-y-2 min-w-0 w-full overflow-hidden">
                  <span className="font-extrabold text-stone-900 block pb-1 border-b border-stone-200">
                    Encoding &amp; Compression (SOF)
                  </span>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">Dimensions:</span>
                    <span className="font-semibold text-stone-900 text-right">{metadata.width} × {metadata.height} px</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">Megapixels &amp; Ratio:</span>
                    <span className="font-semibold text-stone-900 text-right">{metadata.megapixels} MP ({metadata.aspectRatio})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">Encoding Process:</span>
                    <span className="font-semibold text-stone-900 truncate max-w-[160px] text-right" title={metadata.encoding.encodingProcess}>
                      {metadata.encoding.encodingProcess || '—'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">Bits Per Sample:</span>
                    <span className="font-semibold text-stone-900 text-right">{metadata.encoding.bitsPerSample ? `${metadata.encoding.bitsPerSample} bits` : '—'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">Color Components:</span>
                    <span className="font-semibold text-stone-900 text-right">{metadata.encoding.colorComponents ?? '—'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/50 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">YCbCr Sub Sampling:</span>
                    <span className="font-mono text-amber-900 font-bold text-right">{metadata.encoding.yCbCrSubSampling || '—'}</span>
                  </div>
                  <div className="flex justify-between py-1 min-w-0 gap-2">
                    <span className="text-stone-500 shrink-0">Camera Model:</span>
                    <span className="font-semibold text-stone-900 truncate max-w-[160px] text-right">{metadata.make ? `${metadata.make} ${metadata.model || ''}` : 'None'}</span>
                  </div>
                </div>
              </div>

              {/* CAMERA SETTINGS & EXIF */}
              {(metadata.make || metadata.exposureTime || metadata.focalLength || metadata.iso || metadata.fNumber) && (
                <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-xl border border-stone-200/80 space-y-3 min-w-0 w-full overflow-hidden">
                  <span className="font-extrabold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-200">
                    <Camera className="w-4 h-4 text-stone-600 shrink-0" />
                    <span>Camera Hardware & Exposure (EXIF)</span>
                  </span>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-stone-500 block">Make & Model</span>
                      <span className="font-semibold text-stone-900 block truncate">{metadata.make || 'Unknown'} {metadata.model || ''}</span>
                    </div>
                    {metadata.lensModel && (
                    <div className="space-y-1">
                      <span className="text-stone-500 block">Lens</span>
                      <span className="font-medium text-stone-900 block truncate" title={metadata.lensModel}>{metadata.lensModel}</span>
                    </div>
                    )}
                    {metadata.focalLength && (
                    <div className="space-y-1">
                      <span className="text-stone-500 block">Focal Length</span>
                      <span className="font-mono text-stone-800 block">{metadata.focalLength} mm {metadata.focalLengthIn35mm ? `(${metadata.focalLengthIn35mm}mm eq)` : ''}</span>
                    </div>
                    )}
                    {metadata.fNumber && (
                    <div className="space-y-1">
                      <span className="text-stone-500 block">Aperture</span>
                      <span className="font-mono text-stone-800 block flex items-center gap-1"><Aperture className="w-3 h-3 text-stone-400" /> f/{metadata.fNumber}</span>
                    </div>
                    )}
                    {metadata.exposureTime && (
                    <div className="space-y-1">
                      <span className="text-stone-500 block">Shutter Speed</span>
                      <span className="font-mono text-stone-800 block flex items-center gap-1"><Timer className="w-3 h-3 text-stone-400" /> {metadata.exposureTime >= 1 ? metadata.exposureTime : `1/${Math.round(1 / metadata.exposureTime)}`} s</span>
                    </div>
                    )}
                    {metadata.iso && (
                    <div className="space-y-1">
                      <span className="text-stone-500 block">ISO</span>
                      <span className="font-mono text-stone-800 block flex items-center gap-1"><Sun className="w-3 h-3 text-stone-400" /> {metadata.iso}</span>
                    </div>
                    )}
                    {metadata.dateTime && (
                    <div className="space-y-1">
                      <span className="text-stone-500 block">Date & Time</span>
                      <span className="font-mono text-stone-800 block truncate">{metadata.dateTime}</span>
                    </div>
                    )}
                    {metadata.software && (
                    <div className="space-y-1">
                      <span className="text-stone-500 block">Software</span>
                      <span className="font-medium text-stone-900 block truncate">{metadata.software}</span>
                    </div>
                    )}
                  </div>
                </div>
              )}

              {/* GPS & LOCATION */}
              {metadata.hasGps && metadata.gpsCoordinates && (
                <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-4 sm:p-5 space-y-3 min-w-0 w-full overflow-hidden">
                  <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                    <span className="font-extrabold text-rose-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>GPS Location Data Found</span>
                    </span>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${metadata.gpsLatitude},${metadata.gpsLongitude}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold bg-white text-rose-700 hover:text-rose-900 border border-rose-200 px-2.5 py-1 rounded-md shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View on Map
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-rose-700/80 block font-medium">Coordinates</span>
                      <span className="font-mono text-rose-900 block truncate font-bold">{metadata.gpsCoordinates}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-rose-700/80 block font-medium">Latitude</span>
                      <span className="font-mono text-rose-900 block">{metadata.gpsLatitude}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-rose-700/80 block font-medium">Longitude</span>
                      <span className="font-mono text-rose-900 block">{metadata.gpsLongitude}</span>
                    </div>
                    {metadata.gpsAltitude != null && (
                    <div className="space-y-1">
                      <span className="text-rose-700/80 block font-medium">Altitude</span>
                      <span className="font-mono text-rose-900 block flex items-center gap-1">
                        <Mountain className="w-3 h-3 text-rose-500" />
                        {Math.abs(metadata.gpsAltitude).toFixed(1)} meters {metadata.gpsAltitude < 0 ? 'below' : 'above'} sea level
                      </span>
                    </div>
                    )}
                  </div>
                </div>
              )}

              {/* ALL RAW EXIF TAGS (Expandable) */}
              {metadata.allExifrTags && Object.keys(metadata.allExifrTags).length > 0 && (
                <details className="group bg-white border border-stone-200/80 rounded-xl overflow-hidden shadow-xs cursor-pointer">
                  <summary className="font-extrabold text-xs text-stone-800 flex items-center justify-between p-4 bg-stone-50 group-hover:bg-stone-100/50 transition-colors">
                    <span className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-stone-500" />
                      View All Raw EXIF Tags ({Object.keys(metadata.allExifrTags).length})
                    </span>
                    <ChevronDown className="w-4 h-4 text-stone-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-4 border-t border-stone-200 bg-stone-950 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-[400px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(metadata.allExifrTags, null, 2)}</pre>
                  </div>
                </details>
              )}

              {/* 4. RAW HEADER HEX INSPECTION PREVIEW */}
              <div className="space-y-2 pt-1 min-w-0 w-full overflow-hidden">
                <div className="flex items-center justify-between min-w-0">
                  <span className="font-extrabold text-xs text-stone-800 flex items-center gap-1.5 truncate">
                    <Binary className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                    <span>Raw Header Hex Dump (First 64 Bytes)</span>
                  </span>
                  <button
                    onClick={copyHexToClipboard}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-900 shrink-0 ml-2"
                  >
                    {copiedHex ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHex ? 'Copied Hex' : 'Copy Hex'}</span>
                  </button>
                </div>

                <div className="bg-stone-950 text-amber-300 font-mono text-[10px] sm:text-[11px] p-3 sm:p-4 rounded-xl overflow-x-auto w-full max-w-full border border-stone-800">
                  <div className="min-w-[460px] space-y-1">
                    {metadata.rawHeaderHex.map((hex, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4 py-0.5">
                        <span className="text-amber-400 font-semibold tracking-wider">{hex}</span>
                        <span className="text-stone-500 select-none border-l border-stone-800 pl-3">| {metadata.rawHeaderAscii[idx]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Helpful Educational Footer */}
      <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-xl p-4 text-xs text-stone-600 space-y-1 leading-relaxed font-medium flex items-start gap-2.5 min-w-0 w-full">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="min-w-0">
          <strong className="font-bold text-stone-800">Why inspect metadata? </strong>
          Modern cameras and smartphones store hidden GPS coordinates and serial numbers, while AI generators like OpenAI DALL-E/ChatGPT embed C2PA manifests and IPTC digital source tags. This tool lets you inspect all hidden properties, export JSON reports, or strip all tags with 1-click browser sanitization.
        </div>
      </div>
    </div>
  );
}
