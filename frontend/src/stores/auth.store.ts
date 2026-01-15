import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, Session } from "../types/auth";
import { authClient } from "../lib/auth-client";

interface AuthStore {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    error: string | null;

    setUser: (user: User | null) => void;
    setSession: (session: Session | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    fetchSession: () => Promise<void>;
    signOut: () => Promise<void>;
    reset: () => void;
}

const initialState = {
    user: null,
    session: null,
    isLoading: true,
    error: null,
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            setUser: (user) => set({ user }),
            setSession: (session) => set({ session }),
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),

            fetchSession: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { data } = await authClient.getSession();
                    if (data) {
                        set({
                            user: data.user as User,
                            session: data.session as Session,
                            isLoading: false,
                        });
                    } else {
                        set({ user: null, session: null, isLoading: false });
                    }
                } catch {
                    set({ user: null, session: null, isLoading: false });
                }
            },

            signOut: async () => {
                set({ isLoading: true });
                try {
                    await authClient.signOut();
                    set({ ...initialState, isLoading: false });
                } catch {
                    set({ isLoading: false, error: "Failed to sign out" });
                }
            },

            reset: () => set(initialState),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user, session: state.session }),
        }
    )
);

export const useUser = () => useAuthStore((state) => state.user);
export const useSession = () => useAuthStore((state) => state.session);
export const useIsAuthenticated = () => useAuthStore((state) => !!state.user);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
