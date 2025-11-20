# SoosanMotor.com - Website Xe Tải & Xe Chuyên Dụng

Website bán hàng và giới thiệu sản phẩm xe tải, xe đầu kéo, sơ mi rơ moóc, xe cẩu và xe chuyên dụng.

## 🚀 Công Nghệ Sử Dụng

- **Frontend Framework**: React 18.3.1 + TypeScript
- **Build Tool**: Vite 5.4.1 (Production) / Next.js 16.0.3 (Development)
- **UI Components**: Radix UI + Tailwind CSS
- **Routing**: React Router DOM 6
- **Form Handling**: React Hook Form + Zod
- **State Management**: React Context API
- **SEO**: React Helmet Async

## 📦 Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js 18+ hoặc 20+
- npm 9+ hoặc yarn/pnpm

### Các Bước Cài Đặt

```sh
# Bước 1: Clone repository
git clone <YOUR_GIT_URL>

# Bước 2: Di chuyển vào thư mục project
cd <YOUR_PROJECT_NAME>

# Bước 3: Cài đặt dependencies
npm install

# Bước 4: Chạy development server
npm run dev
```

## 🛠️ Scripts Có Sẵn

```bash
# Development
npm run dev              # Chạy Vite dev server (khuyến nghị)
npm run dev:next         # Chạy Next.js dev server (đang phát triển)

# Production Build
npm run build            # Build production với Vite
npm run build:vite       # Build production với Vite (tường minh)
npm run build:next       # Build với Next.js (đang phát triển)

# Preview & Start
npm run start            # Preview Vite production build
npm run start:next       # Start Next.js server
npm run preview          # Preview Vite build

# Utilities
npm run lint             # Chạy ESLint
```

## 🏗️ Cấu Trúc Thư Mục

```
├── app/                    # Next.js App Router (đang phát triển)
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Shadcn/ui components
│   │   ├── home/          # Home page components
│   │   ├── blog/          # Blog components
│   │   └── ...
│   ├── data/              # Static data
│   │   ├── products/      # Product data (xe-tai, mooc, dau-keo, xe-cau)
│   │   └── blog-posts/    # Blog post data
│   ├── pages_old/         # Vite/React Router pages
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities & helpers
│   ├── models/            # TypeScript types
│   └── utils/             # Utility functions
├── public/                # Static assets
└── dist/                  # Production build output (Vite)
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6589fcfd-ca75-4057-bbcf-37933b0061b5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 📝 Thêm Sản Phẩm Mới

### Xe Tải
Thêm file mới vào `src/data/products/xe-tai/` và export trong `index.ts`

### Sơ Mi Rơ Moóc  
Thêm file mới vào `src/data/products/mooc/` và import trong `index.ts`

### Xe Đầu Kéo
Thêm file mới vào `src/data/products/dau-keo/` và export trong `index.ts`

### Xe Cẩu
Thêm file mới vào `src/data/products/xe-cau/` và export trong `index.ts`

## 📰 Thêm Blog Post

1. Tạo file mới trong `src/data/blog-posts/{category}/`
2. Import trong `src/data/blog-posts/{category}/index.ts`
3. Export trong `src/utils/blogLoader.ts`

## 🚀 Deploy

### Vite (Production - Khuyến nghị)
```bash
npm run build
# Upload thư mục dist/ lên hosting
```

### Next.js (Đang phát triển)
```bash
npm run build:next
npm run start:next
```

## ⚙️ Environment Variables

Tạo file `.env` từ `.env.example`:

```env
VITE_SITE_URL=https://soosanmotor.com
NEXT_PUBLIC_SITE_URL=https://soosanmotor.com
```

## 🔧 Troubleshooting

### Build lỗi với Next.js
Next.js build hiện đang trong quá trình phát triển. Sử dụng Vite cho production:
```bash
npm run build
```

### Vite dev server không chạy
```bash
rm -rf node_modules
npm install
npm run dev
```

## 📄 License

Copyright © 2024 SoosanMotor.com

## 🤝 Contributing

Liên hệ team phát triển để đóng góp vào dự án.
