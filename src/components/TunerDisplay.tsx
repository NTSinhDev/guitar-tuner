import React from 'react';
import type { PitchData } from '../hooks/useAudioPitch';

interface Props {
  pitchData: PitchData | null;
  currentRms: number;
  isActive: boolean;
}

const TunerDisplay: React.FC<Props> = ({ pitchData, currentRms, isActive }) => {
  const isInTune = pitchData && Math.abs(pitchData.cents) < 5;
  
  // Calculate needle rotation: -50 to 50 cents maps to -90 to 90 degrees
  const rotation = pitchData ? Math.max(-90, Math.min(90, (pitchData.cents / 50) * 90)) : 0;

  // Calculate intensity percentage (max approx 0.1 for microphone)
  const intensity = Math.min(100, (currentRms / 0.1) * 100);

  return (
    <div style={{ textAlign: 'center', position: 'relative', height: '320px' }}>
      {/* Gauge Background */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '150px',
        border: '2px solid var(--glass-border)',
        borderBottom: 'none',
        borderRadius: '150px 150px 0 0',
        top: '20px',
        overflow: 'hidden'
      }}>
        {/* Intensity Bar Background */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.05)'
        }}>
           <div style={{
            width: `${intensity}%`,
            height: '100%',
            background: 'var(--accent-primary)',
            transition: 'width 0.1s ease-out',
            boxShadow: '0 0 10px var(--accent-primary)'
          }} />
        </div>
      </div>

      {/* Ticks & Numbers */}
      {[...Array(11)].map((_, i) => {
        const centsValue = -50 + i * 10;
        const angle = -90 + i * 18;
        return (
          <React.Fragment key={i}>
            {/* Tick */}
            <div
              style={{
                position: 'absolute',
                width: '2px',
                height: i % 5 === 0 ? '15px' : '8px',
                background: i === 5 ? 'var(--success)' : 'var(--text-muted)',
                left: '50%',
                top: '20px',
                transformOrigin: '0 130px',
                transform: `translateX(-50%) rotate(${angle}deg)`
              }}
            />
            {/* Number */}
            <div
              style={{
                position: 'absolute',
                fontSize: '0.7rem',
                color: i === 5 ? 'var(--success)' : 'var(--text-muted)',
                left: '50%',
                top: '8px',
                transformOrigin: '0 145px',
                transform: `translateX(-50%) rotate(${angle}deg)`
              }}
            >
              {centsValue}
            </div>
          </React.Fragment>
        );
      })}

      {/* Needle */}
      {isActive && (
        <div style={{
          position: 'absolute',
          width: '3px',
          height: '110px',
          background: isInTune ? 'var(--success)' : 'var(--accent-primary)',
          left: '50%',
          top: '40px',
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          transition: 'transform 0.1s ease-out, background 0.3s ease',
          zIndex: 2,
          boxShadow: isInTune ? '0 0 15px var(--success)' : 'none'
        }}>
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            width: '20px',
            height: '20px',
            background: 'var(--bg-color)',
            border: `3px solid ${isInTune ? 'var(--success)' : 'var(--accent-primary)'}`,
            borderRadius: '50%',
            transform: 'translateX(-50%)'
          }} />
        </div>
      )}

      {/* Intensity Numeric Display */}
      <div style={{ 
        position: 'absolute', 
        top: '140px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        letterSpacing: '1px'
      }}>
        INTENSITY: {intensity.toFixed(1)}%
      </div>

      {/* Pitch Info */}
      <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
        {!isActive ? (
          <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            Nhấn Bắt đầu để bắt đầu chỉnh âm
          </div>
        ) : !pitchData ? (
          <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            {/* Removed "Đang lắng nghe..." as requested */}
            &nbsp;
          </div>
        ) : (
          <div>
            <div style={{ 
              fontSize: '5rem', 
              fontWeight: 800, 
              lineHeight: 1,
              color: isInTune ? 'var(--success)' : 'var(--text-main)',
              transition: 'color 0.3s ease'
            }}>
              {pitchData.noteName}
            </div>
            <div style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-muted)',
              marginTop: '10px'
            }}>
              {pitchData.frequency.toFixed(1)} Hz
              <span style={{ 
                marginLeft: '10px',
                color: isInTune ? 'var(--success)' : Math.abs(pitchData.cents) > 20 ? 'var(--danger)' : 'var(--warning)'
              }}>
                {pitchData.cents > 0 ? '+' : ''}{pitchData.cents} cents
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TunerDisplay;
