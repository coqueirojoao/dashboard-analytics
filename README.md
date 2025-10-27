# Dashboard Analytics

A modern, full-stack analytics dashboard built with Next.js 16, TypeScript, and Tailwind CSS. This project demonstrates advanced data visualization, real-time updates, and clean architecture principles.

## Features

- Real-time data visualization with interactive charts
- Advanced filtering and search capabilities
- Export functionality (PDF/Excel)
- Responsive design for all devices
- Performance optimized with Redis caching
- Clean Architecture implementation

## Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js / Recharts** - Data visualization
- **Framer Motion** - Smooth animations

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database for flexible data
- **Redis** - Caching layer for performance

### Dev Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Conventional commits
- **Lint-staged** - Pre-commit checks

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- MongoDB instance
- Redis instance (optional)

### Installation

1. Clone the repository

```bash
git clone https://github.com/coqueirojoao/dashboard-analytics.git
cd dashboard-analytics
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dashboard-analytics/
├── app/                    # Next.js app directory
│   ├── (dashboard)/        # Dashboard routes
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── charts/             # Chart components
│   ├── filters/            # Filter components
│   └── ui/                 # UI components
├── lib/                    # Utility functions
├── types/                  # TypeScript types
└── public/                 # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test additions/changes
- `build:` - Build system changes
- `ci:` - CI/CD changes
- `chore:` - Other changes

## License

MIT

## Author

João Pedro - [GitHub](https://github.com/coqueirojoao)
