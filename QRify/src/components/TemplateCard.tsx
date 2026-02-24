import { QRCodeSVG } from "qrcode.react";
import { QRTemplate } from "@/lib/qrTemplates";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TemplateCardProps {
  template: QRTemplate;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard = ({ template, isSelected, onSelect }: TemplateCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative p-6 rounded-2xl transition-all duration-500 ease-out",
        "hover:scale-[1.02] hover:-translate-y-1",
        template.preview.bgClass,
        template.preview.borderClass,
        template.preview.shadowClass,
        isSelected && "ring-4 ring-primary ring-offset-2 ring-offset-background scale-[1.02]"
      )}
    >
      {/* Selection indicator */}
      <div
        className={cn(
          "absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center",
          "transition-all duration-300 ease-out",
          isSelected
            ? "bg-primary text-primary-foreground scale-100"
            : "bg-muted text-muted-foreground scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100"
        )}
      >
        <Check className="w-4 h-4" />
      </div>

      {/* QR Preview */}
      <div className="flex items-center justify-center mb-4">
        <div
          className="p-3 rounded-xl transition-all duration-300 group-hover:shadow-md"
          style={{ backgroundColor: template.bgColor }}
        >
          <QRCodeSVG
            value="https://example.com"
            size={80}
            fgColor={template.fgColor}
            bgColor={template.bgColor}
            level="M"
          />
        </div>
      </div>

      {/* Template info */}
      <div className="text-center space-y-1">
        <h3 
          className="font-semibold text-sm"
          style={{ 
            color: template.id === 'cyber-tech' ? '#E2E8F0' : undefined 
          }}
        >
          {template.name}
        </h3>
        <p 
          className="text-xs opacity-70"
          style={{ 
            color: template.id === 'cyber-tech' ? '#94A3B8' : undefined 
          }}
        >
          {template.description}
        </p>
      </div>

      {/* Hover glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100 pointer-events-none"
        )}
        style={{
          background: template.gradientColors
            ? `linear-gradient(135deg, ${template.gradientColors[0]}10, ${template.gradientColors[1]}10)`
            : `${template.fgColor}05`,
        }}
      />
    </button>
  );
};

export default TemplateCard;
