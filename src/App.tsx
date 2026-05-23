import { useState } from 'react';
import { useAudioPitch } from './hooks/useAudioPitch';
import InstrumentSelector from './components/InstrumentSelector';
import type { Instrument } from './components/InstrumentSelector';
import TunerDisplay from './components/TunerDisplay';
import { Power, AlertCircle, Settings } from 'lucide-react';

function App() {
  const [instrument, setInstrument] = useState<Instrument>('guitar');
  const { pitchData, currentRms, isActive, error, startTuner, stopTuner } = useAudioPitch();

  const toggleTuner = () => {
    if (isActive) {
      stopTuner();
    } else {
      startTuner();
    }
  };

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Settings size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          background: isActive ? 'var(--success)' : 'var(--danger)',
          boxShadow: isActive ? '0 0 10px var(--success)' : 'none'
        }} />
      </div>

      <h1>Antigravity Tuner</h1>
      <p className="subtitle">Chỉnh âm chuẩn xác, mượt mà</p>

      <InstrumentSelector selected={instrument} onChange={setInstrument} />

      <TunerDisplay pitchData={pitchData} currentRms={currentRms} isActive={isActive} />

      {error && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: 'var(--danger)', 
          background: 'rgba(239, 68, 68, 0.1)',
          padding: '12px',
          borderRadius: '12px',
          marginTop: '20px',
          fontSize: '0.9rem'
        }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <button 
        onClick={toggleTuner}
        className="primary-btn"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '10px',
          background: isActive ? 'rgba(239, 68, 68, 0.2)' : undefined,
          border: isActive ? '1px solid var(--danger)' : undefined,
          color: isActive ? 'var(--danger)' : undefined,
          boxShadow: isActive ? 'none' : undefined
        }}
      >
        <Power size={20} />
        {isActive ? 'Dừng lại' : 'Bắt đầu'}
      </button>

      <div style={{ 
        marginTop: '2rem', 
        textAlign: 'center', 
        color: 'var(--text-muted)', 
        fontSize: '0.8rem',
        opacity: 0.6
      }}>
        Hỗ trợ Guitar & Ukulele • Offline Ready
      </div>
    </div>
  );
}

export default App;
