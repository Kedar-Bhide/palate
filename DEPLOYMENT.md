# Palate MVP - Deployment Guide

This guide will walk you through deploying the Palate MVP for free using modern cloud services.

## Deployment Architecture

- **Frontend**: Vercel (Free tier)
- **Backend**: Railway (Free tier) 
- **Database**: Supabase PostgreSQL (Free tier)
- **Authentication**: Firebase Auth (Free tier)
- **File Storage**: Firebase Storage (Free tier)

## Step-by-Step Deployment

### 1. Database Setup (Supabase)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub
   - Create new project

2. **Setup Database**
   - Go to SQL Editor in your Supabase dashboard
   - Copy and run the contents of `database/schema.sql`
   - Copy and run the contents of `database/seed.sql`
   - Note down your connection string from Settings → Database

### 2. Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project
   - Choose a unique project ID (e.g., `palate-mvp-yourname`)

2. **Enable Authentication**
   - Go to Authentication → Sign-in method
   - Enable Google provider
   - Add your domain to authorized domains later

3. **Enable Storage**
   - Go to Storage → Get started
   - Start in test mode
   - Choose a location

4. **Generate Service Account**
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - **IMPORTANT**: Save this JSON file securely - you'll need it

5. **Get Firebase Config**
   - Go to Project Settings → General
   - Scroll down to "Your apps"
   - Add web app if not already created
   - Copy the config object

### 3. Google OAuth Setup

1. **Google Cloud Console**
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Select your Firebase project (or create if different)
   - Enable Google+ API (may be deprecated, use Google Identity API)

2. **Create OAuth Credentials**
   - Go to APIs & Services → Credentials
   - Create OAuth 2.0 Client ID
   - Application type: Web application
   - Add authorized redirect URIs:
     - `https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler`
     - `http://localhost:3000` (for development)

### 4. Backend Deployment (Railway)

1. **Prepare Repository**
   - Push your code to GitHub
   - Ensure `backend/Procfile` exists with: `web: npm run build && npm start`

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Create new project from GitHub repo
   - Select your repository

3. **Configure Environment Variables**
   Add these variables in Railway dashboard:
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=[your_supabase_connection_string]
   FRONTEND_URL=[your_vercel_url_or_custom_domain]
   FIREBASE_SERVICE_ACCOUNT_KEY=[paste_entire_json_service_account_here]
   FIREBASE_STORAGE_BUCKET=[your-project-id.appspot.com]
   ```

4. **Deploy**
   - Railway will automatically build and deploy
   - Note the generated Railway URL

### 5. Frontend Deployment (Vercel)

1. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Set build settings:
     - Build command: `cd frontend && npm run build`
     - Output directory: `frontend/.next`
     - Install command: `npm run install:all`

2. **Configure Environment Variables**
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=[from_firebase_config]
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=[your-project-id.firebaseapp.com]
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=[your-project-id]
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=[your-project-id.appspot.com]
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=[from_firebase_config]
   NEXT_PUBLIC_FIREBASE_APP_ID=[from_firebase_config]
   NEXT_PUBLIC_API_BASE_URL=https://[your-railway-url]/api
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Note your Vercel URL

### 6. Final Configuration

1. **Update Firebase Auth Domains**
   - Go back to Firebase Console → Authentication → Settings
   - Add your Vercel domain to authorized domains

2. **Update CORS Settings**
   - Update `FRONTEND_URL` in Railway environment variables
   - Redeploy backend if needed

3. **Test the Application**
   - Visit your Vercel URL
   - Test Google sign-in
   - Test logging a cuisine
   - Check if photos upload properly

## Cost Breakdown (All Free Tiers)

- **Vercel**: 100GB bandwidth, unlimited requests
- **Railway**: 500 hours, $5 credit monthly  
- **Supabase**: 2 organizations, 500MB database
- **Firebase**: 10GB storage, 20K auth users

## Custom Domain (Optional)

1. **Purchase Domain**: Use Namecheap, GoDaddy, etc.
2. **Vercel**: Add domain in project settings
3. **Railway**: Add custom domain in project settings
4. **Update URLs**: Update environment variables with new domains

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is correctly set in backend
   - Check Firebase authorized domains

2. **Build Failures**
   - Check all environment variables are set
   - Ensure Node.js version compatibility

3. **Database Connection Issues**
   - Verify Supabase connection string
   - Check if database is running

4. **File Upload Issues**
   - Verify Firebase Storage rules
   - Check service account permissions

### Environment Variables Checklist

**Backend (Railway)**:
- [ ] NODE_ENV=production
- [ ] DATABASE_URL
- [ ] FRONTEND_URL  
- [ ] FIREBASE_SERVICE_ACCOUNT_KEY
- [ ] FIREBASE_STORAGE_BUCKET

**Frontend (Vercel)**:
- [ ] NEXT_PUBLIC_FIREBASE_API_KEY
- [ ] NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- [ ] NEXT_PUBLIC_FIREBASE_PROJECT_ID
- [ ] NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- [ ] NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- [ ] NEXT_PUBLIC_FIREBASE_APP_ID
- [ ] NEXT_PUBLIC_API_BASE_URL

## Security Notes

- Never commit `.env` files
- Use environment variables for all secrets
- Service account keys should be stored securely
- Regularly rotate access keys
- Monitor usage to stay within free tiers

## Monitoring

- **Vercel**: Built-in analytics and monitoring
- **Railway**: Resource usage in dashboard
- **Supabase**: Database metrics in dashboard
- **Firebase**: Usage quotas in console

## Scaling Considerations

When you outgrow free tiers:
- **Database**: Upgrade Supabase or migrate to AWS RDS
- **Backend**: Upgrade Railway or migrate to AWS/GCP
- **Storage**: Consider AWS S3 or Cloudinary
- **CDN**: Add Cloudflare for better performance