import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Page not found</h1>
      <p style={{ color: '#5A6A3F', marginBottom: '1rem' }}>This page doesn&apos;t exist.</p>
      <Link href="/" style={{ color: '#5A6A3F', fontWeight: 600 }}>
        Back to home
      </Link>
    </div>
  );
}
