export interface QRTemplate {
  id: string;
  name: string;
  description: string;
  fgColor: string;
  bgColor: string;
  eyeColor?: string;
  gradientColors?: [string, string];
  pattern: 'classic' | 'rounded' | 'dots' | 'classy';
  frameStyle: 'none' | 'simple' | 'gradient' | 'shadow';
  preview: {
    bgClass: string;
    borderClass: string;
    shadowClass: string;
  };
}

export const qrTemplates: QRTemplate[] = [
  {
    id: 'classic-dark',
    name: 'Classic Dark',
    description: 'Timeless black & white design',
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    pattern: 'classic',
    frameStyle: 'simple',
    preview: {
      bgClass: 'bg-background',
      borderClass: 'border-2 border-foreground',
      shadowClass: 'shadow-lg',
    },
  },
  {
    id: 'neon-purple',
    name: 'Neon Purple',
    description: 'Vibrant purple gradient glow',
    fgColor: '#8B5CF6',
    bgColor: '#FFFFFF',
    gradientColors: ['#8B5CF6', '#D946EF'],
    pattern: 'rounded',
    frameStyle: 'gradient',
    preview: {
      bgClass: 'bg-gradient-to-br from-primary/10 to-accent/10',
      borderClass: 'border-2 border-primary/50',
      shadowClass: 'shadow-lg shadow-primary/20',
    },
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Cool ocean-inspired tones',
    fgColor: '#0EA5E9',
    bgColor: '#FFFFFF',
    gradientColors: ['#0EA5E9', '#06B6D4'],
    pattern: 'dots',
    frameStyle: 'shadow',
    preview: {
      bgClass: 'bg-gradient-to-br from-secondary/10 to-cyan-100',
      borderClass: 'border-2 border-secondary/50',
      shadowClass: 'shadow-lg shadow-secondary/20',
    },
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    description: 'Warm sunset gradient vibes',
    fgColor: '#F97316',
    bgColor: '#FFFFFF',
    gradientColors: ['#F97316', '#EF4444'],
    pattern: 'rounded',
    frameStyle: 'gradient',
    preview: {
      bgClass: 'bg-gradient-to-br from-orange-100 to-rose-100',
      borderClass: 'border-2 border-orange-400/50',
      shadowClass: 'shadow-lg shadow-orange-300/30',
    },
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Natural green earth tones',
    fgColor: '#22C55E',
    bgColor: '#FFFFFF',
    gradientColors: ['#22C55E', '#10B981'],
    pattern: 'classy',
    frameStyle: 'simple',
    preview: {
      bgClass: 'bg-gradient-to-br from-emerald-50 to-green-100',
      borderClass: 'border-2 border-emerald-400/50',
      shadowClass: 'shadow-lg shadow-emerald-300/30',
    },
  },
  {
    id: 'midnight-gold',
    name: 'Midnight Gold',
    description: 'Elegant dark with gold accents',
    fgColor: '#1F2937',
    bgColor: '#FFFBEB',
    eyeColor: '#F59E0B',
    pattern: 'classy',
    frameStyle: 'shadow',
    preview: {
      bgClass: 'bg-gradient-to-br from-amber-50 to-yellow-100',
      borderClass: 'border-2 border-amber-400/50',
      shadowClass: 'shadow-lg shadow-amber-300/30',
    },
  },
  {
    id: 'pink-dreams',
    name: 'Pink Dreams',
    description: 'Soft pink romantic style',
    fgColor: '#EC4899',
    bgColor: '#FFFFFF',
    gradientColors: ['#EC4899', '#F472B6'],
    pattern: 'dots',
    frameStyle: 'gradient',
    preview: {
      bgClass: 'bg-gradient-to-br from-pink-50 to-rose-100',
      borderClass: 'border-2 border-pink-400/50',
      shadowClass: 'shadow-lg shadow-pink-300/30',
    },
  },
  {
    id: 'cyber-tech',
    name: 'Cyber Tech',
    description: 'Futuristic tech aesthetic',
    fgColor: '#6366F1',
    bgColor: '#0F172A',
    gradientColors: ['#6366F1', '#8B5CF6'],
    pattern: 'rounded',
    frameStyle: 'gradient',
    preview: {
      bgClass: 'bg-gradient-to-br from-slate-900 to-indigo-950',
      borderClass: 'border-2 border-indigo-500/50',
      shadowClass: 'shadow-lg shadow-indigo-500/30',
    },
  },
];

export type ExportFormat = 'png' | 'jpg' | 'pdf';
