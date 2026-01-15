import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface UIStore {
    toasts: Toast[];
    isGlobalLoading: boolean;

    addToast: (type: ToastType, message: string, duration?: number) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
    setGlobalLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
    toasts: [],
    isGlobalLoading: false,

    addToast: (type, message, duration = 5000) => {
        const id = crypto.randomUUID();
        const toast: Toast = { id, type, message, duration };

        set((state) => ({ toasts: [...state.toasts, toast] }));

        if (duration > 0) {
            setTimeout(() => {
                get().removeToast(id);
            }, duration);
        }
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },

    clearToasts: () => set({ toasts: [] }),

    setGlobalLoading: (isGlobalLoading) => set({ isGlobalLoading }),
}));

export const toast = {
    success: (message: string) => useUIStore.getState().addToast("success", message),
    error: (message: string) => useUIStore.getState().addToast("error", message),
    info: (message: string) => useUIStore.getState().addToast("info", message),
    warning: (message: string) => useUIStore.getState().addToast("warning", message),
};
