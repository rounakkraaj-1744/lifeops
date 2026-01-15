import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthStore, useUser, useIsLoading } from "../../stores";
import "../../components/auth/auth.css";

export const Route = createFileRoute("/auth/success")({
    component: SuccessPage,
});

function SuccessPage() {
    const navigate = useNavigate();
    const user = useUser();
    const isLoading = useIsLoading();
    const { signOut, fetchSession } = useAuthStore();

    useEffect(() => {
        fetchSession();
    }, [fetchSession]);

    useEffect(() => {
        if (!isLoading && !user) {
            navigate({ to: "/auth/login" });
        }
    }, [user, isLoading, navigate]);

    const handleSignOut = async () => {
        await signOut();
        navigate({ to: "/auth/login" });
    };

    if (isLoading) {
        return (
            <div className="success-container">
                <div className="success-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p className="success-message">Loading...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="success-container">
            <div className="success-icon">
                <svg viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="38" />
                    <path d="M24 40L35 51L56 29" />
                </svg>
            </div>

            <h1 className="success-title">Welcome, {user.name || user.email}!</h1>
            <p className="success-message">You're successfully signed in.</p>

            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                    Email: {user.email}
                </p>
            </div>

            <button
                onClick={handleSignOut}
                style={{
                    marginTop: "2rem",
                    padding: "0.75rem 2rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--color-border)",
                    background: "transparent",
                    color: "var(--color-text-primary)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                }}
            >
                Sign Out
            </button>

            <span className="success-brand">LifeOps</span>
        </div>
    );
}
