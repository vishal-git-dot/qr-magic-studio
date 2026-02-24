import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, X, ExternalLink, Copy, Check, RefreshCw, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QRScanner = ({ open, onOpenChange }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScanner = async () => {
    if (!containerRef.current) return;

    setError(null);
    setScannedResult(null);

    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setScannedResult(decodedText);
          stopScanner();
        },
        () => {
          // Ignore QR not found errors
        }
      );

      setIsScanning(true);
    } catch (err: any) {
      console.error("Scanner error:", err);
      if (err.toString().includes("Permission")) {
        setError("Camera permission denied. Please allow camera access.");
      } else {
        setError("Unable to start camera. Make sure you're on HTTPS or localhost.");
      }
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setIsScanning(false);
  };

  const handleClose = () => {
    stopScanner();
    setScannedResult(null);
    setError(null);
    onOpenChange(false);
  };

  const handleRescan = () => {
    setScannedResult(null);
    setError(null);
    startScanner();
  };

  const handleCopy = async () => {
    if (!scannedResult) return;
    await navigator.clipboard.writeText(scannedResult);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    if (!scannedResult) return;
    try {
      const url = new URL(scannedResult);
      window.open(url.href, "_blank", "noopener,noreferrer");
    } catch {
      // Not a valid URL
      toast.error("This doesn't appear to be a valid URL");
    }
  };

  const isValidUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (open && !scannedResult && !error) {
      // Small delay to ensure DOM is ready
      const timeout = setTimeout(() => {
        startScanner();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md glass-strong border-border/50 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ScanLine className="w-5 h-5 text-primary" />
            Scan QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-4 space-y-4">
          {/* Scanner container */}
          {!scannedResult && (
            <div className="relative">
              <div
                id="qr-reader"
                ref={containerRef}
                className={cn(
                  "w-full aspect-square rounded-2xl overflow-hidden bg-muted",
                  "relative"
                )}
              />

              {/* Scanning overlay */}
              {isScanning && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Corner markers */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
                    
                    {/* Scan line animation */}
                    <div 
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                      style={{
                        animation: 'scan 2s ease-in-out infinite',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Loading state */}
              {!isScanning && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center space-y-3">
                    <Camera className="w-12 h-12 mx-auto text-muted-foreground animate-pulse" />
                    <p className="text-sm text-muted-foreground">Starting camera...</p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center space-y-3 p-6">
                    <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-6 h-6 text-destructive" />
                    </div>
                    <p className="text-sm text-muted-foreground">{error}</p>
                    <Button variant="outline" size="sm" onClick={handleRescan}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Success state */}
          {scannedResult && (
            <div className="space-y-4 animate-fade-in">
              {/* Success indicator */}
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Scanned Content:</p>
                <p className="font-mono text-sm bg-muted p-3 rounded-xl break-all max-h-32 overflow-y-auto">
                  {scannedResult}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                {isValidUrl(scannedResult) && (
                  <Button
                    onClick={handleOpenLink}
                    className="flex-1 gap-2 bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Link
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="flex-1 gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={handleRescan}
                className="w-full gap-2 text-muted-foreground"
              >
                <RefreshCw className="w-4 h-4" />
                Scan Another
              </Button>
            </div>
          )}

          {/* Instructions */}
          {isScanning && (
            <p className="text-center text-sm text-muted-foreground">
              Point your camera at a QR code to scan it
            </p>
          )}
        </div>

        {/* Add scan line keyframe */}
        <style>{`
          @keyframes scan {
            0%, 100% {
              top: 0;
              opacity: 0;
            }
            50% {
              top: 100%;
              opacity: 1;
            }
          }
          #qr-reader video {
            border-radius: 1rem !important;
            object-fit: cover !important;
          }
          #qr-reader__scan_region {
            display: none !important;
          }
          #qr-reader__dashboard {
            display: none !important;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
