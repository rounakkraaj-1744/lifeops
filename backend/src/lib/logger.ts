import { isDev } from "../config/env.ts";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    data?: unknown;
}

const colors = {
    debug: "\x1b[36m",
    info: "\x1b[32m",
    warn: "\x1b[33m",
    error: "\x1b[31m",
    reset: "\x1b[0m",
};

function formatLog(entry: LogEntry): string {
    const color = colors[entry.level];
    const levelStr = `[${entry.level.toUpperCase()}]`.padEnd(7);
    const timestamp = entry.timestamp;

    if (isDev) {
        let output = `${color}${levelStr}${colors.reset} ${timestamp} - ${entry.message}`;
        if (entry.data) {
            output += `\n${JSON.stringify(entry.data, null, 2)}`;
        }
        return output;
    }

    return JSON.stringify(entry);
}

function log(level: LogLevel, message: string, data?: unknown): void {
    const entry: LogEntry = {
        level,
        message,
        timestamp: new Date().toISOString(),
        data,
    };

    const output = formatLog(entry);

    switch (level) {
        case "error":
            console.error(output);
            break;
        case "warn":
            console.warn(output);
            break;
        default:
            console.log(output);
    }
}

export const logger = {
    debug: (message: string, data?: unknown) => {
        if (isDev) log("debug", message, data);
    },
    info: (message: string, data?: unknown) => log("info", message, data),
    warn: (message: string, data?: unknown) => log("warn", message, data),
    error: (message: string, data?: unknown) => log("error", message, data),
};
