# Palate MVP - Deployment Guide

This guide will walk you through deploying the Palate MVP for **100% FREE** using modern cloud services. Each step includes screenshots references and exact clicks.

## ✅ Confirmed Free Services Used

- **Frontend**: Vercel (Free forever - 100GB bandwidth)
- **Backend**: Railway (Free $5 monthly credit) 
- **Database**: Supabase PostgreSQL (Free 500MB)
- **Authentication**: Firebase Auth (Free 10K users/month)
- **File Storage**: Firebase Storage (Free 1GB storage, 10GB transfer/month)

## 🚀 Complete Step-by-Step Setup

### STEP 1: Database Setup (Supabase) - 5 minutes

**1.1 Create Account**
1. Open browser and go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** green button
3. Click **"Continue with GitHub"** (recommended) OR **"Sign up with email"**
4. If GitHub: Click **"Authorize supabase"** when popup appears
5. You'll see the Supabase dashboard

**1.2 Create Project**
1. Click **"+ New project"** button
2. Choose your organization (usually your GitHub username)
3. Fill in:
   - **Project name**: `palate-mvp` (or any name you want)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you (e.g., "US East" for America)
4. Click **"Create new project"** 
5. ⏳ Wait 2-3 minutes for setup (you'll see a progress screen)

**1.3 Setup Database Schema**
1. When project is ready, you'll see the dashboard
2. On left sidebar, click **"SQL Editor"**
3. Click **"+ New query"** button
4. Delete any default text in the editor
5. Open your local file `database/schema.sql`
6. Copy ALL contents and paste into Supabase SQL editor
7. Click **"Run"** button (or Ctrl/Cmd + Enter)
8. You should see ✅ "Success. No rows returned" message

**1.4 Add Seed Data**
1. Click **"+ New query"** again
2. Open your local file `database/seed.sql` 
3. Copy ALL contents and paste into the new query
4. Click **"Run"** button
5. You should see ✅ "Success" with message showing 37 rows inserted

**1.5 Get Connection String**
1. Click **"Settings"** in left sidebar (gear icon)
2. Click **"Database"** in the settings menu
3. Scroll down to **"Connection string"** section
4. Copy the **"URI"** connection string (starts with `postgresql://`)
5. **IMPORTANT**: Replace `[YOUR-PASSWORD]` in the string with your actual database password
6. Save this connection string - you'll need it later!

### STEP 2: Firebase Setup (Authentication & Storage) - 8 minutes

**2.1 Create Firebase Project**
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Create a project"** button
3. **Step 1 of 3**: 
   - Project name: Enter `palate-mvp-YOURNAME` (replace YOURNAME with your name)
   - Click **"Continue"**
4. **Step 2 of 3**: 
   - Google Analytics: Toggle **OFF** (we don't need it for MVP)
   - Click **"Create project"**
5. **Step 3 of 3**: 
   - ⏳ Wait for "Your new project is ready" (30 seconds)
   - Click **"Continue"**

**2.2 Add Web App**
1. You'll see the Firebase project dashboard
2. Click the **"</>"** (Web) icon in the center
3. **Register app**:
   - App nickname: `palate-web`
   - Firebase Hosting: ❌ **Leave UNCHECKED**
   - Click **"Register app"**
4. **Add Firebase SDK**:
   - You'll see a code snippet with `firebaseConfig`
   - **COPY THIS ENTIRE CONFIG OBJECT** - save it in a notepad
   - It should look like:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "palate-mvp-yourname.firebaseapp.com",
     projectId: "palate-mvp-yourname",
     storageBucket: "palate-mvp-yourname.appspot.com",
     messagingSenderId: "123...",
     appId: "1:123..."
   };
   ```
   - Click **"Continue to console"**

**2.3 Enable Authentication**
1. In left sidebar, click **"Authentication"**
2. Click **"Get started"** button
3. Click **"Sign-in method"** tab at the top
4. Find **"Google"** in the list and click on it
5. Toggle **"Enable"** to ON
6. **Project support email**: Select your email from dropdown
7. Click **"Save"**
8. You should see ✅ Google is now "Enabled"

**2.4 Enable Storage (FREE TIER CONFIRMED)**
1. In left sidebar, click **"Storage"**
2. Click **"Get started"** button
3. **Secure rules popup**:
   - You'll see "Start in test mode" (this is what we want)
   - Click **"Next"**
4. **Cloud Storage location**:
   - Choose closest region (e.g., "us-central1" for US)
   - Click **"Done"**
5. ⏳ Wait for setup (30 seconds)
6. You should see the Storage dashboard with "gs://palate-mvp-yourname.appspot.com"

**2.5 Generate Service Account Key**
1. Click **"Project Settings"** (gear icon next to "Project Overview")
2. Click **"Service accounts"** tab
3. Click **"Generate new private key"** button
4. **Popup warning**: Click **"Generate key"**
5. A JSON file will download automatically
6. **CRITICAL**: Save this file securely - rename it to `service-account-key.json`
7. Open the file in text editor and copy ALL contents - you'll need this later

### STEP 3: Google OAuth Setup - 5 minutes

**3.1 Access Google Cloud Console**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. **Project selector**: Click dropdown at top (next to "Google Cloud")
3. You should see your Firebase project `palate-mvp-yourname` in the list
4. Click on it to select
5. If you don't see it, click **"ALL"** tab and look for it

**3.2 Enable Required APIs**
1. In left sidebar, click **"APIs & services"**
2. Click **"Library"**
3. Search for **"Google Identity"**
4. Click **"Google Identity Toolkit API"**
5. Click **"Enable"** (if not already enabled)
6. Go back and search for **"Identity and Access Management"**
7. Click **"Identity and Access Management (IAM) API"**
8. Click **"Enable"** if needed

**3.3 Configure OAuth Consent Screen**
1. Go to **"APIs & services"** → **"OAuth consent screen"**
2. **User Type**: Select **"External"**
3. Click **"Create"**
4. **App information**:
   - App name: `Palate`
   - User support email: Your email
   - App logo: Skip for now
5. **App domain**: Leave empty for now
6. **Developer contact**: Your email
7. Click **"Save and continue"**
8. **Scopes**: Click **"Save and continue"** (no changes needed)
9. **Test users**: Click **"Save and continue"** (no changes needed)

**3.4 Create OAuth Credentials** 
1. Go to **"APIs & services"** → **"Credentials"**
2. Click **"+ Create credentials"**
3. Select **"OAuth 2.0 Client IDs"**
4. **Application type**: **"Web application"**
5. **Name**: `Palate Web Client`
6. **Authorized redirect URIs**: Click **"+ Add URI"**
   - Add: `https://palate-mvp-yourname.firebaseapp.com/__/auth/handler`
   - Replace `yourname` with your actual project name
7. Click **"Create"**
8. **Popup with credentials**: Click **"OK"** (we don't need to copy these)

### STEP 4: Setup Environment Files - 3 minutes

**4.1 Create Backend Environment File**
1. In your project folder, navigate to `backend/`
2. Copy `.env.example` to `.env`: `cp .env.example .env`
3. Open `backend/.env` in text editor
4. Fill in these values:
   ```env
   NODE_ENV=development
   PORT=3001
   DATABASE_URL=your_supabase_connection_string
   FRONTEND_URL=http://localhost:3000
   FIREBASE_SERVICE_ACCOUNT_KEY=paste_entire_json_from_step_2.5
   FIREBASE_STORAGE_BUCKET=palate-mvp-yourname.appspot.com
   ```
5. Replace the values:
   - `DATABASE_URL`: Paste your Supabase connection string from Step 1.5
   - `FIREBASE_SERVICE_ACCOUNT_KEY`: Paste the ENTIRE JSON from your downloaded service account file
   - `FIREBASE_STORAGE_BUCKET`: Use your Firebase project name + `.appspot.com`

**4.2 Create Frontend Environment File**
1. In your project folder, navigate to `frontend/`
2. Copy `.env.local.example` to `.env.local`: `cp .env.local.example .env.local`
3. Open `frontend/.env.local` in text editor
4. Fill in using your Firebase config from Step 2.2:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=palate-mvp-yourname.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=palate-mvp-yourname
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=palate-mvp-yourname.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
   ```

### STEP 5: Test Locally - 2 minutes

**5.1 Install and Run**
1. Open terminal in your project root
2. Run: `npm run install:all` (installs all dependencies)
3. Run: `npm run dev` (starts both frontend and backend)
4. ⏳ Wait for both servers to start
5. Open browser to `http://localhost:3000`
6. You should see the Palate login page!
7. Test Google sign-in to make sure everything works

### STEP 6: Push to GitHub - 2 minutes

**6.1 Create GitHub Repository**
1. Go to [github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Repository name: `palate-mvp`
4. Make it **Public** (required for free deployments)
5. ❌ Don't initialize with README (we have files already)
6. Click **"Create repository"**

**6.2 Push Your Code**
1. In your terminal, in project root:
```bash
git remote add origin https://github.com/YOURUSERNAME/palate-mvp.git
git branch -M main
git push -u origin main
```
2. Replace `YOURUSERNAME` with your GitHub username
3. Refresh GitHub page - you should see all your code!

### STEP 7: Backend Deployment (Railway) - 5 minutes

**7.1 Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Click **"Login"** 
3. Click **"Login with GitHub"**
4. Click **"Authorize Railway"** in popup
5. You'll see Railway dashboard

**7.2 Deploy Backend**
1. Click **"New Project"**
2. Click **"Deploy from GitHub repo"**
3. **Install Railway on GitHub popup**: Click **"Install Railway"**
4. Choose **"Only select repositories"**
5. Select your `palate-mvp` repository
6. Click **"Install"**
7. Back on Railway, click your `palate-mvp` repository
8. Railway will start deploying automatically
9. ⏳ Wait 3-5 minutes for deployment

**7.3 Add Environment Variables**
1. Click on your deployed service (should show as "Deployed")
2. Click **"Variables"** tab
3. Add each variable by clicking **"New Variable"**:
   ```
   NODE_ENV = production
   DATABASE_URL = [paste_your_supabase_connection_string]
   FRONTEND_URL = https://yourdomain.vercel.app
   FIREBASE_SERVICE_ACCOUNT_KEY = [paste_entire_json]
   FIREBASE_STORAGE_BUCKET = palate-mvp-yourname.appspot.com
   ```
4. **Note**: We'll update `FRONTEND_URL` after Vercel deployment
5. Click **"Deploy"** to restart with new variables

**7.4 Get Railway URL**
1. Click **"Settings"** tab
2. Scroll to **"Environment"** section
3. Copy the **"Public URL"** (looks like `https://xxxxx.railway.app`)
4. Save this URL - you'll need it for frontend!

### STEP 8: Frontend Deployment (Vercel) - 5 minutes

**8.1 Create Vercel Account**
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Click **"Authorize Vercel"** in popup
5. You'll see Vercel dashboard

**8.2 Import Project**
1. Click **"Add New..."** → **"Project"**
2. Find your `palate-mvp` repository
3. Click **"Import"**
4. **Configure Project**:
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: **`frontend`** (IMPORTANT!)
   - Build Command: Leave default (`npm run build`)
   - Output Directory: Leave default (`.next`)
   - Install Command: `npm install`
5. Click **"Deploy"**
6. ⏳ Wait 3-5 minutes for first deployment

**8.3 Add Environment Variables**
1. After deployment, click **"Continue to Dashboard"**
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in left sidebar
4. Add each variable (click **"Add"** for each):

**Production Environment Variables:**
```
NEXT_PUBLIC_FIREBASE_API_KEY = [from_your_firebase_config]
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = palate-mvp-yourname.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = palate-mvp-yourname
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = palate-mvp-yourname.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = [from_your_firebase_config]
NEXT_PUBLIC_FIREBASE_APP_ID = [from_your_firebase_config]
NEXT_PUBLIC_API_BASE_URL = [your_railway_url]/api
```

5. For `NEXT_PUBLIC_API_BASE_URL`, use your Railway URL from Step 7.4 + `/api`
6. After adding all variables, click **"Redeploy"** button

**8.4 Get Your Live URL**
1. Click **"Deployments"** tab
2. Copy your **"Domain"** (looks like `https://palate-mvp-xyz.vercel.app`)
3. This is your live frontend URL!

### STEP 9: Final Configuration - 3 minutes

**9.1 Update Firebase Authorized Domains**
1. Go back to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click **"Authentication"** → **"Settings"** tab
4. Scroll to **"Authorized domains"**
5. Click **"Add domain"**
6. Add your Vercel domain: `palate-mvp-xyz.vercel.app` (without https://)
7. Click **"Done"**

**9.2 Update Railway Backend URL**
1. Go back to [Railway](https://railway.app)
2. Click on your project → your service
3. Click **"Variables"** tab
4. Find `FRONTEND_URL` variable
5. Update it to your Vercel URL: `https://palate-mvp-xyz.vercel.app`
6. Service will auto-redeploy

**9.3 Update Google OAuth Redirect**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Go to **"APIs & services"** → **"Credentials"**
3. Click on your **"Palate Web Client"** OAuth 2.0 Client ID
4. Under **"Authorized redirect URIs"**, click **"+ Add URI"**
5. Add: `https://palate-mvp-yourname.firebaseapp.com/__/auth/handler`
6. Add: `https://your-vercel-domain.vercel.app` (for backup)
7. Click **"Save"**

### STEP 10: 🎉 TEST YOUR LIVE APP!

**10.1 Final Test**
1. Open your Vercel URL in browser
2. You should see the Palate login page
3. Click **"Continue with Google"**
4. Sign in with your Google account
5. Upload a photo of food
6. Select a cuisine from the list
7. Add a caption
8. Click **"Log Cuisine"**
9. Check your profile page - you should see your cuisine log!

**🎉 SUCCESS! Your MVP is now live and FREE!**

## 📱 What You Just Built

✅ **Full-stack web app** deployed on professional cloud infrastructure  
✅ **Google Authentication** - secure user login  
✅ **Photo uploads** - users can upload food photos  
✅ **Database** - persistent storage of user data  
✅ **Responsive design** - works on mobile and desktop  
✅ **Scalable architecture** - ready for thousands of users  

**Total Cost: $0.00/month** 🎯

## 📊 Usage Limits (All FREE tiers)

- **Vercel**: 100GB bandwidth, unlimited requests
- **Railway**: $5 credit monthly (usually 2-3 months free)
- **Supabase**: 500MB database, 2GB transfer  
- **Firebase Auth**: 10,000 users/month
- **Firebase Storage**: 1GB storage, 10GB transfer/month

## 🚀 Next Steps

Your MVP is live! Here's what you can do:

1. **Share with friends** - Get your first users!
2. **Collect feedback** - See what users want
3. **Add features** - Based on user feedback
4. **Custom domain** - Buy a domain and connect it
5. **Analytics** - Add Google Analytics to track usage

## 🆘 Troubleshooting

**Login not working?**
- Check Firebase authorized domains
- Verify Google OAuth redirect URIs
- Check browser console for errors

**Photos not uploading?**
- Check Firebase Storage rules
- Verify service account key is correct

**Backend errors?**
- Check Railway logs in dashboard  
- Verify all environment variables are set
- Check database connection string

**Need help?** Open an issue on GitHub!