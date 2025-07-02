# InfraVision Deployment Guide

This guide provides step-by-step instructions for deploying InfraVision to production environments.

## 🚀 Quick Deployment Overview

- **Backend**: Render.com (Node.js)
- **Frontend**: Vercel or Netlify (React)
- **AI Model**: Stored in frontend public directory (client-side inference)

## 📋 Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Render Account**: For backend hosting
3. **Vercel/Netlify Account**: For frontend hosting
4. **Domain (Optional)**: For custom domain setup

## 🔧 Backend Deployment (Render.com)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Verify your email

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:

```
Name: infravision-backend
Root Directory: server
Environment: Node
Build Command: npm install
Start Command: npm start
```

### Step 3: Environment Variables
Add these environment variables in Render dashboard:

```
PORT=5000
NODE_ENV=production
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL (e.g., `https://infravision-backend.onrender.com`)

## 🌐 Frontend Deployment

### Option A: Vercel Deployment

#### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Install Vercel for GitHub

#### Step 2: Deploy Project
1. Click "New Project"
2. Import your GitHub repository
3. Configure settings:

```
Framework Preset: Create React App
Root Directory: client
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

#### Step 3: Environment Variables
Add environment variable:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

#### Step 4: Deploy
1. Click "Deploy"
2. Wait for build and deployment
3. Your app will be live at `https://your-project.vercel.app`

### Option B: Netlify Deployment

#### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Connect your repository

#### Step 2: Configure Build Settings
```
Build command: npm run build
Publish directory: build
Base directory: client
```

#### Step 3: Environment Variables
Add environment variable:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

#### Step 4: Deploy
1. Click "Deploy site"
2. Wait for build and deployment
3. Your app will be live at `https://your-site.netlify.app`

## 🔗 Update Frontend Configuration

After deploying the backend, update the frontend to use the production backend URL:

### Update ComplaintCard.jsx
```javascript
// Change this line in ComplaintCard.jsx
src={`https://your-backend-url.onrender.com${imageUrl}`}
```

### Update API Calls
```javascript
// In Home.jsx, update axios base URL if needed
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

## 🌍 Custom Domain Setup

### Backend (Render)
1. Go to your Render service dashboard
2. Click "Settings" → "Custom Domains"
3. Add your domain (e.g., `api.infravision.com`)
4. Update DNS records as instructed

### Frontend (Vercel/Netlify)
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `infravision.com`)
4. Update DNS records as instructed

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files
- Use environment variables for sensitive data
- Rotate API keys regularly

### CORS Configuration
Ensure your backend CORS is configured for production:

```javascript
// In server.js
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));
```

### HTTPS
- Both Render and Vercel/Netlify provide HTTPS by default
- Ensure all API calls use HTTPS in production

## 📊 Monitoring & Analytics

### Backend Monitoring (Render)
- Built-in logs and metrics
- Set up alerts for downtime
- Monitor response times

### Frontend Monitoring
- Vercel Analytics (if using Vercel)
- Google Analytics integration
- Error tracking with Sentry

## 🔄 Continuous Deployment

### Automatic Deployments
Both Render and Vercel/Netlify support automatic deployments:
- Push to `main` branch triggers deployment
- Preview deployments for pull requests
- Rollback to previous versions

### Deployment Pipeline
```
GitHub Push → Build → Test → Deploy → Verify
```

## 🐛 Troubleshooting

### Common Deployment Issues

1. **Build Failures**:
   - Check build logs
   - Verify all dependencies are in package.json
   - Ensure Node.js version compatibility

2. **Environment Variables**:
   - Verify all required env vars are set
   - Check variable names and values
   - Restart service after adding env vars

3. **CORS Errors**:
   - Update CORS configuration for production domains
   - Check frontend API calls use correct URLs
   - Verify HTTPS/HTTP protocol consistency

4. **Model Loading Issues**:
   - Ensure model files are in public/model/
   - Check file permissions
   - Verify file paths in code

### Debug Commands

```bash
# Check backend logs
render logs --service infravision-backend

# Check frontend build
npm run build --verbose

# Test API endpoints
curl https://your-backend-url.onrender.com/api/health
```

## 📈 Performance Optimization

### Backend
- Enable compression
- Implement caching
- Optimize image processing

### Frontend
- Enable gzip compression
- Optimize bundle size
- Implement lazy loading

### AI Model
- Model quantization for faster inference
- Progressive loading
- Cache model weights

## 🔄 Updates & Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Update Node.js version when needed

### Backup Strategy
- Database backups (if applicable)
- Model file backups
- Configuration backups

## 📞 Support

For deployment issues:
1. Check platform documentation
2. Review build logs
3. Test locally first
4. Contact platform support

---

**Happy Deploying! 🚀** 