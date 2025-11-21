# ChemistryGames 🧪

An interactive collection of educational chemistry games designed for first-year chemistry students (1. ár). Built with React and Tailwind CSS, featuring bilingual support (Icelandic/English).

**Part of the Kvenno Efnafræði ecosystem** - Chemistry learning tools for Kvennaskólinn í Reykjavík

## Deployment

This repository is configured for deployment to **kvenno.app** at:
- **Production URL**: `https://kvenno.app/1-ar/games/`
- **Repository**: `chemistry-games-1ar`
- **Target Audience**: 1st year chemistry students

## 🎮 Games Included

### 1. **Nafnakerfið** (Compound Name Matchmaker)
- **Type:** Memory matching game
- **Purpose:** Match chemical formulas to their compound names
- **Difficulty Levels:** Easy, Medium, Hard
- **File:** `1. ár/nafnakerfið.html`

### 2. **Einingagreining** (Unit Conversion Race)
- **Type:** Timed speed quiz (60 seconds)
- **Purpose:** Convert between units (mass, volume, length, temperature)
- **Difficulty Levels:** Easy, Medium, Hard, Mixed
- **File:** `1. ár/einingagreining.html`

### 3. **Takmarkandi** (Limiting Reactant Factory)
- **Type:** Problem-solving game
- **Purpose:** Identify limiting reagents and calculate products formed
- **Difficulty Levels:** Easy, Medium, Hard
- **File:** `1. ár/takmarkandi.html`

### 4. **Molmassi** (Molar Mass Challenge)
- **Type:** Timed speed quiz (90 seconds)
- **Purpose:** Calculate molar mass from chemical formulas
- **Difficulty Levels:** Easy, Medium, Hard, Mixed
- **File:** `1. ár/molmassi.tsx` *(requires build)*

### 5. **Lausnir** (Solution Lab)
- **Type:** Problem-solving game
- **Purpose:** Solve dilution, molarity, and solution mixing problems
- **Difficulty Levels:** Easy, Medium, Hard
- **File:** `1. ár/lausnir.tsx` *(requires build)*

## 🚀 Quick Start

### Local Development
The first three games can be opened directly in any modern web browser:

```bash
# Simply open in browser:
open "1. ár/nafnakerfið.html"
open "1. ár/einingagreining.html"
open "1. ár/takmarkandi.html"

# Or serve with a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

**Note:** An internet connection is required for CDN-loaded dependencies (React, Tailwind CSS).

### Production Deployment to kvenno.app

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to kvenno.app.

### TSX Games (Require Build Setup)
The `molmassi.tsx` and `lausnir.tsx` files need to be integrated into a build system. See [Build Setup](#build-setup) below.

## 🛠️ Technology Stack

- **React 18** - UI component library
- **TypeScript** - Type-safe JavaScript (for TSX files)
- **Tailwind CSS** - Utility-first CSS framework
- **Babel Standalone** - JSX transpilation (for HTML files)
- **Lucide React** - Icon library (for TSX files)

## 📋 Build Setup

To use the TSX components or develop locally, set up a build environment:

### Option 1: Vite (Recommended)

```bash
# Initialize npm project
npm init -y

# Install dependencies
npm install react react-dom
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom

# Install additional dependencies
npm install lucide-react tailwindcss autoprefixer postcss

# Initialize Tailwind CSS
npx tailwindcss init -p

# Create vite.config.ts
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["1. ár/**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# Add scripts to package.json
npm pkg set scripts.dev="vite"
npm pkg set scripts.build="vite build"
npm pkg set scripts.preview="vite preview"

# Start development server
npm run dev
```

### Option 2: Create React App

```bash
npx create-react-app chemistry-games --template typescript
cd chemistry-games
npm install lucide-react tailwindcss
npx tailwindcss init

# Copy TSX files to src/
cp "../1. ár/molmassi.tsx" src/
cp "../1. ár/lausnir.tsx" src/

# Start development
npm start
```

## 📁 Project Structure

```
ChemistryGames/
├── LICENSE                    # MIT License
├── README.md                  # This file
└── 1. ár/                     # Year 1 Chemistry Games
    ├── nafnakerfið.html      # Compound Name Matchmaker
    ├── einingagreining.html  # Unit Conversion Race
    ├── takmarkandi.html      # Limiting Reactant Factory
    ├── molmassi.tsx          # Molar Mass Challenge (React component)
    └── lausnir.tsx           # Solution Lab (React component)
```

## 🌐 Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

**Requirements:**
- JavaScript enabled
- ES6+ support
- Internet connection (for CDN dependencies in HTML files)

## 🎯 Educational Features

All games include:
- ✅ Multiple difficulty levels
- ✅ Real-time feedback
- ✅ Score tracking
- ✅ Bilingual interface (Icelandic/English)
- ✅ Instructions and help system
- ✅ Responsive design (mobile-friendly)
- ✅ Visual feedback and animations

## 📝 License

MIT License - Copyright (c) 2025 Sigurður E. Vilhelmsson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 👨‍💻 Author

**Sigurður E. Vilhelmsson**

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve translations

## 🔧 Development Notes

### CDN Dependencies (HTML files)
The HTML files load dependencies from CDN:
- React 18: `https://unpkg.com/react@18/umd/react.production.min.js`
- React-DOM 18: `https://unpkg.com/react-dom@18/umd/react-dom.production.min.js`
- Babel Standalone: `https://unpkg.com/@babel/standalone/babel.min.js`
- Tailwind CSS: `https://cdn.tailwindcss.com`

### Converting TSX to HTML
To convert TSX files to standalone HTML (like the other games):

1. Replace `import` statements with CDN script tags
2. Replace lucide-react icons with inline SVG
3. Wrap component in `<script type="text/babel">` tags
4. Add `ReactDOM.createRoot(document.getElementById('root')).render(<Component />);`

## 📊 Game Statistics

- **Total Lines of Code:** ~3,000
- **Number of Games:** 5
- **Languages Supported:** 2 (Icelandic, English)
- **Total Questions/Compounds:** 100+
- **Chemistry Topics Covered:** Nomenclature, Unit Conversion, Stoichiometry, Molar Mass, Solution Chemistry

## 🎓 Target Audience

- First-year chemistry students (1. ár)
- Self-learners studying basic chemistry
- Teachers looking for interactive educational tools
- Students preparing for chemistry exams

## 🌟 Future Enhancements

Potential additions:
- [ ] Backend for score persistence
- [ ] User accounts and progress tracking
- [ ] Multiplayer mode
- [ ] Additional game types (electron configuration, Lewis structures, etc.)
- [ ] Mobile app version
- [ ] Offline PWA support
- [ ] More difficulty levels
- [ ] Customizable question sets

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Happy Learning! 🧪✨**
