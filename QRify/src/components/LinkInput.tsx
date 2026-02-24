import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Link2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkInputProps {
  onSubmit: (url: string) => void;
}

const LinkInput = ({ onSubmit }: LinkInputProps) => {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const isValidUrl = url.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div
        className={cn(
          "relative group rounded-2xl transition-all duration-500 ease-out",
          isFocused ? "shadow-xl" : "shadow-lg",
          isFocused && "ring-2 ring-primary/30 ring-offset-4 ring-offset-background"
        )}
      >
        {/* Animated gradient border */}
        <div
          className={cn(
            "absolute -inset-[2px] rounded-2xl opacity-0 transition-opacity duration-500",
            "gradient-bg-animated",
            isFocused && "opacity-100"
          )}
        />

        <div className="relative flex items-center bg-background rounded-2xl p-2">
          <div className="flex items-center gap-3 pl-4 pr-2">
            <Link2 className={cn(
              "w-5 h-5 transition-colors duration-300",
              isFocused ? "text-primary" : "text-muted-foreground"
            )} />
          </div>

          <Input
            type="url"
            placeholder="Paste your link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "flex-1 border-0 bg-transparent text-lg h-14",
              "placeholder:text-muted-foreground/50",
              "focus-visible:ring-0 focus-visible:ring-offset-0"
            )}
          />

          <Button
            type="submit"
            disabled={!isValidUrl}
            className={cn(
              "h-12 px-6 rounded-xl gap-2 font-semibold",
              "bg-primary text-primary-foreground",
              "hover:shadow-lg hover:shadow-primary/30",
              "transition-all duration-300 ease-out",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isValidUrl && "animate-pulse-scale"
            )}
          >
            <span className="hidden sm:inline">Generate</span>
            <ArrowRight className={cn(
              "w-5 h-5 transition-transform duration-300",
              isValidUrl && "group-hover:translate-x-1"
            )} />
          </Button>
        </div>
      </div>

      {/* Helper text */}
      <p className="mt-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        Enter any URL to create a beautiful QR code
      </p>
    </form>
  );
};

export default LinkInput;
