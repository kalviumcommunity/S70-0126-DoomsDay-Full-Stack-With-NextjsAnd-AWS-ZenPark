import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import { handleError } from "@/lib/errorHandler";

// Initialize S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION || "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

export async function POST(req: Request) {
    try {
        const { filename, fileType } = await req.json();

        // Basic Validation
        if (!filename || !fileType) {
            return sendError("Filename and fileType are required", ERROR_CODES.VALIDATION_ERROR, 400);
        }

        // Validate Allowed Types (Image & PDF only)
        if (!fileType.startsWith("image/") && !fileType.startsWith("application/pdf")) {
            return sendError("Unsupported file type. Only Images and PDFs allowed.", ERROR_CODES.VALIDATION_ERROR, 400);
        }

        const bucketName = process.env.AWS_BUCKET_NAME;
        if (!bucketName) {
            return sendError("Server Misconfiguration: AWS_BUCKET_NAME missing", ERROR_CODES.INTERNAL_ERROR, 500);
        }

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `uploads/${Date.now()}-${filename}`, // Unique key
            ContentType: fileType,
        });

        // Generate Pre-signed URL (valid for 60 seconds)
        const url = await getSignedUrl(s3, command, { expiresIn: 60 });

        return sendSuccess({ uploadURL: url, key: command.input.Key }, "Pre-signed URL generated successfully");

    } catch (error) {
        return handleError(error, "POST /api/upload");
    }
}
