import { useState, FormEvent } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { signIn, validateEmail } from "../../lib";
import { useAuthStore } from "../../stores";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { toast } from "sonner";

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
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden transition-colors duration-300">
            {/* Classy Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.08]" />

            <Card className="w-full max-w-[400px] relative backdrop-blur-xl bg-card/50 border-border/50 shadow-2xl transition-all duration-300">
                <CardHeader className="space-y-2 text-center pb-8 pt-8">
                    <div className="mx-auto mb-6 h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25 ring-1 ring-white/20">
                        <svg className="h-6 w-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Welcome back</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (error) setError("");
                                }}
                                disabled={loading || googleLoading}
                                autoComplete="email"
                                autoFocus
                                className="h-11 bg-background/50 border-input hover:border-ring/50 focus:border-ring focus:ring-1 focus:ring-ring transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                                <Link to="/auth/login" className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (error) setError("");
                                }}
                                disabled={loading || googleLoading}
                                autoComplete="current-password"
                                className="h-11 bg-background/50 border-input hover:border-ring/50 focus:border-ring focus:ring-1 focus:ring-ring transition-all duration-200"
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in slide-in-from-top-2 fade-in">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                            disabled={loading || googleLoading}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </div>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full border-border/60" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground font-medium backdrop-blur-xl">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 bg-background/50 border-input hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                        onClick={handleGoogleLogin}
                        disabled={loading || googleLoading}
                    >
                        {googleLoading ? (
                            <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        ) : (
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        )}
                        Google
                    </Button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Don't have an account?{" "}
                        <Link to="/auth/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
