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
- MongoDB Atlas account (free tier)

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

3. Set up MongoDB Atlas

   a. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account

   b. Create a new cluster (M0 Free tier is perfect)

   c. Create a database user with read/write permissions

   d. Whitelist your IP or allow access from anywhere (0.0.0.0/0)

   e. Get your connection string from the MongoDB Atlas dashboard

4. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string_here
```

**Important**: Make sure to add `/dashboard-analytics` before the `?` in your connection string to specify the database name.

5. Seed the database with sample data

```bash
npm run seed
```

This will create sample data for analytics, revenue, traffic, sales, and user growth.

6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and import your repository

3. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL

4. Deploy!

The application will automatically work with MongoDB Atlas in production.

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
- `npm run seed` - Seed database with sample data
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
