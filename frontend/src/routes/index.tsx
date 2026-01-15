import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Welcome to LifeOps</h1>
      <p style={{ marginBottom: '2rem', color: '#6B7280' }}>
        Your personal life management companion
      </p>
      <Link
        to="/auth/login"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '52px',
          padding: '0 2rem',
          backgroundColor: '#4F46E5',
          color: 'white',
          borderRadius: '0.75rem',
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'background-color 0.15s ease'
        }}
      >
        Get Started
      </Link>
    </main>
  )
}
