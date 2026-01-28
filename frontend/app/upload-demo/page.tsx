"use client";

import { FileUpload } from "@/components/FileUpload";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UploadDemoPage() {
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

    const handleUploadComplete = (fileData: any) => {
        console.log("Upload completed:", fileData);
        setUploadedFiles(prev => [fileData.file, ...prev]);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold">File Upload Demo</h1>
                    <p className="text-muted-foreground mt-2">
                        Securely upload files to AWS S3 using pre-signed URLs.
                        Files bypass our server and go directly to the cloud ☁️.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <div>
                        <div className="bg-card dark:bg-zinc-900 border border-border p-6 rounded-xl">
                            <h2 className="text-xl font-semibold mb-6">Upload New File</h2>
                            <FileUpload onUploadComplete={handleUploadComplete} />
                        </div>
                    </div>

                    {/* Results Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
                        {uploadedFiles.length === 0 ? (
                            <div className="border border-dashed border-border rounded-xl p-8 text-center text-muted-foreground">
                                No files uploaded yet.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {uploadedFiles.map((file, idx) => (
                                    <div key={idx} className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm border border-border flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">{file.name}</span>
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Uploaded</span>
                                        </div>
                                        <a
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary text-sm hover:underline break-all"
                                        >
                                            {file.url}
                                        </a>
                                        <div className="text-xs text-muted-foreground flex gap-3">
                                            <span>Kind: {file.type}</span>
                                            <span>Size: {Math.round(file.size / 1024)} KB</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
