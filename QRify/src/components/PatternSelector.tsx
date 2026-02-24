import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { QRPatternStyle } from "@/lib/qrPatterns";

interface PatternSelectorProps {
  patterns: QRPatternStyle[];
  selectedPattern: QRPatternStyle;
  onSelectPattern: (pattern: QRPatternStyle) => void;
}

const PatternPreview = ({ pattern }: { pattern: QRPatternStyle }) => {
  const renderModule = () => {
    switch (pattern.moduleStyle) {
      case 'rounded':
        return <rect x="2" y="2" width="4" height="4" rx="1" className="fill-foreground" />;
      case 'dots':
        return <circle cx="4" cy="4" r="2" className="fill-foreground" />;
      case 'diamond':
        return <polygon points="4,1 7,4 4,7 1,4" className="fill-foreground" />;
      case 'star':
        return <polygon points="4,0.5 5,3 8,3 5.5,5 6.5,8 4,6 1.5,8 2.5,5 0,3 3,3" className="fill-foreground" transform="scale(0.8) translate(1,1)" />;
      default:
        return <rect x="1.5" y="1.5" width="5" height="5" className="fill-foreground" />;
    }
  };

  const renderEye = () => {
    switch (pattern.eyeStyle) {
      case 'rounded':
        return (
          <rect x="10" y="2" width="12" height="12" rx="3" strokeWidth="2" className="stroke-foreground fill-none" />
        );
      case 'circle':
        return (
          <circle cx="16" cy="8" r="5" strokeWidth="2" className="stroke-foreground fill-none" />
        );
      case 'leaf':
        return (
          <path d="M10 8 Q10 2 16 2 Q22 2 22 8 Q22 14 16 14 Q10 14 10 8" strokeWidth="2" className="stroke-foreground fill-none" />
        );
      case 'diamond':
        return (
          <polygon points="16,2 22,8 16,14 10,8" strokeWidth="2" className="stroke-foreground fill-none" />
        );
      default:
        return (
          <rect x="10" y="2" width="12" height="12" strokeWidth="2" className="stroke-foreground fill-none" />
        );
    }
  };

  const renderEyeInner = () => {
    switch (pattern.eyeInnerStyle) {
      case 'rounded':
        return <rect x="13" y="5" width="6" height="6" rx="1.5" className="fill-foreground" />;
      case 'circle':
      case 'dot':
        return <circle cx="16" cy="8" r="2.5" className="fill-foreground" />;
      default:
        return <rect x="13" y="5" width="6" height="6" className="fill-foreground" />;
    }
  };

  return (
    <svg viewBox="0 0 24 16" className="w-full h-8">
      {renderModule()}
      {renderEye()}
      {renderEyeInner()}
    </svg>
  );
};

const PatternSelector = ({ patterns, selectedPattern, onSelectPattern }: PatternSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {patterns.map((pattern) => {
        const isSelected = selectedPattern.id === pattern.id;
        return (
          <button
            key={pattern.id}
            onClick={() => onSelectPattern(pattern)}
            className={cn(
              "relative p-3 rounded-xl border-2 transition-all duration-200",
              "hover:border-primary/50 hover:shadow-md",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              isSelected
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card"
            )}
          >
            {isSelected && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-sm">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <PatternPreview pattern={pattern} />
            <p className="text-xs font-medium mt-2 text-center">{pattern.name}</p>
          </button>
        );
      })}
    </div>
  );
};

export default PatternSelector;
