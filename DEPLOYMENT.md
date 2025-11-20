# 🚀 Hướng Dẫn Deploy SoosanMotor.com

## ✅ Trạng Thái Dự Án

### Production Ready ✅
- **Vite Build**: Hoàn tất 100%
- **Performance**: Tối ưu
- **SEO**: Đầy đủ meta tags và structured data
- **Responsive**: Desktop, Tablet, Mobile

### Next.js (Đang Phát Triển) 🚧
- Compile thành công
- Cần viết lại components để tương thích SSR
- Dự kiến hoàn thành: Q1 2025

---

## 📦 Build Production

### Bước 1: Chuẩn Bị
```bash
# Clone repository
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>

# Install dependencies
npm install
```

### Bước 2: Build
```bash
# Build production với Vite
npm run build

# Kết quả: thư mục dist/ chứa static files
```

### Bước 3: Verify
```bash
# Preview production build local
npm run start

# Mở browser: http://localhost:4173
```

---

## 🌐 Deploy Options

### Option 1: Vercel (Khuyến nghị)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configure:
# - Build Command: npm run build
# - Output Directory: dist
# - Install Command: npm install
```

### Option 2: Netlify
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Traditional Hosting
```bash
# Build
npm run build

# Upload dist/ folder via FTP/SFTP to:
# - /public_html/
# - /www/
# - /htdocs/
```

### Option 4: Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

---

## ⚙️ Environment Variables

### Production (.env.production)
```env
VITE_SITE_URL=https://soosanmotor.com
VITE_API_URL=https://api.soosanmotor.com
```

### Staging (.env.staging)
```env
VITE_SITE_URL=https://staging.soosanmotor.com
VITE_API_URL=https://api-staging.soosanmotor.com
```

---

## 🔍 Post-Deploy Checklist

### Performance
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3.5s
- [ ] Total Bundle Size < 1MB

### SEO
- [ ] Meta tags đầy đủ
- [ ] Structured Data hợp lệ (Google Rich Results Test)
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configured
- [ ] Open Graph tags for social sharing

### Security
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Content Security Policy set
- [ ] XSS protection enabled

### Functionality
- [ ] All routes accessible
- [ ] Forms working correctly
- [ ] Images loading properly
- [ ] Mobile responsive
- [ ] Cross-browser compatible

---

## 📊 Performance Optimization

### Code Splitting (Đã Tích Hợp)
- React.lazy() cho route-based splitting
- Dynamic imports cho heavy components

### Image Optimization
```bash
# Compress images before adding
npm install -g sharp-cli
sharp input.jpg -o output.jpg --quality 80
```

### CDN Setup (Khuyến nghị)
- Cloudflare
- CloudFront
- Fastly

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist .next
npm install
npm run build
```

### Blank Page After Deploy
- Check browser console for errors
- Verify base path in vite.config.ts
- Ensure all assets uploaded correctly

### Routes Not Working
- Configure server redirects
- For SPA: redirect all routes to index.html

---

## 📞 Support

Issues? Contact development team or create issue in repository.

**Last Updated**: November 2024
**Version**: 1.0.0
