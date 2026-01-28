import { prisma } from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { handleError } from "@/lib/errorHandler";

export async function POST(req: Request) {
    try {
        const { name, url, size, type, userId } = await req.json();

        const file = await prisma.file.create({
            data: {
                name,
                url,
                size,
                type,
                userId: userId || null, // Optional association
            },
        });

        return sendSuccess({ file }, "File metadata saved successfully");

    } catch (error) {
        return handleError(error, "POST /api/files");
    }
}
