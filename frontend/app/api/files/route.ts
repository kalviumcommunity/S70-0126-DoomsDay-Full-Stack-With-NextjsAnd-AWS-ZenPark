import dbConnect from "@/lib/db";
import { File } from "@/lib/models/File";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { handleError } from "@/lib/errorHandler";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, url, size, type, userId } = await req.json();

        const file = await File.create({
            name,
            url,
            size,
            type,
            userId: userId || undefined, // Optional association
        });

        return sendSuccess({ file }, "File metadata saved successfully");

    } catch (error) {
        return handleError(error, "POST /api/files");
    }
}
