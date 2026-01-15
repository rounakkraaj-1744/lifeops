export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): string | null => {
    if (!password.trim()) return "Please enter a password";
    if (password.length < 8) return "Password must be at least 8 characters";
    return null;
};

export const validateName = (name: string): string | null => {
    if (!name.trim()) return "Please enter your name";
    if (name.length < 2) return "Name must be at least 2 characters";
    return null;
};
