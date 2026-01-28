"use client";

import { useState } from "react";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
    onUploadComplete?: (fileData: any) => void;
    allowedTypes?: string[]; // e.g., ["image/png", "application/pdf"]
    maxSizeMB?: number;
}

export function FileUpload({
    onUploadComplete,
    allowedTypes = ["image/jpeg", "image/png", "application/pdf"],
    maxSizeMB = 5
}: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            // Validation
            if (!allowedTypes.includes(selectedFile.type)) {
                toast.error("Invalid file type. Only Images and PDFs are allowed.");
                return;
            }

            if (selectedFile.size > maxSizeMB * 1024 * 1024) {
                toast.error(`File too large. Max size is ${maxSizeMB}MB.`);
                return;
            }

            setFile(selectedFile);
            setProgress(0);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setProgress(0);
    };

    const uploadFile = async () => {
        if (!file) return;

        setUploading(true);
        const toastId = toast.loading("Starting upload...");

        try {
            // 1. Get Pre-signed URL
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: file.name, fileType: file.type }),
            });

            const { data, success, message } = await res.json();
            if (!success) throw new Error(message || "Failed to get upload URL");

            const { uploadURL, key } = data;

            // 2. Upload to S3 directly
            // Note: Using XMLHttpRequest for progress tracking could be added here
            await fetch(uploadURL, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
            });

            // 3. Save Metadata to DB
            // Construct public URL (assuming public bucket for simplicity, or use CloudFront/S3 URL)
            // The exact public URL format depends on your S3 config (public access vs signed GET URLs)
            // For this demo, we'll store the 'key' or a theoretical public URL.
            const publicUrl = uploadURL.split("?")[0];

            const saveRes = await fetch("/api/files", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: file.name,
                    url: publicUrl,
                    size: file.size,
                    type: file.type,
                    // userId: "current-user-id" // In a real app, get this from session
                }),
            });

            const savedFile = await saveRes.json();
            if (!savedFile.success) throw new Error("Failed to save file metadata");

            toast.success("File uploaded successfully!", { id: toastId });
            setFile(null); // Reset
            if (onUploadComplete) onUploadComplete(savedFile.data);

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Upload failed", { id: toastId });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-border">
            <div className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg p-8 text-center transition-colors hover:border-primary/50">
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept={allowedTypes.join(",")}
                    disabled={uploading}
                />

                {!file ? (
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <p className="font-semibold text-lg mb-1">Click to upload</p>
                        <p className="text-sm text-muted-foreground">
                            SVG, PNG, JPG or PDF (max {maxSizeMB}MB)
                        </p>
                    </label>
                ) : (
                    <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-left overflow-hidden">
                                <p className="font-medium truncate max-w-[180px]">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        {!uploading && (
                            <button
                                onClick={handleRemove}
                                className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
                                aria-label="Remove file"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {file && (
                <div className="mt-6">
                    <Button
                        className="w-full"
                        onClick={uploadFile}
                        disabled={uploading}
                    >
                        {uploading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Uploading...
                            </span>
                        ) : "Confirm Upload"}
                    </Button>
                </div>
            )}
        </div>
    );
}
