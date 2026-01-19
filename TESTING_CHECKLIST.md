# ✅ Testing Checklist - PT. Yamatogomu

Gunakan checklist ini untuk memastikan semua fitur bekerja dengan baik.

---

## 🔐 Authentication Testing

### Login Page

- [ ] Login page dapat diakses di `/login`
- [ ] Login page memiliki input email dan password
- [ ] Login page menampilkan demo credentials
- [ ] UI login page menarik dengan logo PT. Yamatogomu
- [ ] Error message muncul untuk email/password yang salah

### Login Functionality

- [ ] Login dengan email `operator@yamatogomu.com` berhasil
- [ ] Login dengan email `admin@yamatogomu.com` berhasil
- [ ] Login dengan email `admin.press@yamatogomu.com` berhasil
- [ ] Login dengan password salah menampilkan error
- [ ] Login dengan email tidak terdaftar menampilkan error
- [ ] After login, redirect ke `/dashboard`

### Session Management

- [ ] Token disimpan di localStorage
- [ ] User info disimpan di localStorage
- [ ] Logout menghapus token dan user info
- [ ] Setelah logout, redirect ke `/login`
- [ ] Refresh page tetap authenticated (token valid)
- [ ] Akses protected route tanpa token redirect ke login

---

## 🏠 Dashboard Testing

### Dashboard Page

- [ ] Dashboard dapat diakses di `/dashboard`
- [ ] Welcome message menampilkan nama user yang login
- [ ] Dashboard menampilkan role user (Operator, Admin Press, dll)
- [ ] Sidebar navigation muncul dengan benar
- [ ] Logout button berfungsi

### Dashboard Content

- [ ] Info cards menampilkan department, email, phone
- [ ] Quick action cards muncul sesuai role
- [ ] Admin Press bisa akses "Kelola Part" card
- [ ] Admin IT bisa akses "Kelola Part" dan "Kelola User" cards
- [ ] Operator hanya bisa akses "Laporan" card
- [ ] Dashboard responsive di mobile

---

## 📋 Reports Page Testing

### Reports List

- [ ] Reports page dapat diakses dari dashboard atau sidebar
- [ ] Tabel reports menampilkan data dengan benar:
  - [ ] Tanggal laporan
  - [ ] Nomor part
  - [ ] Judul laporan
  - [ ] Quantity
  - [ ] Operator name
  - [ ] Download button

### Create Report

- [ ] "Buat Laporan" button muncul
- [ ] Click button membuka form
- [ ] Form memiliki fields: part type, tanggal, judul, quantity
- [ ] Part type dropdown populated dengan data
- [ ] Submit form membuat report baru
- [ ] New report muncul di tabel
- [ ] Cancel button menutup form tanpa save

### View Restrictions

- [ ] Operator hanya bisa lihat report milik sendiri
- [ ] Admin Press bisa lihat SEMUA reports
- [ ] Admin IT bisa lihat SEMUA reports
- [ ] QC hanya bisa lihat report milik sendiri

### Search by Part Number

- [ ] Search field muncul
- [ ] Input text untuk cari part number
- [ ] Click "Cari" filter reports by part number
- [ ] Results menampilkan matching reports
- [ ] Empty results jika tidak ada match

### Search by Date Range

- [ ] Radio button untuk pilih "Cari berdasarkan Tanggal"
- [ ] Date fields muncul untuk start dan end date
- [ ] Click "Cari" filter reports by date range
- [ ] Results menampilkan reports dalam date range
- [ ] Searching by date untuk semua users berfungsi

---

## 🔧 Parts Management Testing

### Parts List (Admin Only)

- [ ] Parts page dapat diakses untuk Admin Press
- [ ] Parts page tidak accessible untuk Operator (harus ada restriction message)
- [ ] Tabel parts menampilkan:
  - [ ] Nomor part
  - [ ] Nama part
  - [ ] Kategori
  - [ ] Deskripsi

### Create Part (Admin Only)

- [ ] "Tambah Part" button hanya muncul untuk Admin Press/IT
- [ ] Form untuk create part muncul
- [ ] Form memiliki fields: part_number, part_name, category, description
- [ ] part_number field required dan unique
- [ ] part_name field required
- [ ] Submit form membuat part baru
- [ ] New part muncul di tabel
- [ ] Duplicate part_number menampilkan error

### Search Parts

- [ ] Search field muncul
- [ ] Search by part number berfungsi
- [ ] Search by part name berfungsi
- [ ] Search by category berfungsi
- [ ] Case-insensitive search
- [ ] Empty results untuk no match

### Permission Testing

- [ ] Operator tidak bisa create parts
- [ ] QC tidak bisa create parts
- [ ] Admin Press bisa create parts
- [ ] Admin IT bisa create parts

---

## 👥 User/Role Testing

### User Accounts

Test login dengan semua 6 akun:

- [ ] Admin IT (admin@yamatogomu.com)
  - Can: view all reports, create parts, logout
  - Cannot: (nothing restricted)
- [ ] Operator (operator@yamatogomu.com)
  - Can: view own reports, create reports, logout
  - Cannot: create parts, view other's reports
- [ ] Admin Press (admin.press@yamatogomu.com)
  - Can: view all reports, create reports, create parts, logout
  - Cannot: manage users
- [ ] QC (qc@yamatogomu.com)
  - Can: view own reports, create reports, logout
  - Cannot: create parts, view other's reports
- [ ] Supervisi Press (supervisi@yamatogomu.com)
  - Can: view own reports, create reports, logout
  - Cannot: create parts, view other's reports
- [ ] Mixing Department (mixing@yamatogomu.com)
  - Can: view own reports, create reports, logout
  - Cannot: create parts, view other's reports

### Role Display

- [ ] Each user shows correct role in dashboard
- [ ] Role display name matches role config
- [ ] Department info menampilkan dengan benar
- [ ] Phone info menampilkan dengan benar

---

## 🔌 API Testing

### Health Check

- [ ] `GET /api/health` returns 200 OK

### Authentication Endpoints

- [ ] `POST /api/auth/login` dengan valid credentials return token ✅
- [ ] `POST /api/auth/login` dengan invalid credentials return 401
- [ ] `GET /api/auth/me` return current user info
- [ ] `POST /api/auth/logout` invalidate token

### Reports Endpoints

- [ ] `GET /api/reports` return list
- [ ] `POST /api/reports` create new report
- [ ] `GET /api/reports/{id}` return detail
- [ ] `GET /api/reports/search/part?q=...` search by part
- [ ] `GET /api/reports/search/date?start_date=...&end_date=...` search by date
- [ ] `POST /api/reports/{id}/download` return report for download

### Parts Endpoints

- [ ] `GET /api/part-types` return list
- [ ] `POST /api/part-types` create (only admin)
- [ ] `GET /api/part-types/{id}` return detail
- [ ] `POST /api/part-types` 403 for non-admin

### Authorization Testing

- [ ] Operator can only see own reports
- [ ] Admin can see all reports
- [ ] Non-admin cannot create parts
- [ ] Invalid token return 401
- [ ] Missing token return 401

---

## 🎨 UI/UX Testing

### Responsive Design

- [ ] Desktop (1920x1080): All elements visible and properly spaced
- [ ] Laptop (1366x768): All elements visible
- [ ] Tablet (768x1024): Layout responsive, sidebar collapse
- [ ] Mobile (375x667): Hamburger menu, vertical layout
- [ ] No horizontal scrolling on mobile

### Colors & Typography

- [ ] PT. Yamatogomu branding colors present
- [ ] Text readable with good contrast
- [ ] Font sizes appropriate for hierarchy
- [ ] Icons used appropriately (🔧, 📋, etc.)

### Navigation

- [ ] Sidebar navigation accessible
- [ ] Navigation items highlighted when active
- [ ] Breadcrumbs clear (if implemented)
- [ ] Back buttons work
- [ ] Logo navigates to home/dashboard

### Forms

- [ ] Form labels clear
- [ ] Input fields have placeholder text
- [ ] Form validation messages appear
- [ ] Submit buttons clear
- [ ] Loading state visible during submission
- [ ] Success messages appear after action
- [ ] Error messages appear on error

---

## 🔒 Security Testing

### CORS

- [ ] Frontend can communicate with backend
- [ ] Other origins cannot access API

### Password Security

- [ ] Passwords are hashed (not visible in DB)
- [ ] Password fields have type="password"
- [ ] Demo passwords are not hardcoded in frontend

### Token Security

- [ ] Token stored in localStorage (not cookie for now)
- [ ] Token sent in Authorization header
- [ ] Token expires after logout
- [ ] Token validated on backend

### Input Validation

- [ ] Empty fields show error
- [ ] Invalid email shows error
- [ ] Long strings truncated/validated
- [ ] SQL injection attempts blocked

---

## 📱 Mobile Testing

- [ ] Login page responsive
- [ ] Dashboard accessible on mobile
- [ ] Reports page scrollable on mobile
- [ ] Forms usable on mobile (inputs large enough)
- [ ] Navigation accessible on mobile
- [ ] No broken layouts
- [ ] Touch interactions work

---

## ⚡ Performance Testing

- [ ] Dashboard loads in < 2 seconds
- [ ] Reports page loads in < 2 seconds
- [ ] Search results appear quickly
- [ ] Logout is instant
- [ ] No console errors
- [ ] No memory leaks

### API Performance

- [ ] Login response < 500ms
- [ ] Get reports < 1000ms
- [ ] Create report < 1000ms
- [ ] Search < 1000ms

---

## 🐛 Browser Compatibility

Test pada browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## ♿ Accessibility Testing

- [ ] All inputs have labels
- [ ] Tab order logical
- [ ] Color contrast adequate (WCAG AA minimum)
- [ ] Icons have alt text
- [ ] Forms have error announcements
- [ ] Keyboard navigation works

---

## 📊 Data Integrity Testing

### Database

- [ ] Users table has correct data
- [ ] Roles table has 6 roles
- [ ] Reports table properly linked to users
- [ ] Part types table populated
- [ ] Foreign keys working

### Data Consistency

- [ ] Created reports match input data
- [ ] Reports timestamps accurate
- [ ] User roles consistent
- [ ] Part numbers unique

---

## 🔄 Edge Cases & Error Handling

### Error Scenarios

- [ ] Empty database (no reports) shows "No data" message
- [ ] Invalid report ID shows 404
- [ ] Concurrent report creates don't duplicate
- [ ] Deleting part with active reports (if applicable)
- [ ] Very long input strings handled
- [ ] Special characters in input handled

### Network Issues

- [ ] Offline login shows error
- [ ] Network timeout handled gracefully
- [ ] Connection loss shows error message
- [ ] Retry functionality works (if implemented)

---

## 📋 Final Verification

Before deployment, verify:

### Backend Ready

- [ ] All migrations ran successfully
- [ ] All seeders completed
- [ ] .env configured
- [ ] No error logs
- [ ] CORS configured
- [ ] Sanctum installed and configured

### Frontend Ready

- [ ] .env.local created
- [ ] npm dependencies installed
- [ ] No build errors
- [ ] No console errors
- [ ] API URL correct
- [ ] All pages load

### Documentation

- [ ] SETUP_GUIDE.md reviewed
- [ ] API_DOCUMENTATION.md reviewed
- [ ] ROLES_AND_PERMISSIONS.md reviewed
- [ ] PROJECT_SUMMARY.md reviewed
- [ ] QUICK_REFERENCE.md reviewed

### Testing

- [ ] Unit tests pass (if any)
- [ ] Integration tests pass (if any)
- [ ] Manual testing complete
- [ ] All checklist items checked

---

## 🎉 Sign-Off

Project is ready for production when all items are checked ✅

Date: ******\_******
Tested By: ******\_******
Approved By: ******\_******

---

## Notes

```
Use this section to document any issues found or special notes:

Issue #1:
Description:
Fix:

Issue #2:
Description:
Fix:
```
