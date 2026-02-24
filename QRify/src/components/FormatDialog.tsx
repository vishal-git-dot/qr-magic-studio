import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExportFormat } from "@/lib/qrTemplates";
import { FileImage, FileType, FileText, Download, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectFormat: (format: ExportFormat) => void;
  isExporting: boolean;
}

const formats: { id: ExportFormat; name: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'png',
    name: 'PNG',
    description: 'Best for web & social media',
    icon: <FileImage className="w-6 h-6" />,
  },
  {
    id: 'jpg',
    name: 'JPG',
    description: 'Smaller file size, photos',
    icon: <FileType className="w-6 h-6" />,
  },
  {
    id: 'pdf',
    name: 'PDF',
    description: 'Perfect for printing',
    icon: <FileText className="w-6 h-6" />,
  },
];

const FormatDialog = ({ open, onOpenChange, onSelectFormat, isExporting }: FormatDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-strong border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-primary" />
            Choose Format
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 space-y-3">
          {formats.map((format, index) => (
            <Button
              key={format.id}
              variant="outline"
              onClick={() => onSelectFormat(format.id)}
              disabled={isExporting}
              className={cn(
                "w-full h-auto p-4 justify-start gap-4 group",
                "hover:bg-primary/5 hover:border-primary/50",
                "transition-all duration-300 ease-out",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                "bg-muted group-hover:bg-primary/10 transition-colors duration-300",
                "text-muted-foreground group-hover:text-primary"
              )}>
                {format.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-foreground">{format.name}</div>
                <div className="text-sm text-muted-foreground">{format.description}</div>
              </div>
              <Download className={cn(
                "w-5 h-5 text-muted-foreground opacity-0 -translate-x-2",
                "group-hover:opacity-100 group-hover:translate-x-0",
                "transition-all duration-300"
              )} />
            </Button>
          ))}
        </div>

        {isExporting && (
          <div className="flex items-center justify-center gap-2 text-primary py-4">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Generating your QR code...</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FormatDialog;
