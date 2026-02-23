# Finance Tracker

A modern, full-featured personal finance tracking application built with Next.js, TypeScript, and Prisma. Track your expenses, manage income, visualize spending trends, and gain insights into your financial habits.

## Features

- **Expense Tracking**: Log and categorize expenses with detailed descriptions
- **Income Management**: Track monthly income from various sources
- **Data Visualization**: Interactive charts and graphs to analyze spending patterns
- **Custom Categories**: Create and manage expense categories with custom colors and icons
- **Monthly Overview**: View financial summaries by month and year
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS and Radix UI
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Fast, reactive UI with optimistic updates

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/), [Recharts](https://recharts.org/), [Plotly.js](https://plotly.com/javascript/)
- **State Management**: [React Query](https://tanstack.com/query), [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Date Handling**: [date-fns](https://date-fns.org/)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** (version 12 or higher)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd finance_tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

   Add the following environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/finance_tracker?schema=public"

   # Optional: Adjust based on your PostgreSQL setup
   # DATABASE_URL="postgresql://user:password@host:port/database"
   ```

   Replace `username`, `password`, and database details with your PostgreSQL credentials.

4. **Set up the database**:
   
   Run Prisma migrations to create the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

   Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

5. **Seed the database (optional)**:
   
   If you have a seed script, run:
   ```bash
   npm run seed
   ```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

Build the application for production:
```bash
npm run build
npm run start
```

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── categories/      # Category management endpoints
│   │   ├── expenses/        # Expense management endpoints
│   │   └── income/          # Income management endpoints
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # Reusable UI components (Radix UI)
│   ├── category-manager.tsx
│   ├── dashboard-client.tsx
│   ├── dashboard-stats.tsx
│   ├── expense-form.tsx
│   ├── expense-list.tsx
│   ├── expense-trend-chart.tsx
│   ├── income-form.tsx
│   ├── month-selector.tsx
│   └── spending-chart.tsx
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and configurations
│   ├── db.ts               # Database client
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Helper functions
├── prisma/                  # Prisma configuration
│   └── schema.prisma       # Database schema
├── public/                  # Static assets
├── components.json          # Shadcn UI configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Database Schema

The application uses three main models:

### Category
- Stores expense categories with custom colors and icons
- Can be system-defined or user-created

### Expense
- Tracks individual expenses
- Links to a category
- Includes amount, description, and date

### Income
- Tracks monthly income
- Supports multiple income sources
- Unique per month/year combination

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma generate` - Generate Prisma Client

## Development

### Adding New Features

1. **Database changes**: Update `prisma/schema.prisma` and run migrations
2. **API routes**: Add new routes in `app/api/`
3. **Components**: Create new components in `components/`
4. **Types**: Update TypeScript types in `lib/types.ts`

### Prisma Studio

View and edit your database with Prisma Studio:
```bash
npx prisma studio
```

Access it at [http://localhost:5555](http://localhost:5555)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify PostgreSQL is running:
   ```bash
   sudo systemctl status postgresql
   # or
   brew services list
   ```

2. Check your `DATABASE_URL` in `.env`
3. Ensure the database exists:
   ```bash
   createdb finance_tracker
   ```

### Prisma Issues

If Prisma Client is out of sync:
```bash
npx prisma generate
```

If migrations fail:
```bash
npx prisma migrate reset
npx prisma migrate dev
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Prisma](https://www.prisma.io/)
