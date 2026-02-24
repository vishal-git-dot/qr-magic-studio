import { QRTemplate } from "@/lib/qrTemplates";
import { BackgroundTemplate } from "@/lib/backgroundTemplates";
import { QRPatternStyle, qrPatterns } from "@/lib/qrPatterns";
import { forwardRef } from "react";
import StyledQRCode from "./StyledQRCode";

interface QRCodePreviewProps {
  url: string;
  template: QRTemplate;
  background?: BackgroundTemplate;
  logo?: string | null;
  size?: number;
  pattern?: QRPatternStyle;
}

const QRCodePreview = forwardRef<HTMLDivElement, QRCodePreviewProps>(
  ({ url, template, background, logo, size = 200, pattern = qrPatterns[0] }, ref) => {
    const getFrameStyles = (): React.CSSProperties => {
      switch (template.frameStyle) {
        case 'gradient':
          return {
            background: template.gradientColors
              ? `linear-gradient(135deg, ${template.gradientColors[0]}20, ${template.gradientColors[1]}20)`
              : template.bgColor,
            padding: '24px',
            borderRadius: '16px',
          };
        case 'shadow':
          return {
            background: template.bgColor,
            padding: '24px',
            borderRadius: '16px',
            boxShadow: `0 20px 40px -10px ${template.fgColor}30`,
          };
        case 'simple':
          return {
            background: template.bgColor,
            padding: '20px',
            borderRadius: '12px',
            border: `2px solid ${template.fgColor}20`,
          };
        default:
          return {
            background: template.bgColor,
            padding: '16px',
          };
      }
    };

    const hasBackground = background && background.id !== 'none';
    const logoSize = size * 0.22;

    return (
      <div
        ref={ref}
        className="inline-flex items-center justify-center transition-all duration-300 overflow-hidden"
        style={{
          ...(hasBackground ? {
            ...background.style,
            padding: '40px',
            borderRadius: '20px',
          } : {}),
        }}
      >
        <div
          className="inline-flex items-center justify-center transition-all duration-300 relative"
          style={getFrameStyles()}
        >
          <StyledQRCode
            value={url || "https://example.com"}
            size={size}
            fgColor={template.fgColor}
            bgColor={template.bgColor}
            pattern={pattern}
            eyeColor={template.eyeColor}
          />
          {logo && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="rounded-lg overflow-hidden shadow-sm"
                style={{
                  width: logoSize,
                  height: logoSize,
                  backgroundColor: template.bgColor,
                  padding: '4px',
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

QRCodePreview.displayName = "QRCodePreview";

export default QRCodePreview;
