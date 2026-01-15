import type { Response } from "express";

interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
    meta?: {
        timestamp: string;
        requestId?: string;
    };
}

interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export function success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = 200
): Response {
    const response: ApiResponse<T> = {
        success: true,
        message,
        data,
        meta: {
            timestamp: new Date().toISOString(),
        },
    };

    return res.status(statusCode).json(response);
}

export function created<T>(res: Response, data: T, message: string = "Created successfully"): Response {
    return success(res, data, message, 201);
}

export function noContent(res: Response): Response {
    return res.status(204).send();
}

export function paginated<T>(
    res: Response,
    data: T[],
    pagination: { page: number; limit: number; total: number },
    message?: string
): Response {
    const totalPages = Math.ceil(pagination.total / pagination.limit);

    const response: ApiResponse<T[]> & { pagination: PaginationMeta } = {
        success: true,
        message,
        data,
        pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: pagination.total,
            totalPages,
            hasNext: pagination.page < totalPages,
            hasPrev: pagination.page > 1,
        },
        meta: {
            timestamp: new Date().toISOString(),
        },
    };

    return res.status(200).json(response);
}

export function error(
    res: Response,
    message: string,
    statusCode: number = 500,
    code: string = "INTERNAL_ERROR",
    details?: unknown
): Response {
    const response: ApiResponse = {
        success: false,
        error: {
            code,
            message,
            details,
        },
        meta: {
            timestamp: new Date().toISOString(),
        },
    };

    return res.status(statusCode).json(response);
}
