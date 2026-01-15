import { useState, FormEvent } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AuthLayout, AuthHeader, Button, GoogleButton, Input } from "../../components/auth";
import { signIn, validateEmail } from "../../lib";
import { useAuthStore, toast } from "../../stores";

export const Route = createFileRoute("/auth/login")({
    component: LoginPage,
});

function LoginPage() {
    const navigate = useNavigate();
    const { fetchSession } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password");
            return;
        }

        setLoading(true);

        try {
            const result = await signIn.email({ email, password });

            if (result.error) {
                setError(result.error.message || "Authentication failed");
                return;
            }

            await fetchSession();
            toast.success("Welcome back!");
            navigate({ to: "/auth/success" });
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/auth/success",
            });
        } catch {
            setError("Google sign-in failed. Please try again.");
            setGoogleLoading(false);
        }
    };

    return (
        <AuthLayout>
            <AuthHeader />
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-subtitle">Enter your email and password to continue</p>

            <form className="auth-form" onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                    }}
                    disabled={loading || googleLoading}
                    autoComplete="email"
                    autoFocus
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError("");
                    }}
                    error={error}
                    disabled={loading || googleLoading}
                    autoComplete="current-password"
                />
                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} disabled={googleLoading}>
                    Sign In
                </Button>
            </form>

            <div className="auth-divider">
                <span className="auth-divider-text">or</span>
            </div>

            <GoogleButton onClick={handleGoogleLogin} loading={googleLoading} disabled={loading} />

            <p className="auth-privacy">
                Don't have an account? <Link to="/auth/signup" className="auth-link">Sign up</Link>
            </p>
        </AuthLayout>
    );
}
