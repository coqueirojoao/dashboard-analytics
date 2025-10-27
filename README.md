# Dashboard Analytics

A modern, full-stack analytics dashboard built with Next.js 16, TypeScript, and MongoDB Atlas. Features interactive data visualizations, real-time metrics, and responsive design.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)

## Features

- **Interactive Charts**: Line, bar, area, and pie charts with Recharts
- **Real-time Metrics**: Key business metrics with growth indicators
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for polished user experience
- **Dark Mode Support**: Full theming support with next-themes
- **Loading States**: Professional skeleton screens during data fetching
- **Data Refresh**: Manual refresh button to reload dashboard data
- **MongoDB Integration**: Cloud-based database with MongoDB Atlas
- **REST API**: Well-structured API routes for data management

## Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router and Turbopack
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Interactive data visualization library
- **Framer Motion** - Animation library
- **next-themes** - Dark mode support
- **Lucide React** - Modern icon library

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** - MongoDB object modeling

### Dev Tools

- **ESLint** - Code linting with Next.js rules
- **Prettier** - Consistent code formatting
- **Husky** - Git hooks for quality checks
- **Commitlint** - Conventional commit enforcement
- **Lint-staged** - Run linters on staged files
- **tsx** - TypeScript execution for scripts

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- MongoDB Atlas account (free tier available)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/coqueirojoao/dashboard-analytics.git
cd dashboard-analytics
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up MongoDB Atlas**

   a. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

   b. Create a new cluster (M0 Free tier is sufficient)

   c. Create a database user with read/write permissions

   d. Add your IP to the whitelist or allow access from anywhere (0.0.0.0/0)

   e. Get your connection string from the MongoDB Atlas dashboard

   f. Make sure to add `/dashboard-analytics` before the `?` to specify the database name

4. **Configure environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
MONGODB_URI=your_mongodb_connection_string_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. **Seed the database**

Populate your database with sample data:

```bash
npm run seed
```

This creates:

- Analytics metrics (users, revenue, conversion rate, AOV)
- Revenue data for 2023-2024
- Traffic sources (organic, direct, referral)
- Sales distribution by category
- User growth data

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
dashboard-analytics/
├── app/                           # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── analytics/            # Analytics metrics endpoint
│   │   ├── revenue/              # Revenue data endpoint
│   │   ├── traffic/              # Traffic sources endpoint
│   │   ├── sales/                # Sales distribution endpoint
│   │   └── user-growth/          # User growth endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Main dashboard page
├── components/
│   ├── charts/                   # Chart components
│   │   ├── AreaChart.tsx         # Area chart for trends
│   │   ├── BarChart.tsx          # Bar chart for comparisons
│   │   ├── LineChart.tsx         # Line chart for time series
│   │   └── PieChart.tsx          # Pie chart for distributions
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── ChartCard.tsx         # Chart wrapper with title
│   │   ├── ChartCardSkeleton.tsx # Loading state for charts
│   │   ├── MetricCard.tsx        # Metric display with growth
│   │   └── MetricCardSkeleton.tsx # Loading state for metrics
│   ├── layout/                   # Layout components
│   │   └── Footer.tsx            # Footer with project info
│   ├── providers/                # Context providers
│   │   └── theme-provider.tsx   # Theme/dark mode provider
│   └── ui/                       # Reusable UI components
│       └── Skeleton.tsx          # Base skeleton component
├── lib/
│   ├── api/                      # API client functions
│   │   └── dashboard.ts          # Dashboard data fetching
│   └── db/                       # Database layer
│       ├── models/               # Mongoose models
│       │   ├── Analytics.ts
│       │   ├── Revenue.ts
│       │   ├── Sales.ts
│       │   ├── Traffic.ts
│       │   └── UserGrowth.ts
│       ├── mongodb.ts            # MongoDB connection with caching
│       └── seed.ts               # Database seeding script
├── types/                        # TypeScript type definitions
│   └── dashboard.ts              # Dashboard data types
└── public/                       # Static assets
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Auto-fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Deployment

### Deploy to Vercel

1. **Push to GitHub**

Make sure your code is pushed to GitHub.

2. **Import to Vercel**

- Go to [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import your repository

3. **Configure Environment Variables**

Add these in the Vercel dashboard:

```
MONGODB_URI=your_mongodb_atlas_connection_string
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

4. **Deploy**

Click "Deploy" and wait for the build to complete.

5. **Update URL**

After deployment, update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL and redeploy.

## Data Models

### Analytics

- Total users
- Total revenue
- Conversion rate
- Average order value
- Growth metrics

### Revenue

- Monthly revenue data
- Year-over-year comparison
- Revenue trends

### Traffic

- Daily traffic by source
- Organic vs Direct vs Referral
- Day-of-week patterns

### Sales

- Sales by category
- Distribution percentages
- Category performance

### User Growth

- Monthly new users
- Growth trends
- User acquisition patterns

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test additions or changes
- `build:` - Build system changes
- `ci:` - CI/CD configuration changes
- `chore:` - Other changes that don't modify src or test files

## License

MIT

## Author

**João Pedro Cogueiro de Azevedo**

- GitHub: [@coqueirojoao](https://github.com/coqueirojoao)
- Portfolio: [João Pedro's Portfolio]([https://your-portfolio-url.com](https://portfolio-coqueiro.vercel.app/pt))

---

Built with Next.js 16, TypeScript, and MongoDB Atlas
