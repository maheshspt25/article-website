import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 900,
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-0.5px',
          border: '1px solid rgba(251, 191, 36, 0.4)',
        }}
      >
        IM
      </div>
    ),
    {
      ...size,
    }
  );
}
