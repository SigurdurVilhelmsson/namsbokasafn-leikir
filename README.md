# ChemistryGames 🧪

An interactive collection of educational chemistry games designed for first-year chemistry students (1. ár). Built with React and Tailwind CSS, featuring bilingual support (Icelandic/English).

**Part of the Kvenno Efnafræði ecosystem** - Chemistry learning tools for Kvennaskólinn í Reykjavík

## 🚀 Current Status

**All games are production-ready!** All 5 chemistry games have been converted to standalone HTML files with Kvenno branding and are ready for deployment.

## Deployment

This repository is configured for deployment to **kvenno.app** at:
- **Production URL**: `https://kvenno.app/1-ar/games/`
- **Repository**: `chemistry-games-1ar`
- **Target Audience**: 1st year chemistry students
- **Deployment Status**: ✅ Ready for production

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
- **File:** `1. ár/molmassi.html`

### 5. **Lausnir** (Solution Lab)
- **Type:** Problem-solving game
- **Purpose:** Solve dilution, molarity, and solution mixing problems
- **Difficulty Levels:** Easy, Medium, Hard
- **File:** `1. ár/lausnir.html`

## 🚀 Quick Start

### Local Development
All games can be opened directly in any modern web browser - no build process required!

```bash
# Simply open any game in your browser:
open "1. ár/nafnakerfið.html"
open "1. ár/einingagreining.html"
open "1. ár/takmarkandi.html"
open "1. ár/molmassi.html"
open "1. ár/lausnir.html"

# Or serve with a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

**Note:** An internet connection is required for CDN-loaded dependencies (React, Tailwind CSS).

### Production Deployment to kvenno.app

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to kvenno.app.

## 🛠️ Technology Stack

- **React 18** - UI component library (loaded via CDN)
- **Tailwind CSS** - Utility-first CSS framework (loaded via CDN)
- **Babel Standalone** - JSX transpilation in browser
- **Inline SVG Icons** - Custom icons embedded in HTML

All games are standalone HTML files with no build process required. Dependencies are loaded from CDN for easy deployment.

## 📁 Project Structure

```
ChemistryGames/
├── LICENSE                    # MIT License
├── README.md                  # This file
├── DEPLOYMENT.md              # Deployment guide for kvenno.app
├── kvenno_structure.md        # Kvenno site structure and design system
├── index.html                 # Landing page with game selection
├── 404.html                   # Error page
└── 1. ár/                     # Year 1 Chemistry Games
    ├── nafnakerfið.html      # Compound Name Matchmaker
    ├── einingagreining.html  # Unit Conversion Race
    ├── takmarkandi.html      # Limiting Reactant Factory
    ├── molmassi.html         # Molar Mass Challenge
    ├── molmassi.tsx          # Source TSX file (reference)
    ├── lausnir.html          # Solution Lab
    └── lausnir.tsx           # Source TSX file (reference)
```

**Note:** The `.tsx` files are kept for reference but are no longer needed for deployment. All games use the `.html` versions.

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

### CDN Dependencies
All HTML files load dependencies from CDN:
- React 18: `https://unpkg.com/react@18/umd/react.production.min.js`
- React-DOM 18: `https://unpkg.com/react-dom@18/umd/react-dom.production.min.js`
- Babel Standalone: `https://unpkg.com/@babel/standalone/babel.min.js`
- Tailwind CSS: `https://cdn.tailwindcss.com`

### Design System
All games follow the Kvenno branding:
- **Primary Color:** `#f36b22` (Kvenno orange)
- **Header:** Consistent site header with "Kvenno Efnafræði" branding
- **Navigation:** Breadcrumbs and "Til baka" (Back) buttons
- **Button Style:** 2px solid border with 8px border radius

## 📊 Game Statistics

- **Total Lines of Code:** ~5,000+
- **Number of Games:** 5 (all production-ready)
- **Languages Supported:** 2 (Icelandic, English)
- **Total Questions/Compounds:** 100+
- **Chemistry Topics Covered:** Nomenclature, Unit Conversion, Stoichiometry, Molar Mass, Solution Chemistry
- **Deployment:** Standalone HTML - no build process required

## 🎓 Target Audience

- First-year chemistry students (1. ár)
- Self-learners studying basic chemistry
- Teachers looking for interactive educational tools
- Students preparing for chemistry exams

## 🌟 Recent Updates

- ✅ All TSX files converted to standalone HTML
- ✅ Kvenno branding applied to all games
- ✅ Consistent header and navigation across all pages
- ✅ Landing page with game selection
- ✅ Custom 404 error page
- ✅ All 5 games production-ready

## 🔮 Future Enhancements

Potential additions:
- [ ] Backend for score persistence
- [ ] User accounts and progress tracking
- [ ] Multiplayer mode
- [ ] Additional game types (electron configuration, Lewis structures, etc.)
- [ ] Mobile app version
- [ ] Offline PWA support
- [ ] More difficulty levels
- [ ] Customizable question sets
- [ ] Self-hosted CDN dependencies for better reliability

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Happy Learning! 🧪✨**
