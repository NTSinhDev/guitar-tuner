/**
 * Tự tương quan (Auto-correlation) là một phương pháp toán học để tìm các mẫu lặp lại trong một tín hiệu.
 * Trong xử lý âm thanh, nó được sử dụng để ước tính tần số cơ bản (pitch) của một tín hiệu âm thanh.
 */

export interface CorrelationResult {
  frequency: number;
  rms: number;
}

export function autoCorrelate(buffer: Float32Array, sampleRate: number): CorrelationResult {
  let size = buffer.length;
  let rms = 0;

  for (let i = 0; i < size; i++) {
    const val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / size);
  
  if (rms < 0.005) { // Slightly lower threshold for silence
    return { frequency: -1, rms };
  }

  let r1 = 0;
  let r2 = size - 1;
  const thres = 0.2;

  // Trim the signal
  for (let i = 0; i < size / 2; i++) {
    if (Math.abs(buffer[i]) < thres) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < size / 2; i++) {
    if (Math.abs(buffer[size - i]) < thres) {
      r2 = size - i;
      break;
    }
  }

  const trimmedBuffer = buffer.slice(r1, r2);
  size = trimmedBuffer.length;
  if (size === 0) return { frequency: -1, rms };

  const c = new Float32Array(size).fill(0);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - i; j++) {
      c[i] = c[i] + trimmedBuffer[j] * trimmedBuffer[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;
  let maxval = -1;
  let maxpos = -1;
  for (let i = d; i < size; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;

  // Interpolation
  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  return { frequency: sampleRate / T0, rms };
}

export const NOTE_STRINGS = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

export function getNoteFromFrequency(frequency: number) {
  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
}

export function getFrequencyFromNote(note: number) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

export function getCents(frequency: number, note: number) {
  return Math.floor(
    (1200 * Math.log(frequency / getFrequencyFromNote(note))) / Math.log(2)
  );
}
