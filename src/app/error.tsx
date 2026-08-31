'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Something went wrong</h1>
      <p style={{ color: '#5A6A3F', marginBottom: '1rem' }}>{error.message}</p>
      <button type="button" onClick={reset} className="error-page-btn">
        Try again
      </button>
    </div>
  );
}
