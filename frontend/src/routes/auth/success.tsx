import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthStore, useUser, useIsLoading } from "../../stores";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { toast } from "sonner";

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
        toast.success("Signed out successfully");
        navigate({ to: "/auth/login" });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-muted-foreground text-sm font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden transition-colors duration-300">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.08]" />

            <Card className="w-full max-w-[400px] relative backdrop-blur-xl bg-card/50 border-border/50 shadow-2xl transition-all duration-300">
                <CardHeader className="space-y-2 text-center pb-6 pt-8">
                    <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 ring-4 ring-background animate-[scaleIn_0.5s_ease-out]">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                        Welcome, {user.name?.split(' ')[0] || "there"}!
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                        You're successfully signed in to LifeOps
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pb-8">
                    <div className="rounded-xl bg-background/50 border border-border/50 p-4 space-y-3 shadow-inner">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-md ring-2 ring-background">
                                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate text-sm">{user.name || "User"}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                            {user.emailVerified && (
                                <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    VERIFIED
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full border-border/60" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="h-10 bg-background/50 hover:bg-accent hover:text-accent-foreground border-input transition-all duration-200"
                            onClick={() => navigate({ to: "/" })}
                        >
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                        </Button>
                        <Button
                            variant="outline"
                            className="h-10 bg-background/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 border-input text-muted-foreground transition-all duration-200"
                            onClick={handleSignOut}
                        >
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign out
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
