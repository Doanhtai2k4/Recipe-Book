# 🍳 Recipe Book PWA

Ứng dụng web quản lý công thức nấu ăn với khả năng hoạt động offline.

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, TypeORM
- **Database**: MySQL
- **PWA**: next-pwa, Service Workers

## 📂 Cấu trúc dự án

```
recipe-book/
├── src/
│   ├── app/
│   │   ├── api/recipes/    # API endpoints CRUD
│   │   ├── recipes/        # Pages quản lý recipes
│   │   ├── layout.tsx      # Layout chính
│   │   └── page.tsx        # Trang chủ
│   ├── components/         # React components
│   ├── entity/Recipe.ts    # Model database
│   └── lib/database.ts     # Kết nối database
├── public/                 # Static files & PWA icons
└── next.config.ts          # Cấu hình Next.js + PWA
```

## 🔄 Luồng hoạt động

1. **Trang chủ** → Hiển thị danh sách recipes từ database
2. **Thêm recipe** → Form tạo mới → POST `/api/recipes`
3. **Xem chi tiết** → GET `/api/recipes/[id]`
4. **Chỉnh sửa** → PUT `/api/recipes/[id]`
5. **Xóa** → DELETE `/api/recipes/[id]`
6. **PWA Cache** → Service Workers cache để hoạt động offline

## 🚀 Cách chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/Doanhtai2k4/Recipe-Book.git
cd Recipe-Book
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình database

Tạo database MySQL:

```sql
CREATE DATABASE recipe_book;
```

Cập nhật connection trong `src/lib/database.ts`:

```typescript
host: "localhost",
port: 3306,
username: "your_username",
password: "your_password",
database: "recipe_book"
```

### 4. Chạy ứng dụng

```bash
npm run dev    # Development
npm run build  # Build production
npm start      # Chạy production
```

Mở [http://localhost:3000](http://localhost:3000)

---

\_Developed by Đỗ Anh Tài
