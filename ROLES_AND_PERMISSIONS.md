# 👥 Role Management & Permissions

## Daftar Roles

PT. Yamatogomu Indonesia memiliki 6 roles dalam sistem:

---

## 1. 👷 Operator

**ID Role:** 1
**Display Name:** Operator
**Deskripsi:** Operator pabrik yang bertanggung jawab untuk mencatat laporan produksi harian

### Permissions:

- ✅ Login ke sistem
- ✅ Lihat laporan milik sendiri
- ✅ Buat laporan baru
- ✅ Lihat daftar part types
- ✅ Search laporan berdasarkan part dan tanggal
- ❌ Edit/delete laporan orang lain
- ❌ Create/edit part types
- ❌ Manage users
- ❌ Akses admin panel

### Demo Account:

```
Email: operator@yamatogomu.com
Password: password123
Department: Press
Phone: 081234567891
```

### Typical Dashboard:

- Dashboard dengan info dasar
- Halaman laporan untuk lihat & buat laporan
- Search functionality
- Quick create report form

---

## 2. 📋 Admin Press

**ID Role:** 2
**Display Name:** Admin Press
**Deskripsi:** Administrator Press Department, bertanggung jawab untuk kelola laporan dan part types

### Permissions:

- ✅ Login ke sistem
- ✅ Lihat SEMUA laporan (bukan hanya milik sendiri)
- ✅ Buat laporan baru
- ✅ Lihat daftar part types
- ✅ Create part types BARU ⭐
- ✅ Edit part types
- ✅ Search laporan
- ❌ Manage users
- ❌ Full admin access

### Demo Account:

```
Email: admin.press@yamatogomu.com
Password: password123
Department: Press
Phone: 081234567892
```

### Typical Dashboard:

- Dashboard dengan overview laporan
- Halaman laporan untuk lihat SEMUA laporan
- Halaman parts management untuk tambah/edit part types
- Access ke reports dari semua operators
- Search dan filter laporan

---

## 3. ✅ QC (Quality Control)

**ID Role:** 3
**Display Name:** QC
**Deskripsi:** Quality Control untuk quality assurance produk

### Permissions:

- ✅ Login ke sistem
- ✅ Lihat laporan milik sendiri
- ✅ Buat laporan QC
- ✅ Lihat daftar part types
- ✅ Search laporan
- ❌ Lihat laporan orang lain
- ❌ Create/edit part types
- ❌ Manage users

### Demo Account:

```
Email: qc@yamatogomu.com
Password: password123
Department: QC
Phone: 081234567893
```

### Typical Dashboard:

- Dashboard dengan info QC
- Halaman laporan untuk QC tasks
- Create QC reports
- Search functionality

---

## 4. 👔 Supervisi Press

**ID Role:** 4
**Display Name:** Supervisi Press
**Deskripsi:** Supervisi Press Department, mengawasi press operations

### Permissions:

- ✅ Login ke sistem
- ✅ Lihat laporan milik sendiri
- ✅ Buat laporan supervisi
- ✅ Lihat daftar part types
- ✅ Search laporan
- ❌ Lihat laporan orang lain (hanya sendiri)
- ❌ Create/edit part types
- ❌ Manage users

### Demo Account:

```
Email: supervisi@yamatogomu.com
Password: password123
Department: Press
Phone: 081234567894
```

### Typical Dashboard:

- Dashboard dengan supervisi info
- Halaman laporan untuk supervisi tasks
- Create supervisi reports
- Monitoring tools

---

## 5. 🏭 Mixing Department

**ID Role:** 5
**Display Name:** Mixing Department
**Deskripsi:** Mixing Department yang mengelola raw material mixing

### Permissions:

- ✅ Login ke sistem
- ✅ Lihat laporan milik sendiri
- ✅ Buat laporan mixing
- ✅ Lihat daftar part types
- ✅ Search laporan
- ❌ Lihat laporan orang lain
- ❌ Create/edit part types
- ❌ Manage users

### Demo Account:

```
Email: mixing@yamatogomu.com
Password: password123
Department: Mixing
Phone: 081234567895
```

### Typical Dashboard:

- Dashboard dengan mixing info
- Halaman laporan untuk mixing activities
- Create mixing reports
- Material tracking

---

## 6. 💻 Admin IT

**ID Role:** 6
**Display Name:** Admin IT
**Deskripsi:** Administrator IT System, full system access

### Permissions:

- ✅ Login ke sistem
- ✅ Lihat SEMUA laporan
- ✅ Buat laporan
- ✅ Lihat daftar part types
- ✅ Create/edit/delete part types ⭐
- ✅ **Manage users & roles** ⭐⭐ (future)
- ✅ System settings (future)
- ✅ View audit logs (future)
- ✅ Full admin access

### Demo Account:

```
Email: admin@yamatogomu.com
Password: password123
Department: IT
Phone: 081234567890
```

### Typical Dashboard:

- Dashboard dengan system overview
- Halaman laporan untuk view SEMUA laporan
- Halaman parts management
- (Future) Halaman user management
- (Future) System settings & configuration
- Full access ke semua fitur

---

## Permission Matrix

| Feature          | Operator | Admin Press | QC  | Supervisi | Mixing | Admin IT |
| ---------------- | -------- | ----------- | --- | --------- | ------ | -------- |
| Login            | ✅       | ✅          | ✅  | ✅        | ✅     | ✅       |
| Create Report    | ✅       | ✅          | ✅  | ✅        | ✅     | ✅       |
| View Own Reports | ✅       | ✅          | ✅  | ✅        | ✅     | ✅       |
| View All Reports | ❌       | ✅          | ❌  | ❌        | ❌     | ✅       |
| View Parts       | ✅       | ✅          | ✅  | ✅        | ✅     | ✅       |
| Create Parts     | ❌       | ✅          | ❌  | ❌        | ❌     | ✅       |
| Edit Parts       | ❌       | ✅          | ❌  | ❌        | ❌     | ✅       |
| Delete Parts     | ❌       | ❌          | ❌  | ❌        | ❌     | ✅       |
| Manage Users     | ❌       | ❌          | ❌  | ❌        | ❌     | ✅       |
| System Settings  | ❌       | ❌          | ❌  | ❌        | ❌     | ✅       |

---

## Default Demo Users

Setiap role sudah memiliki 1 demo user untuk testing:

```sql
-- Admin IT
INSERT INTO users VALUES (6, 'Admin IT', 'admin@yamatogomu.com', '...hashed...', 6, '081234567890', 'IT', ...);

-- Operator
INSERT INTO users VALUES (2, 'Operator 1', 'operator@yamatogomu.com', '...hashed...', 1, '081234567891', 'Press', ...);

-- Admin Press
INSERT INTO users VALUES (3, 'Admin Press', 'admin.press@yamatogomu.com', '...hashed...', 2, '081234567892', 'Press', ...);

-- QC
INSERT INTO users VALUES (4, 'QC Staff', 'qc@yamatogomu.com', '...hashed...', 3, '081234567893', 'QC', ...);

-- Supervisi Press
INSERT INTO users VALUES (5, 'Supervisi Press', 'supervisi@yamatogomu.com', '...hashed...', 4, '081234567894', 'Press', ...);

-- Mixing Department
INSERT INTO users VALUES (7, 'Mixing Department', 'mixing@yamatogomu.com', '...hashed...', 5, '081234567895', 'Mixing', ...);
```

Password semua: `password123`

---

## How Permissions are Implemented

### Backend (Laravel)

```php
// Check role di controller
if ($user->role->name !== 'admin_press' && $user->role->name !== 'admin_it') {
    return response()->json(['message' => 'Unauthorized'], 403);
}

// Filter data berdasarkan role
if ($user->role->name !== 'admin_press' && $user->role->name !== 'admin_it') {
    $query->where('user_id', $user->id); // Only own reports
}
```

### Frontend (Next.js)

```tsx
// Check role di component
if (user?.role?.name === "admin_press" || user?.role?.name === "admin_it") {
  return <AdminPanel />;
}

// Conditional rendering
{
  (user?.role?.name === "admin_press" || user?.role?.name === "admin_it") && (
    <Link href="/dashboard/parts">Kelola Part</Link>
  );
}
```

---

## Adding New Users

### Via Database Seeder (Recommended)

Edit `database/seeders/DatabaseSeeder.php`:

```php
User::factory()->create([
    'name' => 'New Operator',
    'email' => 'newoperator@yamatogomu.com',
    'password' => bcrypt('password123'),
    'role_id' => 1, // Operator
    'phone' => '081234567896',
    'department' => 'Press',
]);
```

Then run:

```bash
php artisan migrate:refresh --seed
```

### Via API (Future)

```
POST /api/users
{
    "name": "New User",
    "email": "newuser@yamatogomu.com",
    "password": "password123",
    "role_id": 1
}
```

---

## Changing User Roles

Update user role di database:

```sql
UPDATE users SET role_id = 2 WHERE email = 'operator@yamatogomu.com';
-- Mengubah Operator menjadi Admin Press
```

User harus re-login untuk role changes berlaku.

---

## Future Enhancements

- [ ] User management page (Admin IT)
- [ ] Create user functionality
- [ ] Edit user roles
- [ ] Disable/delete users
- [ ] Role creation (custom roles)
- [ ] Permission management UI
- [ ] Audit logs untuk role changes
- [ ] Two-factor authentication
- [ ] Role-based resource limits
- [ ] Department-based filtering

---

## Questions?

Refer ke:

- API_DOCUMENTATION.md untuk API details
- SETUP_GUIDE.md untuk setup issues
