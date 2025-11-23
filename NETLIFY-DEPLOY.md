# 🚀 Netlify Deployment Guide

## ⚠️ IMPORTANT: Netlify Requires Special Configuration for Next.js

Your site is built with Next.js 16 which requires the **@netlify/plugin-nextjs** plugin.

## 📦 Deploy Steps

### Option 1: Automatic Deployment (Recommended)

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com

2. **Import Your Project**
   - Click "Add new site" > "Import an existing project"
   - Connect your Git repository
   - Select your repository

3. **CRITICAL: Configure Build Settings**

   Netlify should auto-detect these settings:
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Add Environment Variables (if any)**
   - Go to Site settings > Environment variables
   - Add any required variables from your .env file

5. **Enable Next.js Plugin**

   The `netlify.toml` file already includes:
   ```toml
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

   This plugin will be automatically installed during deployment.

6. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live!

### Option 2: Vercel (Alternative - Highly Recommended for Next.js)

Since this is a Next.js application, **Vercel** is the official hosting platform and works better:

1. **Go to Vercel**
   - Visit: https://vercel.com

2. **Import Project**
   - Click "New Project"
   - Import your Git repository

3. **Deploy**
   - Vercel auto-detects Next.js
   - Zero configuration needed
   - Click "Deploy"

4. **Done!**
   - Site will be live at `https://[project-name].vercel.app`
   - No Internal Server Error!

## 🔧 Troubleshooting Netlify

If you still get "Internal Server Error" on Netlify:

### Issue: Homepage Returns 500 Error

**Cause**: Homepage uses `force-dynamic` which requires serverless functions.

**Fix**: Make homepage static instead

1. Edit `app/page.tsx`:
   ```typescript
   // Remove this line:
   export const dynamic = 'force-dynamic';
   ```

2. Rebuild and redeploy

### Issue: Build Succeeds but Site Doesn't Load

**Possible causes**:
- Missing @netlify/plugin-nextjs
- Incorrect publish directory
- Node version mismatch

**Fix**:
1. Ensure `netlify.toml` exists with correct settings
2. Check Node version in Netlify (should be 18+)
3. Try manual deployment with Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

## ✅ What's Working

- **Build**: 51/51 pages successfully generated
- **Static Pages**: All product and blog pages work
- **Dynamic Page**: Homepage (needs serverless function support)

## 🎯 Recommendation

**Deploy to Vercel for best Next.js experience:**
- Zero configuration
- Automatic serverless functions
- Built by Next.js creators
- Better performance
- Free tier available

**Or use Netlify with static homepage:**
- Remove `force-dynamic` from homepage
- All pages will be static
- No serverless functions needed
- Faster load times

## 📝 Current Configuration

**Package.json scripts:**
```json
"build": "next build"
"start": "next start"
```

**Netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**Next.js version:** 16.0.3 (Turbopack)

---

Need help? The issue is likely that Netlify needs the Next.js plugin configured correctly, or you should switch to Vercel which has native Next.js support.
