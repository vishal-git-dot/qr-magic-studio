import { useEffect, useRef } from "react";
import QRCodeLib from "qrcode";
import { QRPatternStyle } from "@/lib/qrPatterns";

interface StyledQRCodeProps {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  pattern: QRPatternStyle;
  eyeColor?: string;
}

const StyledQRCode = ({ value, size, fgColor, bgColor, pattern, eyeColor }: StyledQRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Generate QR code data
      const qrData = QRCodeLib.create(value || "https://example.com", {
        errorCorrectionLevel: "H",
      });

      const modules = qrData.modules;
      const moduleCount = modules.size;
      const moduleSize = size / moduleCount;

      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);

      // Helper to check if position is in eye area
      const isEyePosition = (row: number, col: number) => {
        // Top-left eye
        if (row < 7 && col < 7) return true;
        // Top-right eye
        if (row < 7 && col >= moduleCount - 7) return true;
        // Bottom-left eye
        if (row >= moduleCount - 7 && col < 7) return true;
        return false;
      };

      const isEyeOuter = (row: number, col: number) => {
        // Top-left
        if (row < 7 && col < 7 && (row === 0 || row === 6 || col === 0 || col === 6)) return true;
        // Top-right
        if (row < 7 && col >= moduleCount - 7) {
          const localCol = col - (moduleCount - 7);
          if (row === 0 || row === 6 || localCol === 0 || localCol === 6) return true;
        }
        // Bottom-left
        if (row >= moduleCount - 7 && col < 7) {
          const localRow = row - (moduleCount - 7);
          if (localRow === 0 || localRow === 6 || col === 0 || col === 6) return true;
        }
        return false;
      };

      const isEyeInner = (row: number, col: number) => {
        // Top-left inner (2-4, 2-4)
        if (row >= 2 && row <= 4 && col >= 2 && col <= 4) return true;
        // Top-right inner
        if (row >= 2 && row <= 4 && col >= moduleCount - 5 && col <= moduleCount - 3) return true;
        // Bottom-left inner
        if (row >= moduleCount - 5 && row <= moduleCount - 3 && col >= 2 && col <= 4) return true;
        return false;
      };

      // Draw modules
      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (!modules.get(row, col)) continue;

          const x = col * moduleSize;
          const y = row * moduleSize;
          const padding = moduleSize * 0.1;
          const actualSize = moduleSize - padding * 2;

          // Use eye color for eye elements if specified
          const isEye = isEyePosition(row, col);
          ctx.fillStyle = isEye && eyeColor ? eyeColor : fgColor;

          // Skip eye areas for custom drawing later
          if (isEyeOuter(row, col) || isEyeInner(row, col)) {
            continue;
          }

          // Draw based on pattern
          ctx.beginPath();
          switch (pattern.moduleStyle) {
            case "rounded":
              ctx.roundRect(x + padding, y + padding, actualSize, actualSize, actualSize * 0.3);
              break;
            case "dots":
              ctx.arc(x + moduleSize / 2, y + moduleSize / 2, actualSize / 2, 0, Math.PI * 2);
              break;
            case "diamond":
              ctx.moveTo(x + moduleSize / 2, y + padding);
              ctx.lineTo(x + moduleSize - padding, y + moduleSize / 2);
              ctx.lineTo(x + moduleSize / 2, y + moduleSize - padding);
              ctx.lineTo(x + padding, y + moduleSize / 2);
              ctx.closePath();
              break;
            case "star":
              const cx = x + moduleSize / 2;
              const cy = y + moduleSize / 2;
              const outerR = actualSize / 2;
              const innerR = outerR * 0.4;
              for (let i = 0; i < 5; i++) {
                const outerAngle = (i * 72 - 90) * (Math.PI / 180);
                const innerAngle = ((i * 72 + 36) - 90) * (Math.PI / 180);
                if (i === 0) {
                  ctx.moveTo(cx + outerR * Math.cos(outerAngle), cy + outerR * Math.sin(outerAngle));
                } else {
                  ctx.lineTo(cx + outerR * Math.cos(outerAngle), cy + outerR * Math.sin(outerAngle));
                }
                ctx.lineTo(cx + innerR * Math.cos(innerAngle), cy + innerR * Math.sin(innerAngle));
              }
              ctx.closePath();
              break;
            default:
              ctx.rect(x + padding, y + padding, actualSize, actualSize);
          }
          ctx.fill();
        }
      }

      // Draw custom eyes
      const drawEye = (startX: number, startY: number) => {
        const eyeSize = moduleSize * 7;
        const outerSize = eyeSize - moduleSize;
        const innerOffset = moduleSize * 2;
        const innerSize = moduleSize * 3;

        ctx.fillStyle = eyeColor || fgColor;
        ctx.strokeStyle = eyeColor || fgColor;
        ctx.lineWidth = moduleSize;

        // Draw outer eye
        ctx.beginPath();
        switch (pattern.eyeStyle) {
          case "rounded":
            ctx.roundRect(startX + moduleSize / 2, startY + moduleSize / 2, outerSize, outerSize, moduleSize * 1.5);
            break;
          case "circle":
            ctx.arc(startX + eyeSize / 2, startY + eyeSize / 2, outerSize / 2 - moduleSize / 2, 0, Math.PI * 2);
            break;
          case "leaf":
            const cx = startX + eyeSize / 2;
            const cy = startY + eyeSize / 2;
            const r = outerSize / 2 - moduleSize / 2;
            ctx.moveTo(cx - r, cy);
            ctx.quadraticCurveTo(cx - r, cy - r, cx, cy - r);
            ctx.quadraticCurveTo(cx + r, cy - r, cx + r, cy);
            ctx.quadraticCurveTo(cx + r, cy + r, cx, cy + r);
            ctx.quadraticCurveTo(cx - r, cy + r, cx - r, cy);
            break;
          case "diamond":
            const dcx = startX + eyeSize / 2;
            const dcy = startY + eyeSize / 2;
            const dr = outerSize / 2 - moduleSize / 2;
            ctx.moveTo(dcx, dcy - dr);
            ctx.lineTo(dcx + dr, dcy);
            ctx.lineTo(dcx, dcy + dr);
            ctx.lineTo(dcx - dr, dcy);
            ctx.closePath();
            break;
          default:
            ctx.rect(startX + moduleSize / 2, startY + moduleSize / 2, outerSize, outerSize);
        }
        ctx.stroke();

        // Draw inner eye
        ctx.beginPath();
        switch (pattern.eyeInnerStyle) {
          case "rounded":
            ctx.roundRect(startX + innerOffset, startY + innerOffset, innerSize, innerSize, moduleSize * 0.5);
            break;
          case "circle":
          case "dot":
            ctx.arc(startX + eyeSize / 2, startY + eyeSize / 2, innerSize / 2, 0, Math.PI * 2);
            break;
          default:
            ctx.rect(startX + innerOffset, startY + innerOffset, innerSize, innerSize);
        }
        ctx.fill();
      };

      // Draw all three eyes
      drawEye(0, 0); // Top-left
      drawEye((moduleCount - 7) * moduleSize, 0); // Top-right
      drawEye(0, (moduleCount - 7) * moduleSize); // Bottom-left
    };

    generateQR();
  }, [value, size, fgColor, bgColor, pattern, eyeColor]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
};

export default StyledQRCode;
