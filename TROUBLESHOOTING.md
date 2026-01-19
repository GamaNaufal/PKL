# 🔧 Troubleshooting Guide

Panduan untuk mengatasi issues yang mungkin terjadi saat setup dan running.

---

## 🚨 Backend Issues

### Issue: "Connection refused" saat migrate

**Symptoms:**

```
SQLSTATE[HY000] [2002] Connection refused
```

**Solutions:**

```bash
# 1. Check if MySQL is running
sudo service mysql status
# atau Windows: services.msc

# 2. Verify .env database credentials
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=yamatogomu
DB_USERNAME=root
DB_PASSWORD=

# 3. Create database if not exists
mysql -u root -p -e "CREATE DATABASE yamatogomu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 4. Try migrate again
php artisan migrate
```

---

### Issue: "SQLSTATE[42S02]: Table doesn't exist"

**Symptoms:**

```
SQLSTATE[42S02]: Table 'yamatogomu.users' doesn't exist
```

**Solutions:**

```bash
# 1. Check if migrations ran
php artisan migrate:status

# 2. Run all migrations
php artisan migrate

# 3. Reset and migrate (careful - deletes data)
php artisan migrate:reset
php artisan migrate

# 4. Fresh start with seeds
php artisan migrate:refresh --seed
```

---

### Issue: "SQLSTATE[42S01]: Table already exists"

**Symptoms:**

```
SQLSTATE[42S01]: Table already exists
```

**Solutions:**

```bash
# Check which migrations already ran
php artisan migrate:status

# If needed, rollback to start fresh
php artisan migrate:rollback

# Then run again
php artisan migrate
```

---

### Issue: Port 8000 already in use

**Symptoms:**

```
Address already in use
```

**Solutions:**

```bash
# Windows - Find and kill process
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux - Find and kill process
lsof -i :8000
kill -9 <PID>

# Or use different port
php artisan serve --port=8001
```

---

### Issue: "Undefined variable $user" atau sejenisnya

**Symptoms:**

```
Undefined variable: user
```

**Solutions:**

```bash
# Clear cache
php artisan cache:clear

# Clear config
php artisan config:clear

# Regenerate key
php artisan key:generate

# Restart server
php artisan serve
```

---

### Issue: CORS Error (frontend tidak bisa connect)

**Symptoms:**

```
Access to XMLHttpRequest at 'http://localhost:8000/...' from origin
'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**

```php
// Edit backend/config/cors.php
'allowed_origins' => [
    'http://localhost:3000',      // Add this
    'http://127.0.0.1:3000',      // Add this
    'http://localhost:8000',
],

// Also check .env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Then restart backend:

```bash
php artisan serve
```

---

### Issue: "Specified key was too long" saat migrate

**Symptoms:**

```
SQLSTATE[42000]: Syntax error or access violation: 1071 Specified key was too long
```

**Solutions:**

```php
// Edit app/Providers/AppServiceProvider.php
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        \Illuminate\Support\Facades\Schema::defaultStringLength(191);
    }
}
```

Then try migrate again:

```bash
php artisan migrate:refresh --seed
```

---

### Issue: Login returns 401 Unauthorized

**Symptoms:**

```json
{ "message": "Invalid credentials" }
```

**Solutions:**

```bash
# 1. Verify user exists in database
php artisan tinker
User::where('email', 'operator@yamatogomu.com')->first()

# 2. If user doesn't exist, reseed
php artisan db:seed --class=DatabaseSeeder

# 3. Verify Sanctum is configured
grep -i sanctum config/sanctum.php

# 4. Check password is bcrypt hashed
User::find(2)->password  // Should start with $2y$
```

---

### Issue: Token tidak valid / 401 on API requests

**Symptoms:**

```json
{ "message": "Unauthenticated" }
```

**Solutions:**

```bash
# 1. Check token is sent in header
# Header should be: Authorization: Bearer {token}

# 2. Verify Sanctum middleware
grep -i auth routes/api.php

# 3. Clear cache (can invalidate tokens)
php artisan cache:clear

# 4. Regenerate key (will invalidate all tokens)
php artisan key:generate
# Note: This will log out all users!
```

---

## 🌐 Frontend Issues

### Issue: "Cannot find module '@/lib/auth-context'"

**Symptoms:**

```
Module not found: Can't resolve '@/lib/auth-context'
```

**Solutions:**

```bash
# 1. Verify file exists
ls src/lib/auth-context.tsx

# 2. Check tsconfig.json has proper alias
cat tsconfig.json | grep paths

# 3. Restart dev server
npm run dev

# 4. Reinstall dependencies
rm -rf node_modules
npm install
npm run dev
```

---

### Issue: "Cannot GET /dashboard"

**Symptoms:**

```
Cannot GET /dashboard
```

**Solutions:**

```bash
# 1. Verify you're on Next.js dev server (http://localhost:3000)
# Not http://localhost:8000

# 2. Check if app running
curl http://localhost:3000

# 3. Verify routing setup
cat src/app/layout.tsx | grep AuthProvider

# 4. Try clearing .next folder
rm -rf .next
npm run dev
```

---

### Issue: Login page shows but can't login

**Symptoms:**

```
- Click login button, nothing happens
- Error in console about API
```

**Solutions:**

```bash
# 1. Check .env.local exists and has correct API URL
cat .env.local
# Should have: NEXT_PUBLIC_API_URL=http://localhost:8000

# 2. Verify backend is running
curl http://localhost:8000/api/health

# 3. Check browser console for errors
# Open DevTools → Console tab

# 4. Check network tab to see API request
# DevTools → Network tab → Look for auth/login request
```

---

### Issue: "API returned 404 for /api/auth/login"

**Symptoms:**

```
Backend error 404 for login endpoint
```

**Solutions:**

```bash
# 1. Verify route exists in backend
php artisan route:list | grep auth/login

# 2. Check api.php routes
cat routes/api.php | grep login

# 3. Verify AuthController exists
ls app/Http/Controllers/Api/AuthController.php

# 4. Check syntax in api.php
php artisan route:list
```

---

### Issue: localStorage token but still redirects to login

**Symptoms:**

```
- Token exists in localStorage
- Still redirected to login page
```

**Solutions:**

```bash
# 1. Clear localStorage and login again
# In browser console: localStorage.clear()

# 2. Check token format
# Should be a long string, not "undefined"

# 3. Verify auth-context properly sets token
# Check: src/lib/auth-context.tsx

# 4. Check page loads AuthProvider
# src/app/layout.tsx should have <AuthProvider>

# 5. Restart dev server
npm run dev
```

---

### Issue: "Next/navigation error" atau routing issues

**Symptoms:**

```
Error: useRouter must be used within Next.js App Router
```

**Solutions:**

```bash
# 1. Add 'use client' at top of file
// Add this at top of dashboard/page.tsx
'use client'

# 2. Verify file is in app directory, not pages
# Should be: src/app/dashboard/page.tsx

# 3. Restart dev server
npm run dev
```

---

### Issue: Port 3000 already in use

**Symptoms:**

```
Port 3000 is already in use
```

**Solutions:**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

---

### Issue: Styles not loading (Tailwind CSS)

**Symptoms:**

```
- Page loads but no styling
- Everything looks broken
```

**Solutions:**

```bash
# 1. Check globals.css is imported
cat src/app/globals.css

# 2. Check Tailwind config
cat tailwind.config.ts

# 3. Rebuild Tailwind
npm run build

# 4. Restart dev server
npm run dev

# 5. Clear .next cache
rm -rf .next
npm run dev
```

---

## 🔌 API Issues

### Issue: 401 Unauthorized on /api/reports

**Symptoms:**

```json
{ "message": "Unauthenticated" }
```

**Solutions:**

```bash
# 1. Verify token is sent
# Check request headers include:
# Authorization: Bearer {token}

# 2. Token might be expired
# Login again to get new token

# 3. Check token format in frontend
# Token should be a long string without quotes
```

---

### Issue: 403 Forbidden on POST /api/part-types

**Symptoms:**

```json
{ "message": "Unauthorized" }
```

**Solutions:**

```bash
# 1. Only Admin Press and Admin IT can create parts
# Login with admin@yamatogomu.com instead

# 2. Verify role_id is correct
php artisan tinker
User::find(2)->role  # Should be admin_press or admin_it

# 3. Check controller permissions
cat app/Http/Controllers/Api/PartTypeController.php | grep "admin_press"
```

---

### Issue: 422 Validation Error

**Symptoms:**

```json
{
  "message": "The given data was invalid.",
  "errors": {...}
}
```

**Solutions:**

```bash
# 1. Check request body matches required fields
# Example for create report:
{
  "part_type_id": 1,        // required
  "title": "...",           // required
  "quantity": 100,          // required
  "report_date": "2026-01-13" // required
}

# 2. Verify data types
# quantity should be integer, not string

# 3. Check field constraints
# part_number must be unique
# email must be valid format
```

---

## 📊 Database Issues

### Issue: "Unknown database 'yamatogomu'"

**Symptoms:**

```
Unknown database 'yamatogomu'
```

**Solutions:**

```bash
# Create database
mysql -u root -p
CREATE DATABASE yamatogomu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Or via command line
mysql -u root -p -e "CREATE DATABASE yamatogomu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Check it was created
mysql -u root -p -e "SHOW DATABASES;" | grep yamatogomu
```

---

### Issue: Foreign key constraint fails

**Symptoms:**

```
Foreign key constraint fails
```

**Solutions:**

```bash
# 1. Ensure parent record exists
# E.g., role_id must exist in roles table first

# 2. Run migrations in order
php artisan migrate

# 3. Check constraints in migrations
cat database/migrations/2026_01_13_000003_add_role_to_users_table.php

# 4. Reset if needed
php artisan migrate:refresh --seed
```

---

## 📝 Common Configuration Issues

### Issue: .env not being read

**Symptoms:**

```
- ENV variables not loading
- Using defaults instead
```

**Solutions:**

```bash
# 1. Clear config cache
php artisan config:clear

# 2. Verify .env exists
ls -la .env

# 3. Check file permissions (should be readable)
chmod 644 .env

# 4. No spaces around = in .env
# WRONG: DB_HOST = localhost
# RIGHT: DB_HOST=localhost

# 5. Restart server
php artisan serve
```

---

### Issue: .env.local not being read (Next.js)

**Symptoms:**

```
- Frontend can't connect to backend
- API_URL is undefined
```

**Solutions:**

```bash
# 1. Verify .env.local exists
ls -la .env.local

# 2. Check format (must have NEXT_PUBLIC_ prefix)
# WRONG: API_URL=...
# RIGHT: NEXT_PUBLIC_API_URL=...

# 3. No spaces around =
# WRONG: NEXT_PUBLIC_API_URL = http://...
# RIGHT: NEXT_PUBLIC_API_URL=http://...

# 4. Restart dev server
npm run dev

# 5. Changes to .env.local need server restart
# Kill and restart npm run dev
```

---

## 🔍 Debugging Tips

### Enable Debug Mode

```php
// Laravel - Edit .env
APP_DEBUG=true
APP_ENV=local

// Check logs
tail -f storage/logs/laravel.log
```

### Browser Console

```javascript
// Check auth state
localStorage.getItem("auth_token");
localStorage.getItem("auth_user");

// Check API calls
// Open DevTools → Network tab
// Look for requests to localhost:8000
```

### Database Debugging

```bash
# Use tinker to test
php artisan tinker

# Check users
User::all()

# Check roles
Role::all()

# Check reports
Report::with('user', 'partType')->all()
```

### API Testing

```bash
# Test health endpoint
curl http://localhost:8000/api/health

# Test login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"operator@yamatogomu.com","password":"password123"}'
```

---

## 🆘 Still Having Issues?

### Check These Files:

1. **Backend Setup**: `SETUP_GUIDE.md`
2. **API Reference**: `API_DOCUMENTATION.md`
3. **Commands**: `QUICK_REFERENCE.md`

### Common Log Locations:

```bash
# Backend
tail -f backend/storage/logs/laravel.log

# Frontend (Browser DevTools)
F12 → Console tab
F12 → Network tab
```

### Reset Everything (Last Resort)

```bash
# Backend
cd backend
php artisan migrate:refresh --seed
php artisan serve

# Frontend
cd frontend
rm -rf node_modules
npm install
npm run dev
```

---

## 📞 Support Checklist

Before asking for help, verify:

- [ ] Both frontend and backend are running
- [ ] Database exists and migrations ran
- [ ] .env files configured correctly
- [ ] No errors in browser console
- [ ] No errors in terminal/server logs
- [ ] Tried restarting servers
- [ ] Tried clearing cache
- [ ] Port numbers correct (8000, 3000)

---

## Notes

```
Found an issue not listed here?

1. Check the error message carefully
2. Look at browser/server logs
3. Try one of the common solutions
4. If still stuck:
   - Check SETUP_GUIDE.md
   - Check API_DOCUMENTATION.md
   - Check QUICK_REFERENCE.md
```

---

Last Updated: January 13, 2026
