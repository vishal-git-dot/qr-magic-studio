export interface QRPatternStyle {
  id: string;
  name: string;
  description: string;
  moduleStyle: 'square' | 'rounded' | 'dots' | 'diamond' | 'star';
  eyeStyle: 'square' | 'rounded' | 'circle' | 'leaf' | 'diamond';
  eyeInnerStyle: 'square' | 'rounded' | 'circle' | 'dot';
}

export const qrPatterns: QRPatternStyle[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional square modules',
    moduleStyle: 'square',
    eyeStyle: 'square',
    eyeInnerStyle: 'square',
  },
  {
    id: 'rounded',
    name: 'Rounded',
    description: 'Soft rounded corners',
    moduleStyle: 'rounded',
    eyeStyle: 'rounded',
    eyeInnerStyle: 'rounded',
  },
  {
    id: 'dots',
    name: 'Dots',
    description: 'Circular dot pattern',
    moduleStyle: 'dots',
    eyeStyle: 'circle',
    eyeInnerStyle: 'dot',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    description: 'Diamond shaped modules',
    moduleStyle: 'diamond',
    eyeStyle: 'diamond',
    eyeInnerStyle: 'square',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Rounded with leaf eyes',
    moduleStyle: 'rounded',
    eyeStyle: 'leaf',
    eyeInnerStyle: 'circle',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Dots with circular eyes',
    moduleStyle: 'dots',
    eyeStyle: 'rounded',
    eyeInnerStyle: 'dot',
  },
  {
    id: 'star',
    name: 'Star',
    description: 'Star-shaped modules',
    moduleStyle: 'star',
    eyeStyle: 'circle',
    eyeInnerStyle: 'dot',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean dots with square eyes',
    moduleStyle: 'dots',
    eyeStyle: 'square',
    eyeInnerStyle: 'square',
  },
];
