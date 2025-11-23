# 🚀 Hướng Dẫn Deploy Website lên Netlify

## ✅ Đã Hoàn Thành

Website đã được chuyển đổi thành công từ Vite sang Next.js 16 với Turbopack và sẵn sàng deploy.

### Build thành công:
```
✓ 51/51 pages built successfully
✓ Compiled with Turbopack
✓ Static Site Generation (SSG) cho product pages và blog posts
✓ Dynamic rendering cho homepage
```

## 📋 Yêu Cầu

- Node.js 18+
- npm hoặc yarn
- Tài khoản Netlify (miễn phí)

## 🔧 Deploy lên Netlify

### Phương pháp 1: Deploy qua Netlify Dashboard (Khuyến nghị)

1. **Push code lên Git repository**
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Kết nối với Netlify**
   - Đăng nhập vào [Netlify](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Chọn Git provider (GitHub, GitLab, hoặc Bitbucket)
   - Chọn repository của bạn

3. **Cấu hình build settings** (tự động detect)
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Netlify sẽ tự động cài đặt `@netlify/plugin-nextjs`

4. **Deploy**
   - Click "Deploy site"
   - Netlify sẽ tự động build và deploy
   - Website của bạn sẽ có URL: `https://[site-name].netlify.app`

### Phương pháp 2: Deploy qua Netlify CLI

1. **Cài đặt Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize site**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

## 🌐 Environment Variables

Nếu website cần environment variables, thêm chúng vào Netlify Dashboard:

1. Site settings > Environment variables
2. Thêm các biến:
   - `NEXT_PUBLIC_SITE_URL`: URL website của bạn
   - Các biến khác nếu cần

## ✨ Tính Năng Đã Được Setup

- ✅ **Next.js 16 với Turbopack** - Build nhanh hơn với Turbopack
- ✅ **Static Site Generation** - 43 product pages + 12+ blog posts được pre-render
- ✅ **Dynamic Rendering** - Homepage render động khi cần
- ✅ **SEO Optimized** - Metadata đầy đủ cho mọi page
- ✅ **Image Optimization** - Tự động optimize images với Next.js Image
- ✅ **Automatic Redirects** - Next.js routing tự động
- ✅ **Fast Refresh** - Hot reload trong development

## 🔍 Kiểm Tra Sau Khi Deploy

1. **Homepage**: `https://[your-site].netlify.app/`
2. **Product Pages**: `/xe-tai/[slug]`, `/dau-keo/[slug]`, etc.
3. **Blog**: `/blog` và `/[category]/[slug]`
4. **Static Pages**: `/danh-muc-xe`, `/gioi-thieu`, `/lien-he`, `/so-sanh-xe`

## 📊 Build Information

```
Route Structure:
├ ƒ /                    (Dynamic - server-rendered on demand)
├ ● /[type]/[slug]       (43 product pages - SSG)
├ ● /[category]/[slug]   (12+ blog posts - SSG)
├ ○ /blog               (Static)
├ ○ /danh-muc-xe        (Static)
├ ○ /gioi-thieu         (Static)
├ ○ /lien-he            (Static)
└ ○ /so-sanh-xe         (Static)

Legend:
○ Static - Pre-rendered as static HTML
● SSG - Static Site Generation with generateStaticParams
ƒ Dynamic - Server-rendered on demand
```

## 🐛 Troubleshooting

### Lỗi "Internal Server Error"
- ✅ **ĐÃ FIX**: Đã remove `--webpack` flag và dùng Turbopack
- Build command đã được update thành `npm run build`

### Build fails
```bash
# Clean và rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Page không load
- Kiểm tra Netlify deploy logs
- Xem Functions logs trong Netlify dashboard
- Đảm bảo environment variables đã được set đúng

## 📝 Scripts Có Sẵn

```bash
npm run dev          # Start Next.js dev server (Turbopack)
npm run build        # Build for production
npm start            # Start production server locally
npm run lint         # Run ESLint
```

## 🎉 Hoàn Tất!

Website của bạn đã sẵn sàng cho production. Sau khi deploy thành công, bạn có thể:

1. Cấu hình custom domain trong Netlify
2. Enable automatic deployments khi push code mới
3. Monitor performance với Netlify Analytics
4. Setup form submissions với Netlify Forms

**Happy Deploying! 🚀**
