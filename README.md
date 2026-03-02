# BlogApp - Production-Ready Blog Web Application

A modern, responsive blog platform built with React + Vite, Redux Toolkit, Context API, and Tailwind CSS. Features a clean grayscale design with smooth animations, theme switching, and full CRUD functionality.

## 🌐 Live Demo

**Deployed on Azure Static Web Apps**: Coming soon after you complete deployment!

## 🚀 Features

- **Redux Toolkit** for state management (blog CRUD operations)
- **Context API** for theme switching (light/dark grayscale themes)
- **Tailwind CSS** for responsive, mobile-first design
- **LocalStorage** persistence for blogs and theme preference
- **Modern UI/UX** with smooth animations and transitions
- **Fully Responsive** design with no horizontal scrolling
- **Azure Static Web Apps** deployment ready
- **Docker-ready** for easy containerized deployment
- **CI/CD** with GitHub Actions

## 📋 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS (grayscale palette only)
- **Theme Management**: React Context API
- **Persistence**: LocalStorage
- **Containerization**: Docker + Nginx

## 🏗️ Project Structure

```
src/
 ├── app/
 │    └── store.js                 # Redux store configuration
 ├── features/
 │    └── blog/
 │         ├── blogSlice.js        # Blog state & actions
 │         └── blogSelectors.js    # Memoized selectors
 ├── context/
 │    └── ThemeContext.jsx         # Theme management
 ├── components/
 │    ├── Header.jsx               # App header (25vh)
 │    ├── AddBlogModal.jsx         # Create blog modal
 │    ├── ViewBlogModal.jsx        # View/Edit blog modal
 │    ├── BlogCard.jsx             # Blog card component
 │    ├── SearchBar.jsx            # Expandable search
 │    └── ThemeToggle.jsx          # Theme toggle button
 ├── pages/
 │    └── Landing.jsx              # Main landing page
 ├── hooks/
 │    └── useLocalStorage.js       # LocalStorage hook
 ├── App.jsx                       # Root component
 ├── main.jsx                      # Entry point
 └── index.css                     # Global styles
```

## 🎨 UI Features

### Welcome Animation
- 2-second fade + slide animation on app load
- "Welcome to BlogPage" centered text
- Auto-dismisses after display

### Header (25vh)
- BlogApp logo/title
- Compose button (opens add blog modal)
- Expandable search bar
- Theme toggle button (light/dark)

### Blog Cards
- Alternating grayscale shading (cards 1,3,5 darker / 2,4,6 lighter)
- Profile circle with first letter of title
- Date/time display
- Title and description preview
- View button with hover effects

### Add Blog Modal (80vh x 90vw)
- Title input field
- Description textarea with placeholder
- Main content textarea (scrollable)
- Post button
- Close confirmation if unsaved data

### View Blog Modal (90vh x 90vw)
- Like button (toggleable heart icon)
- Edit button (enables edit mode)
- Delete button (with confirmation)
- Close button (top-left)
- Edit mode with Save/Discard options
- Full blog content display

### Search Functionality
- Expandable modern search bar
- Real-time filtering by title/description
- Clear search button when active

### Theme System
- Light mode: light grays and whites
- Dark mode: deep blacks and dark grays
- Smooth transitions between themes
- Persisted in localStorage
- Toggle with sun/moon icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker (optional, for containerized deployment)

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t blog-web-app .
```

### Run Docker Container

```bash
docker run -d -p 80:80 --name blog-app blog-web-app
```

The app will be available at `http://localhost`

### Stop Container

```bash
docker stop blog-app
docker rm blog-app
```

## ☁️ Azure Static Web Apps Deployment

This application is ready for deployment to Azure Static Web Apps with automated CI/CD.

### Quick Deploy to Azure

**Option 1: Azure Portal (Recommended)**
1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new Static Web App
3. Connect to GitHub repository: `SahilDevli/Blog-App`
4. Set build configuration:
   - App location: `/`
   - Output location: `dist`
5. Deploy automatically via GitHub Actions

**Option 2: Azure CLI**
```bash
# Run the deployment script
.\deploy-azure.ps1
```

**Option 3: Manual CLI**
```bash
az staticwebapp create \
  --name blog-web-app \
  --resource-group blog-app-rg \
  --source https://github.com/SahilDevli/Blog-App \
  --location eastus2 \
  --branch main \
  --app-location "/" \
  --output-location "dist"
```

📖 **For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

The GitHub Actions workflow is already configured at `.github/workflows/azure-static-web-apps.yml`

## 📱 Responsive Design

- **Mobile-first** approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- No horizontal scrolling on any device
- Touch-friendly UI elements

## 🎯 Key Functionalities

### Blog Operations
- **Create**: Add new blog with title, description, and content
- **Read**: View full blog with formatted content
- **Update**: Edit existing blog posts
- **Delete**: Remove blogs with confirmation
- **Like**: Toggle like status on blogs

### Data Persistence
- All blogs saved to localStorage automatically
- Theme preference persisted
- Data loads on app initialization
- Real-time sync between Redux and localStorage

### Search & Filter
- Live search across all blogs
- Searches in title and description
- Case-insensitive matching
- Instant results display

## 🎨 Design System

### Grayscale Palette
- `gray-50` to `gray-950` (Tailwind's extended gray scale)
- Light theme: Primarily gray-50 to gray-400
- Dark theme: Primarily gray-600 to gray-950
- High contrast for accessibility

### Animations
- Fade in/out: `animate-fade-in`
- Slide up: `animate-slide-up`
- Scale in: `animate-scale-in`
- Hover effects: `scale-105`, `shadow-xl`
- Smooth transitions: `duration-300`, `ease-in-out`

## 🔧 Configuration Files

- **vite.config.js**: Vite configuration with React plugin
- **tailwind.config.js**: Custom grayscale palette and animations
- **postcss.config.js**: Tailwind CSS processing
- **.eslintrc.cjs**: ESLint rules for code quality
- **nginx.conf**: Nginx configuration for Docker deployment
- **Dockerfile**: Multi-stage build for production

## 📦 Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Best Practices Implemented

- **Component-based architecture** for reusability
- **Redux Toolkit** for predictable state management
- **Memoized selectors** for performance optimization
- **LocalStorage hook** for abstracted persistence
- **Context API** for theme management
- **Mobile-first responsive** design
- **Accessibility** considerations (ARIA labels)
- **Error handling** for localStorage operations
- **User confirmations** for destructive actions
- **Clean code** with comments and documentation

## 🚀 Performance Optimizations

- Vite for fast HMR and optimized builds
- Redux memoized selectors prevent unnecessary re-renders
- Tailwind's JIT compiler for minimal CSS
- Gzip compression in nginx
- Static asset caching
- Lazy loading where applicable

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project as a template for your own blog applications!

---

**Built with ❤️ using React, Vite, Redux Toolkit, and Tailwind CSS**
