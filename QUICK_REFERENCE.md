# 🚀 Quick Reference & Commands

## Database Commands

### Setup Database

```bash
# Create database (MySQL)
CREATE DATABASE yamatogomu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Or via terminal
mysql -u root -p -e "CREATE DATABASE yamatogomu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### Run Migrations

```bash
# Run all migrations
php artisan migrate

# Run specific migration
php artisan migrate --path=database/migrations/2026_01_13_000000_create_roles_table.php

# Rollback all
php artisan migrate:rollback

# Refresh (reset) database
php artisan migrate:refresh

# Refresh with seed
php artisan migrate:refresh --seed

# Reset to fresh database
php artisan migrate:reset
```

### Run Seeders

```bash
# Run all seeders
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=RoleSeeder

# Run seeders after migrations
php artisan migrate --seed

# Or with refresh
php artisan migrate:refresh --seed
```

---

## Laravel Commands

### Key Generation

```bash
# Generate app key
php artisan key:generate

# Generate key untuk production
php artisan key:generate --force
```

### Serve Application

```bash
# Start development server
php artisan serve

# Serve on specific host/port
php artisan serve --host=0.0.0.0 --port=8000

# With reload on file changes
php artisan serve --poll
```

### Cache Commands

```bash
# Clear all cache
php artisan cache:clear

# Clear config cache
php artisan config:clear

# Clear view cache
php artisan view:clear

# Clear application cache
php artisan optimize:clear
```

### Route Commands

```bash
# List all routes
php artisan route:list

# List API routes only
php artisan route:list --path=api
```

### Tinker (REPL)

```bash
# Open interactive shell
php artisan tinker

# Contoh commands:
User::all()
User::find(1)->role
Role::create(['name' => 'test', 'display_name' => 'Test'])
```

---

## Composer Commands

### Install/Update

```bash
# Install dependencies
composer install

# Update dependencies
composer update

# Update specific package
composer update laravel/sanctum

# Install dev dependencies
composer install --dev
```

### Require Package

```bash
# Add new package
composer require package-name

# Add dev package
composer require --dev package-name

# Remove package
composer remove package-name
```

### Optimization

```bash
# Optimize autoloader
composer dump-autoload

# Optimize for production
composer dump-autoload --optimize

# Optimize with classmap
composer dump-autoload --classmap-authoritative
```

---

## Next.js Commands

### Installation & Development

```bash
# Install dependencies
npm install
# atau
yarn install
# atau
pnpm install

# Start development server
npm run dev
# Server berjalan di http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Build and start
npm run build && npm start
```

### Development Tools

```bash
# Run linter
npm run lint

# Format code
npm run format

# Type checking
npm run type-check

# All checks
npm run check
```

---

## Environment Setup

### Backend .env Setup

```bash
# Copy template
cp .env.example .env

# Edit .env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=yamatogomu
DB_USERNAME=root
DB_PASSWORD=

# Generate key
php artisan key:generate
```

### Frontend .env Setup

```bash
# Create .env.local
touch .env.local

# Add content
echo 'NEXT_PUBLIC_API_URL=http://localhost:8000' > .env.local
```

---

## Useful SQL Queries

### Check Users

```sql
SELECT u.id, u.name, u.email, r.display_name as role
FROM users u
LEFT JOIN roles r ON u.role_id = r.id
ORDER BY u.id;
```

### Check Reports

```sql
SELECT r.id, r.title, r.quantity, r.report_date, u.name as operator, pt.part_number
FROM reports r
JOIN users u ON r.user_id = u.id
JOIN part_types pt ON r.part_type_id = pt.id
ORDER BY r.report_date DESC;
```

### Check Roles

```sql
SELECT id, name, display_name, description FROM roles;
```

### Check Part Types

```sql
SELECT id, part_number, part_name, category FROM part_types;
```

### Reset User Password

```sql
-- Update user password (bcrypt hash)
UPDATE users SET password = '$2y$12$...' WHERE id = 1;

-- Or in Laravel tinker:
-- User::find(1)->update(['password' => bcrypt('newpassword123')])
```

---

## Testing Endpoints

### Using cURL

#### Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "operator@yamatogomu.com",
    "password": "password123"
  }'
```

#### Get Current User

```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Get All Reports

```bash
curl -X GET http://localhost:8000/api/reports \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Create Report

```bash
curl -X POST http://localhost:8000/api/reports \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "part_type_id": 1,
    "title": "Test Report",
    "quantity": 100,
    "report_date": "2026-01-13"
  }'
```

#### Search Reports by Part

```bash
curl -X GET "http://localhost:8000/api/reports/search/part?q=PT-001" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Search Reports by Date

```bash
curl -X GET "http://localhost:8000/api/reports/search/date?start_date=2026-01-01&end_date=2026-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Import POST request ke `http://localhost:8000/api/auth/login`
2. Send dengan body:

```json
{
  "email": "operator@yamatogomu.com",
  "password": "password123"
}
```

3. Copy token dari response
4. Set `Authorization` header ke `Bearer {token}` untuk requests lainnya

---

## Debugging

### Laravel Logging

```bash
# Check logs
tail -f storage/logs/laravel.log

# Or on Windows
Get-Content storage/logs/laravel.log -Tail 50 -Wait
```

### Enable Debug Mode

```bash
# Edit .env
APP_DEBUG=true
APP_ENV=local

# Restart server
php artisan serve
```

### Database Debugging

```php
// Di controller/seeder
use Illuminate\Support\Facades\DB;

DB::listen(function ($query) {
    echo $query->sql;
    echo json_encode($query->bindings);
});
```

### Frontend Console

```javascript
// Check auth context
localStorage.getItem("auth_token");
localStorage.getItem("auth_user");
```

---

## Common Issues & Solutions

### Database Connection Error

```bash
# Check .env database credentials
# Restart MySQL server
# Verify database exists
mysql -u root -p -e "SHOW DATABASES;"
```

### CORS Error

```
# Check backend CORS configuration
config/cors.php

# Verify frontend URL is in allowed_origins
'allowed_origins' => [
    'http://localhost:3000',
    ...
]
```

### Token Invalid

```bash
# Regenerate key (will invalidate existing tokens)
php artisan key:generate

# Clear token cache
php artisan cache:clear
```

### Port Already in Use

```bash
# For Laravel (find what uses port 8000)
netstat -ano | findstr :8000  # Windows
lsof -i :8000                  # Mac/Linux

# Kill process
taskkill /PID <PID> /F         # Windows
kill -9 <PID>                  # Mac/Linux

# Use different port
php artisan serve --port=8001
```

### Node Modules Issue

```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules
npm install
```

---

## Performance Tips

### Backend

```bash
# Optimize autoloader
composer dump-autoload --optimize

# Cache config
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache
```

### Frontend

```bash
# Build and analyze bundle
npm run build

# Generate static export
npm run export

# Analyze bundle
npm run analyze
```

---

## Deployment Checklist

### Backend

- [ ] APP_DEBUG=false
- [ ] APP_ENV=production
- [ ] Generate production key
- [ ] Run migrations
- [ ] Run seeders (if first time)
- [ ] Verify CORS config
- [ ] Setup .env variables
- [ ] Cache configuration
- [ ] Optimize autoloader
- [ ] Setup proper logging

### Frontend

- [ ] Build production bundle
- [ ] Test API connection
- [ ] Verify .env.local
- [ ] Check HTTPS if needed
- [ ] Test all routes
- [ ] Test login flow
- [ ] Performance check

---

## Useful Resources

- Laravel Docs: https://laravel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Laravel Sanctum: https://laravel.com/docs/sanctum
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

---

## Shortcuts & Aliases

### Bash/Zsh

```bash
alias artisan='php artisan'
alias migrate='php artisan migrate'
alias seed='php artisan db:seed'
alias tinker='php artisan tinker'
alias npm-dev='npm run dev'
alias npm-build='npm run build'
```

### Git Commands

```bash
# Status
git status

# Add changes
git add .

# Commit
git commit -m "message"

# Push
git push origin main

# Pull
git pull origin main
```

---

Untuk bantuan lebih lanjut, refer ke dokumentasi resmi atau hubungi tim development.
