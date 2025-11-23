'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            maxWidth: '500px',
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
              Có lỗi xảy ra
            </h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Thử lại
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
