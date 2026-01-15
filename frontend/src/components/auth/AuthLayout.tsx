import { ReactNode } from 'react'
import './auth.css'

interface AuthLayoutProps {
    children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="auth-layout">
            <div className="auth-container">
                <div className="auth-card">
                    {children}
                </div>
            </div>
            <footer className="auth-footer">
                <p className="auth-footer-text">
                    © {new Date().getFullYear()} LifeOps. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

export function AuthHeader() {
    return (
        <div className="auth-header">
            <div className="auth-logo">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="40" height="40" rx="10" fill="var(--color-primary-light)" />
                    <path
                        d="M12 20L18 26L28 14"
                        stroke="var(--color-primary)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <h1 className="auth-brand">LifeOps</h1>
        </div>
    )
}
