<p align="center">
  <img src="https://img.shields.io/badge/QRify-✨_QR_Code_Generator-8B5CF6?style=for-the-badge&labelColor=1a1a2e" alt="QRify" />
</p>

<h1 align="center">🎨 QRify</h1>

<p align="center">
  <strong>Create stunning, customizable QR codes instantly.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-⚡-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-🎨-000000?style=flat-square" alt="shadcn/ui" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-22C55E?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/license-MIT-8B5CF6?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-EC4899?style=flat-square" alt="PRs Welcome" />
</p>

---

<p align="center">
  Transform any link into a beautiful, customizable QR code with modern templates, custom shapes, background styles, logo overlays, and instant multi-format export.
</p>

---

## ✨ Features

<table align="center">
  <tr>
    <td align="center">⚡</td>
    <td><strong>Instant Generation</strong><br/>Create QR codes in milliseconds from any URL</td>
  </tr>
  <tr>
    <td align="center">🎨</td>
    <td><strong>8 Beautiful Templates</strong><br/>Classic Dark, Neon Purple, Ocean Blue, Sunset Glow, Forest Green, Midnight Gold, Pink Dreams, Cyber Tech</td>
  </tr>
  <tr>
    <td align="center">🔷</td>
    <td><strong>8 Shape Patterns</strong><br/>Square, Rounded, Dots, Diamond, Star modules with Leaf, Circle, Rounded eye styles</td>
  </tr>
  <tr>
    <td align="center">🖼️</td>
    <td><strong>16 Background Templates</strong><br/>Gradients, patterns, and textures — Purple Dream, Polka Dots, Circuit Board, and more</td>
  </tr>
  <tr>
    <td align="center">🏷️</td>
    <td><strong>Logo Upload</strong><br/>Drag & drop your custom logo into the center of the QR code with high error correction</td>
  </tr>
  <tr>
    <td align="center">📤</td>
    <td><strong>Multi-Format Export</strong><br/>Download as PNG, JPG, or PDF</td>
  </tr>
  <tr>
    <td align="center">📱</td>
    <td><strong>QR Scanner</strong><br/>Scan QR codes directly from your browser camera</td>
  </tr>
  <tr>
    <td align="center">🌙</td>
    <td><strong>Dark Mode</strong><br/>Gorgeous dark theme with animated gradient backgrounds</td>
  </tr>
</table>

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/vishal-git-dot/qr-magic-studio.git

# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

## 🛠️ Tech Stack

<p align="center">

| Technology | Purpose | Category |
|:---|:---|:---|
| **React 18** | UI framework | Frontend |
| **TypeScript** | Type safety | Language |
| **Vite** | Lightning-fast bundler | Build Tool |
| **Tailwind CSS** | Utility-first styling | Styling |
| **shadcn/ui** | Beautiful UI components | Components |
| **qrcode.react** | QR code rendering | QR Engine |
| **qrcode** | Low-level QR data generation | QR Engine |
| **html-to-image** | QR code export | Export |
| **jsPDF** | PDF export | Export |
| **html5-qrcode** | Camera-based QR scanning | Scanner |

</p>

---

## 📁 Project Structure

```
src/
├── components/
│   ├── BackgroundCard.tsx      # Background template cards
│   ├── FormatDialog.tsx        # Export format selection
│   ├── LinkInput.tsx           # URL input component
│   ├── LogoUpload.tsx          # Drag & drop logo upload
│   ├── PatternSelector.tsx     # QR shape pattern picker
│   ├── QRCodePreview.tsx       # QR code preview with overlays
│   ├── QRScanner.tsx           # Camera QR scanner
│   ├── StyledQRCode.tsx        # Custom canvas QR renderer
│   ├── TemplateCard.tsx        # Style template cards
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── backgroundTemplates.ts  # 16 background presets
│   ├── qrPatterns.ts           # Shape pattern definitions
│   ├── qrTemplates.ts          # 8 color templates
│   └── utils.ts                # Utility functions
├── pages/
│   ├── Index.tsx               # Landing page
│   └── Templates.tsx           # QR customization page
└── App.tsx                     # Router & providers
```

---

## 🎯 How It Works

<p align="center">

```
  Enter URL  →  Choose Template  →  Customize Shape  →  Add Background  →  Upload Logo  →  Export
     🔗              🎨                  🔷                 🖼️                🏷️             📤
```

</p>

---

## 📄 License

<p align="center">
  This project is licensed under the <a href="./LICENSE">MIT License</a> © QRify
</p>

<p align="center">
  <sub>Built with 💜</sub>
</p>
