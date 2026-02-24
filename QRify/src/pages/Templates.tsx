import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode, Check, ScanLine, Palette, Image, Shapes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { toPng, toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";
import { qrTemplates, QRTemplate, ExportFormat } from "@/lib/qrTemplates";
import { backgroundTemplates, BackgroundTemplate } from "@/lib/backgroundTemplates";
import { qrPatterns, QRPatternStyle } from "@/lib/qrPatterns";
import TemplateCard from "@/components/TemplateCard";
import BackgroundCard from "@/components/BackgroundCard";
import PatternSelector from "@/components/PatternSelector";
import QRCodePreview from "@/components/QRCodePreview";
import FormatDialog from "@/components/FormatDialog";
import QRScanner from "@/components/QRScanner";
import LogoUpload from "@/components/LogoUpload";
import FloatingShapes from "@/components/ui/FloatingShapes";
import { cn } from "@/lib/utils";

const Templates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = (location.state as { url?: string })?.url || "https://example.com";

  const [selectedTemplate, setSelectedTemplate] = useState<QRTemplate>(qrTemplates[0]);
  const [selectedBackground, setSelectedBackground] = useState<BackgroundTemplate>(backgroundTemplates[0]);
  const [selectedPattern, setSelectedPattern] = useState<QRPatternStyle>(qrPatterns[0]);
  const [logo, setLogo] = useState<string | null>(null);
  const [showFormatDialog, setShowFormatDialog] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const qrRef = useRef<HTMLDivElement>(null);

  const handleExport = async (format: ExportFormat) => {
    if (!qrRef.current) return;

    setIsExporting(true);

    try {
      const scale = 3;
      const options = {
        quality: 0.95,
        pixelRatio: scale,
      };

      let dataUrl: string;

      if (format === "png") {
        dataUrl = await toPng(qrRef.current, options);
        downloadFile(dataUrl, `qrcode-${selectedTemplate.id}.png`);
      } else if (format === "jpg") {
        dataUrl = await toJpeg(qrRef.current, { ...options, backgroundColor: '#ffffff' });
        downloadFile(dataUrl, `qrcode-${selectedTemplate.id}.jpg`);
      } else if (format === "pdf") {
        dataUrl = await toPng(qrRef.current, { ...options, pixelRatio: 4 });
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        
        const imgWidth = 120;
        const imgHeight = 120;
        const x = (210 - imgWidth) / 2;
        const y = (297 - imgHeight) / 2;
        
        pdf.addImage(dataUrl, "PNG", x, y, imgWidth, imgHeight);
        pdf.save(`qrcode-${selectedTemplate.id}.pdf`);
      }

      toast.success("QR code downloaded successfully!", {
        description: `Saved as ${format.toUpperCase()}`,
      });

      setShowFormatDialog(false);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export QR code");
    } finally {
      setIsExporting(false);
    }
  };

  const downloadFile = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <FloatingShapes />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <QrCode className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">Customize Your QR</span>
              </div>
            </div>

            <Button
              onClick={() => setShowFormatDialog(true)}
              className={cn(
                "gap-2 font-semibold px-6",
                "bg-primary text-primary-foreground",
                "hover:shadow-lg hover:shadow-primary/30",
                "transition-all duration-300"
              )}
            >
              <Check className="w-4 h-4" />
              Export QR Code
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Live Preview */}
            <div className="order-2 lg:order-1 animate-fade-in">
              <div className="sticky top-32">
                <h2 className="text-lg font-semibold mb-6 text-muted-foreground">
                  Live Preview
                </h2>

                {/* Preview Card */}
                <div className="flex flex-col items-center p-8 rounded-3xl glass border border-border/50">
                  <QRCodePreview
                    ref={qrRef}
                    url={url}
                    template={selectedTemplate}
                    background={selectedBackground}
                    logo={logo}
                    size={180}
                    pattern={selectedPattern}
                  />

                  <div className="mt-6 text-center">
                    <h3 className="font-semibold text-lg">{selectedTemplate.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedPattern.name} pattern</p>
                    {selectedBackground.id !== 'none' && (
                      <p className="text-sm text-primary mt-1">+ {selectedBackground.name}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1 max-w-xs truncate">
                      {url}
                    </p>
                  </div>

                  {/* Scan to Preview Button */}
                  {/* Logo Upload Section */}
                  <div className="w-full mt-6 pt-6 border-t border-border/50">
                    <LogoUpload logo={logo} onLogoChange={setLogo} />
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setShowScanner(true)}
                    className="mt-4 gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <ScanLine className="w-4 h-4" />
                    Scan to Preview
                  </Button>
                </div>
              </div>
            </div>

            {/* Right: Template Grid with Tabs */}
            <div className="order-1 lg:order-2">
              <Tabs defaultValue="qr" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 h-12 p-1 bg-muted/50">
                  <TabsTrigger 
                    value="qr" 
                    className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                  >
                    <Palette className="w-4 h-4" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger 
                    value="patterns"
                    className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                  >
                    <Shapes className="w-4 h-4" />
                    Shapes
                  </TabsTrigger>
                  <TabsTrigger 
                    value="background"
                    className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                  >
                    <Image className="w-4 h-4" />
                    Background
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="qr" className="mt-0">
                  <div className="grid grid-cols-2 gap-4">
                    {qrTemplates.map((template, index) => (
                      <div
                        key={template.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <TemplateCard
                          template={template}
                          isSelected={selectedTemplate.id === template.id}
                          onSelect={() => setSelectedTemplate(template)}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="patterns" className="mt-0">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Choose a shape style for your QR code modules and eyes
                    </p>
                    <PatternSelector
                      patterns={qrPatterns}
                      selectedPattern={selectedPattern}
                      onSelectPattern={setSelectedPattern}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="background" className="mt-0">
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {backgroundTemplates.map((bg, index) => (
                      <div
                        key={bg.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <BackgroundCard
                          template={bg}
                          isSelected={selectedBackground.id === bg.id}
                          onSelect={() => setSelectedBackground(bg)}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Select a background to wrap around your QR code
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Format Dialog */}
      <FormatDialog
        open={showFormatDialog}
        onOpenChange={setShowFormatDialog}
        onSelectFormat={handleExport}
        isExporting={isExporting}
      />

      {/* QR Scanner Dialog */}
      <QRScanner
        open={showScanner}
        onOpenChange={setShowScanner}
      />
    </div>
  );
};

export default Templates;
