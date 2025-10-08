# Khushi Portfolio ✨

A stunning, modern portfolio website inspired by [shreej.al](https://shreej.al/) with advanced animations, custom cursor effects, and smooth scroll-triggered animations. Built with Next.js, Vite, Tailwind CSS, and GSAP.

## 🌟 Features

### 🎨 **Visual Design**

- **Dark Theme**: Modern dark background with gradient accents
- **Custom Cursor**: Interactive cursor with hover effects and "View" text
- **Glitch Animations**: Text glitch effects on hero name
- **Gradient Text**: Animated gradient text with smooth color transitions
- **Glass Morphism**: Modern glass-effect cards and elements
- **Particle Effects**: Dynamic particle animations on hover

### 🚀 **Animations & Interactions**

- **GSAP Animations**: Smooth, professional animations throughout
- **Scroll Triggers**: Elements animate as you scroll
- **Hover Effects**: Interactive hover states with lift and glow effects
- **Magnetic Elements**: Elements that respond to mouse movement
- **Staggered Animations**: Sequential element animations for visual flow
- **Footer Character Fill**: Animated character reveal in footer

### 📱 **Responsive Design**

- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Perfect touch interactions on mobile
- **Adaptive Layout**: Layout adjusts beautifully across devices
- **Performance Optimized**: Fast loading and smooth animations

## 🚀 Tech Stack

- **React 19** - Latest React with concurrent features
- **Next.js 15** - Full-stack React framework
- **Vite 7** - Lightning-fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional-grade animations
- **PostCSS** - CSS processing and optimization

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

### Next.js Development Server

```bash
npm run dev
```

Runs the Next.js development server on [http://localhost:3000](http://localhost:3000)

### Vite Development Server

```bash
npm run vite:dev
```

Runs the Vite development server on [http://localhost:3000](http://localhost:3000)

## 🏗️ Building for Production

### Next.js Build

```bash
npm run build
npm run start
```

### Vite Build

```bash
npm run vite:build
npm run vite:preview
```

## 📁 Project Structure

```
khushi-portfolio/
├── src/
│   ├── pages/              # Next.js pages
│   │   ├── _app.tsx        # App component with global styles
│   │   └── index.tsx       # Main portfolio page
│   ├── styles/             # Styling files
│   │   ├── globals.css     # Global styles with Tailwind
│   │   ├── App.css         # Legacy styles for Vite
│   │   └── index.css       # Base styles
│   ├── App.tsx             # Main Vite component
│   └── main.tsx            # Vite entry point
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Design System

### Colors

- **Brand Dark**: `#0a0a0a` - Main background
- **Brand Light**: `#ffffff` - Primary text
- **Brand Gray**: `#a1a1aa` - Secondary text
- **Brand Green**: `#39ff14` - Accent color
- **Brand Purple**: `#6366f1` - Gradient start
- **Brand Pink**: `#ec4899` - Gradient end

### Typography

- **Primary**: System fonts (SF Pro, Segoe UI, etc.)
- **Mono**: Fira Code - For code elements
- **Display**: UnifrakturCook - For special headings

### Animations

- **Fade In Up**: Elements slide up and fade in
- **Glitch**: Text glitch effect with random characters
- **Gradient**: Animated gradient background
- **Hover Lift**: Elements lift on hover
- **Hover Glow**: Glowing effect on hover

## 🔧 Configuration

### Tailwind CSS

- Custom color palette
- Custom animations and keyframes
- Responsive breakpoints
- Typography plugin

### GSAP

- ScrollTrigger for scroll-based animations
- Timeline animations for complex sequences
- Custom easing functions
- Performance-optimized animations

### TypeScript

- Strict mode enabled
- Path aliases for clean imports
- Full type safety

## 🚀 Deployment

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Netlify (For Vite builds)

1. Build the project: `npm run vite:build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Other Platforms

- **GitHub Pages**: Use Vite build
- **AWS S3**: Static hosting
- **Firebase Hosting**: Google's hosting platform

## 📝 Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js for production
- `npm run start` - Start Next.js production server
- `npm run lint` - Run ESLint
- `npm run vite:dev` - Start Vite development server
- `npm run vite:build` - Build with Vite
- `npm run vite:preview` - Preview Vite build

## 🎯 Key Features Explained

### Custom Cursor

- Follows mouse movement with smooth interpolation
- Changes size and color on hover
- Shows "View" text for interactive elements
- Disabled on mobile for better touch experience

### Glitch Effect

- Random character generation during animation
- Smooth transition to original text
- Triggered on page load for hero name
- CSS-based with JavaScript control

### Scroll Animations

- Elements animate as they enter viewport
- Staggered animations for visual flow
- Smooth scroll-triggered reveals
- Performance-optimized with GSAP

### Responsive Design

- Mobile-first approach
- Adaptive typography scaling
- Touch-friendly interactions
- Optimized for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Inspired by [shreej.al](https://shreej.al/) design
- Built with modern web technologies
- Optimized for performance and accessibility
- Mobile-first responsive design

---

**Made with ❤️ by Khushi Gandhi**
# khushi-vijay-portfolio
