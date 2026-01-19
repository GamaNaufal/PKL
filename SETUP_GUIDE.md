# PT. Yamatogomu Indonesia - Sistem Manajemen Pabrik Karet

Sistem login dan dashboard untuk PT. Yamatogomu Indonesia, pabrik karet yang memproduksi part mobil.

## 🚀 Fitur Utama

### Autentikasi & Otorisasi

- Login dengan email dan password
- 6 role user berbeda dengan permission yang berbeda
- Session management dengan Laravel Sanctum
- Token-based authentication

### Roles & Permissions

1. **Operator** - Operator pabrik, dapat melihat dan membuat laporan
2. **Admin Press** - Administrator Press Department, dapat mengelola part dan laporan
3. **QC** - Quality Control
4. **Supervisi Press** - Supervisi Press Department
5. **Mixing Department** - Mixing Department
6. **Admin IT** - Administrator sistem, full access

### Fitur Dashboard

- Dashboard dengan info user dan quick actions
- Halaman laporan dengan CRUD operations
- Pencarian laporan berdasarkan:
  - Nomor part (part number/nama)
  - Tanggal laporan (range)
- Download laporan
- Kelola jenis nomor part baru (Admin Press & Admin IT)

## 📋 Prerequisites

- PHP 8.1+
- Node.js 16+
- Composer
- npm atau yarn
- MySQL/PostgreSQL

## 🔧 Setup Backend (Laravel)

### 1. Install Dependencies

```bash
cd backend
composer install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env` dan konfigurasi:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=yamatogomu
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### 3. Generate App Key

```bash
php artisan key:generate
```

### 4. Run Migrations & Seeders

```bash
php artisan migrate
php artisan db:seed
```

### 5. Install Sanctum (if not already)

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### 6. Start Backend Server

```bash
php artisan serve
```

Backend akan berjalan di: `http://localhost:8000`

## 🎨 Setup Frontend (Next.js)

### 1. Install Dependencies

```bash
cd frontend
npm install
# atau
yarn install
```

### 2. Setup Environment

Buat file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Start Frontend Development Server

```bash
npm run dev
# atau
yarn dev
```

Frontend akan berjalan di: `http://localhost:3000`

## 👤 Akun Demo

### Admin IT

- Email: `admin@yamatogomu.com`
- Password: `password123`

### Operator

- Email: `operator@yamatogomu.com`
- Password: `password123`

### Admin Press

- Email: `admin.press@yamatogomu.com`
- Password: `password123`

### QC

- Email: `qc@yamatogomu.com`
- Password: `password123`

### Supervisi Press

- Email: `supervisi@yamatogomu.com`
- Password: `password123`

### Mixing Department

- Email: `mixing@yamatogomu.com`
- Password: `password123`

## 📁 Struktur Project

### Backend

```
backend/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/
│   │           ├── AuthController.php
│   │           ├── ReportController.php
│   │           └── PartTypeController.php
│   └── Models/
│       ├── User.php
│       ├── Role.php
│       ├── Report.php
│       └── PartType.php
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
└── routes/
    └── api.php
```

### Frontend

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx (Home/Redirect)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── dashboard/
│   │       ├── page.tsx (Main Dashboard)
│   │       ├── reports/
│   │       │   └── page.tsx
│   │       └── parts/
│   │           └── page.tsx
│   ├── components/
│   │   └── dashboard-layout.tsx
│   └── lib/
│       ├── auth-context.tsx
│       └── protected-route.tsx
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Reports

- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create new report
- `GET /api/reports/{id}` - Get report detail
- `GET /api/reports/search/part?q=...` - Search by part number
- `GET /api/reports/search/date?start_date=...&end_date=...` - Search by date range
- `POST /api/reports/{id}/download` - Download report

### Part Types

- `GET /api/part-types` - Get all part types
- `POST /api/part-types` - Create new part type (Admin only)
- `GET /api/part-types/{id}` - Get part type detail

## 🛡️ Security

- CORS configuration untuk keamanan
- Token-based authentication dengan Sanctum
- Password hashing dengan bcrypt
- Protected routes dengan middleware

## 📝 Database Schema

### Users Table

- id, name, email, password, role_id, phone, department, timestamps

### Roles Table

- id, name, display_name, description, timestamps

### Reports Table

- id, user_id, part_type_id, title, content, file_path, quantity, status, report_date, timestamps

### PartTypes Table

- id, part_number, part_name, description, category, timestamps

## 🐛 Troubleshooting

### Frontend tidak bisa connect ke backend

- Pastikan backend sudah running di `http://localhost:8000`
- Check `.env.local` di frontend, pastikan `NEXT_PUBLIC_API_URL` benar
- Check CORS configuration di backend `.env`

### Database error

- Pastikan database sudah dibuat
- Run `php artisan migrate` untuk membuat tables
- Run `php artisan db:seed` untuk populate initial data

### Login gagal

- Pastikan user sudah ada di database (run seeders)
- Check email dan password (case-sensitive)
- Lihat backend logs di `storage/logs/`

## 📚 Dokumentasi

- Laravel: https://laravel.com/docs
- Next.js: https://nextjs.org/docs
- Sanctum: https://laravel.com/docs/sanctum

## 👨‍💼 Author

Dibuat untuk PT. Yamatogomu Indonesia
