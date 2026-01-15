export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly code: string;
    public readonly details?: unknown;

    constructor(
        message: string,
        statusCode: number = 500,
        code: string = "INTERNAL_ERROR",
        details?: unknown
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.code = code;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = "Validation failed", details?: unknown) {
        super(message, 400, "VALIDATION_ERROR", details);
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string = "Authentication required") {
        super(message, 401, "AUTHENTICATION_ERROR");
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = "Access denied") {
        super(message, 403, "FORBIDDEN_ERROR");
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string = "Resource") {
        super(`${resource} not found`, 404, "NOT_FOUND_ERROR");
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Resource already exists") {
        super(message, 409, "CONFLICT_ERROR");
    }
}

export class RateLimitError extends AppError {
    constructor(message: string = "Too many requests, please try again later") {
        super(message, 429, "RATE_LIMIT_ERROR");
    }
}
