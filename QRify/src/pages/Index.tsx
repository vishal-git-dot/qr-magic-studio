import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Zap, Palette, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LinkInput from "@/components/LinkInput";
import FloatingShapes from "@/components/ui/FloatingShapes";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Generation",
    description: "Create QR codes in milliseconds",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Beautiful Templates",
    description: "Choose from stunning preset designs",
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Multiple Formats",
    description: "Export as PNG, JPG, or PDF",
  },
];

const Index = () => {
  const navigate = useNavigate();

  const handleSubmit = (url: string) => {
    navigate("/templates", { state: { url } });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingShapes />

      {/* Main content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 md:px-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">QRify</span>
          </div>
          <Button
            variant="outline"
            className="hidden sm:flex gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </nav>

        {/* Hero Section */}
        <main className="container mx-auto px-4 pt-12 md:pt-24 pb-20">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                Free QR Code Generator
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Create{" "}
              <span className="gradient-text">Stunning</span>
              <br />
              QR Codes Instantly
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform any link into a beautiful, customizable QR code with our
              collection of modern templates and instant export options.
            </p>

            {/* Link Input */}
            <div className="pt-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <LinkInput onSubmit={handleSubmit} />
            </div>
          </div>

          {/* Features */}
          <div 
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-24 animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl glass hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
