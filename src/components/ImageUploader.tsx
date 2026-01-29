import { useState, useRef, useCallback, DragEvent, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageSelect: (imageElement: HTMLImageElement) => void;
  isProcessing: boolean;
}

export function ImageUploader({ onImageSelect, isProcessing }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      
      const img = new Image();
      img.onload = () => {
        onImageSelect(img);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const clearImage = useCallback(() => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
      
      {previewUrl ? (
        <div className="relative animate-scale-in">
          <div className="relative rounded-lg overflow-hidden border-2 border-primary/30 glow-primary">
            <img
              ref={imageRef}
              src={previewUrl}
              alt="Uploaded component"
              className="w-full h-auto max-h-[400px] object-contain bg-card"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-mono text-primary">Analyzing components...</span>
                </div>
              </div>
            )}
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={clearImage}
            disabled={isProcessing}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative cursor-pointer rounded-lg border-2 border-dashed transition-all duration-300",
            "min-h-[300px] flex flex-col items-center justify-center gap-4 p-8",
            "circuit-pattern",
            isDragging
              ? "border-primary bg-primary/10 glow-primary"
              : "border-muted-foreground/30 hover:border-primary/50 hover:bg-card/50"
          )}
        >
          <div className={cn(
            "p-4 rounded-full transition-colors",
            isDragging ? "bg-primary/20" : "bg-muted"
          )}>
            {isDragging ? (
              <ImageIcon className="h-10 w-10 text-primary" />
            ) : (
              <Upload className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-foreground">
              {isDragging ? 'Drop your image here' : 'Upload Component Image'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2 font-mono">
              Supports: JPG, PNG, WEBP
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
