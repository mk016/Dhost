"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp, X, CheckCircle, AlertCircle, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onUploadComplete: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedFileTypes?: string[];
  className?: string;
}

export function FileUpload({
  onUploadComplete,
  maxFiles = 100,
  maxSize = 100 * 1024 * 1024, // 100MB default
  acceptedFileTypes,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    // Check if exceeding max files
    if (acceptedFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files at once.`);
      return;
    }
    
    // Check file sizes
    const oversizedFiles = acceptedFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the maximum size of ${Math.round(maxSize / (1024 * 1024))}MB.`);
      return;
    }
    
    setFiles(acceptedFiles);
  }, [maxFiles, maxSize]);

  // Setup dropzone
  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    open
  } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: acceptedFileTypes ? 
      acceptedFileTypes.reduce((acc, type) => {
        acc[type] = [];
        return acc;
      }, {} as Record<string, string[]>) : 
      undefined,
    noClick: false,
    noKeyboard: false
  });

  // Update drag state for visual feedback
  useEffect(() => {
    setIsDragging(isDragActive);
  }, [isDragActive]);

  // Handle drag events on the document
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    // Add event listeners to the document
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);

    return () => {
      // Clean up event listeners
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
    };
  }, []);

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onUploadComplete(files);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "hover:bg-muted/50",
          error ? "border-destructive" : ""
        )}
        onClick={open}
      >
        <input {...getInputProps()} />
        {isDragging ? (
          <div className="py-6">
            <Folder className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
            <p className="font-medium text-lg">Drop files here...</p>
          </div>
        ) : (
          <>
            <FileUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Drag and drop your files here</h3>
            <p className="text-muted-foreground">
              or click to browse your files
            </p>
            {acceptedFileTypes && (
              <p className="text-sm text-muted-foreground mt-2">
                Accepted file types: {acceptedFileTypes.map(type => type.replace('text/', '.').replace('application/', '.').replace('image/', '.')).join(", ")}
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Maximum file size: {Math.round(maxSize / (1024 * 1024))}MB
            </p>
          </>
        )}
      </div>
      
      {error && (
        <div className="flex items-center text-destructive text-sm p-2 bg-destructive/10 rounded">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}
      
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">{files.length} file(s) selected</p>
          
          <div className="max-h-60 overflow-y-auto space-y-2 border rounded-md p-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                <div className="flex items-center overflow-hidden">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center mr-2">
                    <FileUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeFile(index)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          {isUploading ? (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                Uploading... {uploadProgress}%
              </p>
            </div>
          ) : uploadProgress === 100 ? (
            <div className="flex items-center justify-center text-green-500 text-sm p-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Upload complete!
            </div>
          ) : (
            <Button onClick={handleUpload} className="w-full">
              Upload Files
            </Button>
          )}
        </div>
      )}
    </div>
  );
}