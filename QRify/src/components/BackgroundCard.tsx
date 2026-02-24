import { BackgroundTemplate } from "@/lib/backgroundTemplates";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface BackgroundCardProps {
  template: BackgroundTemplate;
  isSelected: boolean;
  onSelect: () => void;
}

const BackgroundCard = ({ template, isSelected, onSelect }: BackgroundCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-300",
        "border-2 hover:scale-105 hover:-translate-y-0.5",
        isSelected 
          ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background" 
          : "border-border hover:border-primary/50"
      )}
    >
      {/* Background preview */}
      <div 
        className="absolute inset-0"
        style={template.style}
      />

      {/* Center dot for transparent bg */}
      {template.id === 'none' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/30" />
        </div>
      )}

      {/* Selection indicator */}
      <div
        className={cn(
          "absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center",
          "transition-all duration-300 ease-out",
          isSelected
            ? "bg-primary text-primary-foreground scale-100"
            : "bg-background/80 text-muted-foreground scale-0 group-hover:scale-100"
        )}
      >
        <Check className="w-3 h-3" />
      </div>

      {/* Name on hover */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 p-2 text-xs font-medium text-center",
        "bg-gradient-to-t from-background/90 to-transparent",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        template.id === 'gradient-midnight' || template.id === 'pattern-circuit' 
          ? "text-foreground" 
          : "text-foreground"
      )}>
        {template.name}
      </div>
    </button>
  );
};

export default BackgroundCard;
