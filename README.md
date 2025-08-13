# Personal Resume Website

A modern, responsive personal resume and portfolio website built with Next.js, TypeScript, and Material-UI.

## Features

- 🎨 Modern, responsive design with Material-UI
- 📱 Mobile-first approach
- 🌙 Dark/Light theme support
- ⚡ Fast static site generation
- 📄 Professional resume presentation
- 🎯 Skills and timeline showcase
- 📧 Contact form integration
- 🎮 Interactive Tic-Tac-Toe game

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Material-UI (MUI) v7
- **Deployment**: GitHub Pages (Static Export)
- **Build Tool**: Next.js Static Export

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/maryskolos/maryskolos.github.io.git
cd maryskolos.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To build the static site for GitHub Pages:

```bash
npm run export
```

This will generate a static site in the `out/` directory.

## GitHub Pages Deployment

This website is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Repository Setup**: 
   - Rename your repository to `maryskolos.github.io`
   - This special name automatically deploys to the root domain

2. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"

3. **Push to main branch** - The GitHub Action will automatically:
   - Build the static site
   - Deploy to GitHub Pages
   - Make it available at `https://maryskolos.github.io`

### Manual Deployment

If you prefer manual deployment:

1. Build the site: `npm run export`
2. Push the `out/` folder to the `gh-pages` branch
3. Configure GitHub Pages to use the `gh-pages` branch

## Configuration

### Base Path

The site is configured for root domain deployment:
- **Development**: No base path (localhost:3000)
- **Production**: No base path (maryskolos.github.io)

### Custom Domain

To use a custom domain:
1. Add your domain to the GitHub Pages settings
2. Update the `cname` field in `.github/workflows/deploy.yml`
3. Update the metadata URLs in `src/app/layout.tsx`
4. Add a `CNAME` file in your `public` folder with your domain

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/          # React components
├── constants/           # Theme and constants
├── styles/             # Common styles
└── utils/              # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Build static site for GitHub Pages
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub.
