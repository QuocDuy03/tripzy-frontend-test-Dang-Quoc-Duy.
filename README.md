This is a [Next.js](https://nextjs.org) project - Tripzy Travel Booking Platform

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
# or
bun run build
bun start
```

## Architecture & Technical Stack

### Frontend Framework
- **Next.js 16.0.3** with App Router
- **TypeScript**

### UI & Styling
- **Material-UI (MUI)** 
- **Tailwind CSS** 
- **Nunito Sans Font** 

### Form Management & Validation
- **React Hook Form** 
- **Yup** 

## Project Architecture

```
app/
├── components/           # Reusable UI components
│   ├── TabSection       # Tab navigation for service types
│   ├── SearchForm       # Main search form
│   ├── LocationSelector # From/To location selection
│   ├── DateSelector     # Date range picker
│   ├── PassengerSelector # Passenger count
│   └── TwoMonthsPicker  # Dual-month calendar
├── types/               # TypeScript interfaces
├── schemas/             # Validation schemas
├── utils/               # Utility functions
└── search/              # Search results page
```

## Key Technical Decisions

1. **Component Decomposition** - Modular components for better maintainability
2. **Custom Theme** - Primary color (#19C0FF) in Tailwind and MUI
3. **URL-based Search** - Search parameters in URL for shareable results
4. **Weekend Highlighting** - Calendar highlights weekends
5. **Disabled Option Logic** - Prevent duplicate location selections
6. **Form Reset on Tab Change** - Clear state when switching services

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Hook Form Documentation](https://react-hook-form.com)

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

**Demo Link**: [Vercel](https://tripzy-frontend-test-dang-quoc-duy.vercel.app)
