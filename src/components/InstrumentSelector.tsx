import React from 'react';
import { Guitar, Music } from 'lucide-react';

export type Instrument = 'guitar' | 'ukulele';

interface Props {
  selected: Instrument;
  onChange: (instrument: Instrument) => void;
}

const InstrumentSelector: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
      <button
        onClick={() => onChange('guitar')}
        className={`secondary-btn`}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: selected === 'guitar' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
          borderColor: selected === 'guitar' ? 'var(--accent-primary)' : 'var(--glass-border)',
        }}
      >
        <Guitar size={18} />
        Guitar
      </button>
      <button
        onClick={() => onChange('ukulele')}
        className={`secondary-btn`}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: selected === 'ukulele' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
          borderColor: selected === 'ukulele' ? 'var(--accent-secondary)' : 'var(--glass-border)',
        }}
      >
        <Music size={18} />
        Ukulele
      </button>
    </div>
  );
};

export default InstrumentSelector;
