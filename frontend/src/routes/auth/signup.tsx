import { useState, FormEvent } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { AuthLayout, AuthHeader, Button, GoogleButton, Input } from '../../components/auth'
import { signUp, signIn } from '../../lib/auth-client'

export const Route = createFileRoute('/auth/signup')({
    component: SignupPage,
})

function SignupPage() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')

        if (!name.trim()) {
            setError('Please enter your name')
            return
        }

        if (!email.trim()) {
            setError('Please enter your email address')
            return
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            return
        }

        if (!password.trim()) {
            setError('Please enter a password')
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }

        setLoading(true)

        try {
            const result = await signUp.email({
                email,
                password,
                name,
            })

            if (result.error) {
                setError(result.error.message || 'Signup failed')
                return
            }

            navigate({ to: '/auth/success' })
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setGoogleLoading(true)

        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/auth/success",
            })
        } catch (err) {
            setError('Google sign-up failed. Please try again.')
            setGoogleLoading(false)
        }
    }

    return (
        <AuthLayout>
            <AuthHeader />

            <h2 className="auth-title">Create your account</h2>
            <p className="auth-subtitle">Get started with LifeOps</p>

            <form className="auth-form" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        if (error) setError('')
                    }}
                    disabled={loading || googleLoading}
                    autoComplete="name"
                    autoFocus
                />

                <Input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError('')
                    }}
                    disabled={loading || googleLoading}
                    autoComplete="email"
                />

                <Input
                    type="password"
                    name="password"
                    placeholder="Password (min 8 characters)"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        if (error) setError('')
                    }}
                    error={error}
                    disabled={loading || googleLoading}
                    autoComplete="new-password"
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                    disabled={googleLoading}
                >
                    Create Account
                </Button>
            </form>

            <div className="auth-divider">
                <span className="auth-divider-text">or</span>
            </div>

            <GoogleButton
                onClick={handleGoogleLogin}
                loading={googleLoading}
                disabled={loading}
            />

            <p className="auth-privacy">
                Already have an account? <Link to="/auth/login" className="auth-link">Sign in</Link>
            </p>
        </AuthLayout>
    )
}
