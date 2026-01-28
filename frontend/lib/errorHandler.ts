import { NextResponse } from "next/server";
import { logger } from "./logger";
import { ERROR_CODES } from "./errorCodes";
import { sendError } from "./responseHandler";

export function handleError(error: any, context: string) {
    const isProd = process.env.NODE_ENV === "production";

    // Log the full error details for debugging
    logger.error(`Error in ${context}`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
    });

    // Handle specific error types if needed (e.g., Prisma errors, Zod errors)
    // Logic to map known errors to specific status codes could go here

    const message = isProd
        ? "Something went wrong. Please try again later."
        : error.message || "Unknown error";

    const details = isProd ? undefined : error.stack;

    return sendError(
        message,
        ERROR_CODES.INTERNAL_ERROR,
        500,
        details
    );
}
