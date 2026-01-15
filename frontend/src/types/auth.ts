export interface User {
    id: string;
    email: string;
    name: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Session {
    id: string;
    userId: string;
    expiresAt: Date;
}

export interface AuthState {
    user: User | null;
    session: Session | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
