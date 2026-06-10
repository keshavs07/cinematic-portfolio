# Firebase Video Upload Guide

Since Git LFS videos aren't deployed with Vercel, use Firebase Storage for all videos.

## Steps to Upload Default Videos

### 1. Get Firebase Storage URL Format
Firebase download URLs follow this format:
```
https://firebasestorage.googleapis.com/v0/b/{BUCKET_ID}/o/{FILE_PATH}?alt=media&token={TOKEN}
```

### 2. Upload Videos Using Admin Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Storage** → **Files**
4. Create two folders: `reels/` and `portfolio/`
5. Upload your videos:
   - **Reels folder:**
     - Video-314.mp4
     - Video-418.mp4
     - IMG_0550.mp4
   - **Portfolio folder:**
     - IMG_6018.mp4
     - IMG_7730.mp4

### 3. Get Download URLs
For each uploaded video:
1. Click the three dots (⋮) → **Copy URL**
2. This gives you the permanent download URL

### 4. Update Component Files

**src/components/Reels.tsx** - Replace the `defaultReels` array:
```typescript
const defaultReels: VideoItem[] = [
  {
    title: 'Cinematic Reel',
    desc: 'Viral Editing Style',
    src: 'https://firebasestorage.googleapis.com/v0/b/YOUR_BUCKET/o/reels%2FVideo-314.mp4?alt=media&token=TOKEN',
    type: 'video/mp4',
  },
  // ... repeat for other reels
]
```

**src/components/Portfolio.tsx** - Replace the `defaultPortfolioVideos` array:
```typescript
const defaultPortfolioVideos: PortfolioVideo[] = [
  {
    title: 'Commercial Editing',
    src: 'https://firebasestorage.googleapis.com/v0/b/YOUR_BUCKET/o/portfolio%2FIMG_6018.mp4?alt=media&token=TOKEN',
    type: 'video/mp4',
  },
  // ... repeat for other videos
]
```

### 5. Deploy
Once you update the URLs:
```bash
npm run build
git add src/components/Reels.tsx src/components/Portfolio.tsx
git commit -m "Update default videos to use Firebase Storage URLs"
git push origin main
```

Vercel will auto-deploy the changes and videos will now load from Firebase Storage on both local and deployed environments.
