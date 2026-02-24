import { useState, useRef } from "react";
import { Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LogoUploadProps {
  logo: string | null;
  onLogoChange: (logo: string | null) => void;
}

const LogoUpload = ({ logo, onLogoChange }: LogoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onLogoChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Image className="w-4 h-4" />
          Logo (Optional)
        </div>
        {logo && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLogoChange(null)}
            className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <X className="w-3 h-3 mr-1" />
            Remove
          </Button>
        )}
      </div>

      {logo ? (
        <div
          className="relative w-full h-24 rounded-xl border-2 border-dashed border-border/50 bg-muted/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <img
            src={logo}
            alt="Logo preview"
            className="max-h-16 max-w-32 object-contain rounded-lg"
          />
          <div className="absolute inset-0 bg-background/80 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span className="text-sm text-muted-foreground">Click to change</span>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "w-full h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300",
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border/50 bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
          )}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className={cn(
            "w-5 h-5 transition-colors",
            isDragging ? "text-primary" : "text-muted-foreground"
          )} />
          <span className="text-xs text-muted-foreground">
            Drop image or click to upload
          </span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />
    </div>
  );
};

export default LogoUpload;
