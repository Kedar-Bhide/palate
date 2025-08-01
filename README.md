# Palate MVP - Track Your Culinary Journey

A web application that allows users to log different cuisines they've tried with photos and track their culinary exploration through a personal profile.

## Features

- **Google OAuth Authentication** - Secure sign-in with Google
- **Cuisine Logging** - Upload photos and log cuisines you've tried
- **Personal Profile** - View your culinary journey and statistics
- **Mobile-First Design** - Responsive interface for all devices
- **Real-time Updates** - Instant updates when logging new cuisines

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Firebase Auth** for authentication
- **Heroicons** for UI icons

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **PostgreSQL** database
- **Firebase Admin SDK** for auth verification
- **Firebase Storage** for image uploads
- **Multer** for file handling

### Database
- **PostgreSQL** with the following tables:
  - `users` - User profiles
  - `cuisines` - Predefined cuisine types
  - `cuisine_logs` - User's cuisine experiences

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (we recommend [Supabase](https://supabase.com) for free hosting)
- Firebase project for authentication and storage
- Google Cloud Console project for OAuth

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd palate
npm run install:all
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication → Sign-in method → Google
3. Enable Storage → Get started
4. Generate a service account key:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save the JSON file securely

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create/select your project
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `https://your-project-id.firebaseapp.com/__/auth/handler`

### 4. Database Setup

#### Using Supabase (Recommended - Free)

1. Create account at [Supabase](https://supabase.com)
2. Create new project
3. Go to SQL Editor and run:
   ```sql
   -- Copy contents from database/schema.sql
   -- Then copy contents from database/seed.sql
   ```
4. Get connection string from Settings → Database

#### Using Local PostgreSQL

1. Install PostgreSQL
2. Create database: `createdb palate_db`
3. Run schema: `psql palate_db < database/schema.sql`
4. Run seed data: `psql palate_db < database/seed.sql`

### 5. Environment Variables

#### Backend (.env)
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=your_postgresql_connection_string
FRONTEND_URL=http://localhost:3000
FIREBASE_SERVICE_ACCOUNT_KEY=your_firebase_service_account_json
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

#### Frontend (.env.local)
```bash
cp frontend/.env.local.example frontend/.env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### 6. Development

```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # Runs on http://localhost:3000
npm run dev:backend   # Runs on http://localhost:3001
```

## Deployment

### Frontend (Vercel - Free)

1. Push code to GitHub
2. Connect repository at [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Backend (Railway - Free)

1. Create account at [Railway](https://railway.app)
2. Create new project from GitHub repo
3. Add environment variables in Railway dashboard
4. Deploy automatically

### Database (Supabase - Free)

Database is already hosted if using Supabase. Update `DATABASE_URL` in production environment variables.

## Free Deployment Checklist

- [ ] Firebase project created (Free tier)
- [ ] Supabase database created (Free tier)  
- [ ] Google OAuth configured
- [ ] Backend deployed to Railway (Free tier)
- [ ] Frontend deployed to Vercel (Free tier)
- [ ] Environment variables configured
- [ ] Database schema and seed data applied
- [ ] Domain connected (optional)

## Project Structure

```
palate/
├── frontend/          # Next.js frontend
│   ├── src/
│   │   ├── app/       # App router pages
│   │   ├── components/# React components
│   │   ├── contexts/  # React contexts
│   │   ├── lib/       # Utilities
│   │   └── types/     # TypeScript types
├── backend/           # Express.js backend
│   ├── src/
│   │   ├── config/    # Database and Firebase config
│   │   ├── controllers/# Route controllers
│   │   ├── middleware/# Auth middleware
│   │   ├── models/    # Database models
│   │   ├── routes/    # API routes
│   │   └── types/     # TypeScript types
└── database/          # SQL schema and seed data
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login/register user
- `GET /api/auth/profile` - Get user profile

### Cuisines
- `GET /api/cuisines` - Get all cuisines
- `POST /api/cuisines/log` - Log new cuisine (with photo upload)
- `GET /api/cuisines/logs` - Get user's cuisine logs

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.