import { useState, useEffect, useRef } from 'react';
import { autoCorrelate, getNoteFromFrequency, getCents, NOTE_STRINGS } from '../utils/pitchDetection';

export interface PitchData {
  noteName: string;
  frequency: number;
  cents: number;
  rms: number;
}

export function useAudioPitch() {
  const [pitchData, setPitchData] = useState<PitchData | null>(null);
  const [currentRms, setCurrentRms] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const requestRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Tham số làm mượt
  const smoothedFreq = useRef<number>(0);
  const smoothedCents = useRef<number>(0);
  const alpha = 0.15; // Hệ số làm mượt (0.1 - 0.3 là tốt nhất cho tuner)

  const startTuner = async () => {
    if (!window.isSecureContext && window.location.hostname !== 'localhost') {
      setError('Cảnh báo: Microphone chỉ hoạt động trên HTTPS.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      });
      streamRef.current = stream;
      
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (audioContext.current.state === 'suspended') {
        await audioContext.current.resume();
      }

      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = 2048;

      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(analyser.current);

      setIsActive(true);
      setError(null);
      updatePitch();
    } catch (err: any) {
      setError(`Lỗi: ${err.message}`);
      console.error(err);
    }
  };

  const stopTuner = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    if (audioContext.current) audioContext.current.suspend();
    setIsActive(false);
    setPitchData(null);
    setCurrentRms(0);
    smoothedFreq.current = 0;
    smoothedCents.current = 0;
  };

  const updatePitch = () => {
    if (!analyser.current || !audioContext.current || audioContext.current.state === 'suspended') return;

    const buffer = new Float32Array(analyser.current.fftSize);
    analyser.current.getFloatTimeDomainData(buffer);

    const { frequency, rms } = autoCorrelate(buffer, audioContext.current.sampleRate);
    
    // Làm mượt cường độ âm (RMS)
    setCurrentRms(prev => prev * 0.7 + rms * 0.3);

    if (frequency !== -1) {
      // Áp dụng bộ lọc làm mượt cho tần số
      if (smoothedFreq.current === 0) {
        smoothedFreq.current = frequency;
      } else {
        smoothedFreq.current = smoothedFreq.current * (1 - alpha) + frequency * alpha;
      }

      const note = getNoteFromFrequency(smoothedFreq.current);
      const noteName = NOTE_STRINGS[note % 12];
      const cents = getCents(smoothedFreq.current, note);

      // Làm mượt cents để kim không bị rung
      smoothedCents.current = smoothedCents.current * (1 - alpha) + cents * alpha;

      setPitchData({
        noteName,
        frequency: smoothedFreq.current,
        cents: Math.round(smoothedCents.current),
        rms
      });
    }

    requestRef.current = requestAnimationFrame(updatePitch);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioContext.current) audioContext.current.close();
    };
  }, []);

  return { pitchData, currentRms, isActive, error, startTuner, stopTuner };
}
