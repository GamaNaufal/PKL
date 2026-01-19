# 📋 PT. Yamatogomu Indonesia - Sistem Login & Dashboard

Ini adalah sistem login dan dashboard yang komprehensif untuk PT. Yamatogomu Indonesia, pabrik karet yang memproduksi part mobil. Sistem ini dibangun dengan stack modern Laravel (backend) dan Next.js (frontend).

---

## 🎯 Features Yang Sudah Diimplementasikan

### ✅ Authentication & Authorization

- [x] Login system dengan email/password
- [x] Token-based authentication (Laravel Sanctum)
- [x] 6 Role dengan permission berbeda
- [x] Protected routes di frontend
- [x] Logout functionality
- [x] Session management

### ✅ Backend (Laravel)

- [x] User model dengan role relationships
- [x] Role model dengan 6 predefined roles:
  - Operator
  - Admin Press
  - QC
  - Supervisi Press
  - Mixing Department
  - Admin IT
- [x] Report model dengan CRUD operations
- [x] PartType model untuk manajemen part
- [x] API endpoints dengan proper authentication/authorization
- [x] Database migrations & seeders dengan 6 demo users
- [x] CORS configuration
- [x] API response formatting

### ✅ Frontend (Next.js)

- [x] Login page dengan UI menarik
- [x] Auth context untuk global state management
- [x] Protected routes/pages
- [x] Dashboard dengan role-based content
- [x] Responsive design dengan Tailwind CSS
- [x] Reports page dengan CRUD & search
- [x] Part types management page
- [x] Navigation sidebar
- [x] Loading states

### ✅ API Endpoints

**Auth Endpoints:**

- POST `/api/auth/login` - Login
- POST `/api/auth/logout` - Logout
- GET `/api/auth/me` - Get current user

**Reports Endpoints:**

- GET `/api/reports` - Get all reports
- POST `/api/reports` - Create report
- GET `/api/reports/{id}` - Get report detail
- GET `/api/reports/search/part?q=...` - Search by part number
- GET `/api/reports/search/date?start_date=...&end_date=...` - Search by date range
- POST `/api/reports/{id}/download` - Download report

**Part Types Endpoints:**

- GET `/api/part-types` - Get all part types
- POST `/api/part-types` - Create part type (Admin only)
- GET `/api/part-types/{id}` - Get part type detail

### ✅ Database

- [x] Users table dengan role_id, phone, department
- [x] Roles table dengan 6 predefined roles
- [x] Reports table dengan relationships
- [x] PartTypes table untuk jenis-jenis part
- [x] Proper foreign key constraints
- [x] Timestamps pada semua tables

### ✅ Demo Data

6 User accounts sudah disiapkan untuk testing:

1. **Admin IT** - admin@yamatogomu.com (Full access)
2. **Operator** - operator@yamatogomu.com
3. **Admin Press** - admin.press@yamatogomu.com
4. **QC** - qc@yamatogomu.com
5. **Supervisi Press** - supervisi@yamatogomu.com
6. **Mixing Department** - mixing@yamatogomu.com

Semua password: `password123`

### ✅ Documentation

- [x] Setup guide lengkap (SETUP_GUIDE.md)
- [x] API documentation (API_DOCUMENTATION.md)
- [x] .env.example files
- [x] Code comments

---

## 📁 Project Structure

```
PKL-Yamato/
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   ├── ReportController.php
│   │   │   └── PartTypeController.php
│   │   └── Models/
│   │       ├── User.php (updated)
│   │       ├── Role.php (new)
│   │       ├── Report.php (new)
│   │       └── PartType.php (new)
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 2026_01_13_000000_create_roles_table.php (new)
│   │   │   ├── 2026_01_13_000001_create_part_types_table.php (new)
│   │   │   ├── 2026_01_13_000002_create_reports_table.php (new)
│   │   │   └── 2026_01_13_000003_add_role_to_users_table.php (new)
│   │   └── seeders/
│   │       ├── RoleSeeder.php (new)
│   │       ├── PartTypeSeeder.php (new)
│   │       └── DatabaseSeeder.php (updated)
│   ├── config/
│   │   ├── cors.php (sudah configured)
│   │   └── sanctum.php (sudah configured)
│   ├── routes/
│   │   └── api.php (updated)
│   └── .env.example (updated)
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx (updated)
│   │   │   ├── page.tsx (updated)
│   │   │   ├── login/
│   │   │   │   └── page.tsx (new)
│   │   │   └── dashboard/
│   │   │       ├── page.tsx (new)
│   │   │       ├── reports/
│   │   │       │   └── page.tsx (new)
│   │   │       └── parts/
│   │   │           └── page.tsx (new)
│   │   ├── components/
│   │   │   └── dashboard-layout.tsx (new)
│   │   └── lib/
│   │       ├── auth-context.tsx (new)
│   │       └── protected-route.tsx (new)
│   └── .env.local.example (new)
│
├── SETUP_GUIDE.md (new)
└── API_DOCUMENTATION.md (new)
```

---

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Copy .env.example ke .env
cp .env.example .env

# Generate app key
php artisan key:generate

# Install dependencies
composer install

# Run migrations & seeders
php artisan migrate
php artisan db:seed

# Start server
php artisan serve
# Server akan berjalan di http://localhost:8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
echo 'NEXT_PUBLIC_API_URL=http://localhost:8000' > .env.local

# Start development server
npm run dev
# Server akan berjalan di http://localhost:3000
```

### Login

Buka http://localhost:3000 dan gunakan salah satu demo account:

- Email: `operator@yamatogomu.com`
- Password: `password123`

---

## 🔐 Security Features

1. **Authentication**

   - Laravel Sanctum untuk token-based auth
   - Password hashing dengan bcrypt
   - Token expiration

2. **Authorization**

   - Role-based access control (RBAC)
   - Permission checking di controller level
   - Protected routes di frontend

3. **CORS**

   - Configured untuk localhost:3000
   - Proper origin validation

4. **Input Validation**
   - Server-side validation di semua endpoints
   - Proper error messages

---

## 📊 Database Relationships

```
Users (1) ←→ (Many) Roles
Users (1) ←→ (Many) Reports
PartTypes (1) ←→ (Many) Reports
```

---

## 🎨 UI Features

- **Login Page**: Modern gradient background dengan demo credentials display
- **Dashboard**: Welcome card, quick actions, info cards
- **Reports Page**: Create form, search by part/date, table view
- **Parts Page**: Manage part types, search functionality
- **Navigation**: Sidebar navigation dengan role-based menu items
- **Responsive**: Mobile-friendly design

---

## 📝 Role Permissions

| Feature          | Operator | Admin Press | QC  | Supervisi | Mixing | Admin IT |
| ---------------- | -------- | ----------- | --- | --------- | ------ | -------- |
| Login            | ✅       | ✅          | ✅  | ✅        | ✅     | ✅       |
| View own reports | ✅       | ✅          | ✅  | ✅        | ✅     | ✅       |
| Create reports   | ✅       | ✅          | ✅  | ✅        | ✅     | ✅       |
| View all reports | ❌       | ✅          | ❌  | ❌        | ❌     | ✅       |
| View parts       | ✅       | ✅          | ✅  | ✅        | ✅     | ✅       |
| Create parts     | ❌       | ✅          | ❌  | ❌        | ❌     | ✅       |
| Manage users     | ❌       | ❌          | ❌  | ❌        | ❌     | ✅       |

---

## 🛠️ Teknologi Yang Digunakan

### Backend

- **Laravel 11** - Web framework
- **Laravel Sanctum** - API authentication
- **MySQL/PostgreSQL** - Database
- **Eloquent ORM** - Database queries

### Frontend

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Context** - State management

---

## 📚 Documentation Files

1. **SETUP_GUIDE.md** - Panduan setup lengkap
2. **API_DOCUMENTATION.md** - API reference lengkap dengan contoh

---

## 🐛 Testing

### Demo Credentials

```
Email: operator@yamatogomu.com
Password: password123
```

### Test Scenarios

1. Login dengan berbagai role
2. Create report baru
3. Search reports by part number
4. Search reports by date range
5. Create part type (hanya Admin)
6. Verify permission restrictions

---

## ✨ Future Enhancements

- [ ] Download laporan sebagai PDF
- [ ] Email notifications
- [ ] User management page
- [ ] System settings page
- [ ] Audit logs
- [ ] Advanced filtering
- [ ] Data export/import
- [ ] Dashboard analytics
- [ ] Mobile app
- [ ] Real-time notifications

---

## 📞 Support

Untuk bantuan atau pertanyaan, silakan merujuk ke:

- SETUP_GUIDE.md untuk setup issues
- API_DOCUMENTATION.md untuk API questions
- Cek backend logs di `backend/storage/logs/`

---

## 📄 License

Internal use for PT. Yamatogomu Indonesia

---

## 🎉 Summary

Sistem ini sudah siap untuk digunakan dan mendemonstrasikan:

- ✅ Complete authentication flow
- ✅ Role-based authorization
- ✅ Full CRUD operations
- ✅ Search & filter functionality
- ✅ Responsive UI
- ✅ Clean architecture
- ✅ Best practices implementation

Silakan explore dan customize sesuai kebutuhan!
