# API Documentation - PT. Yamatogomu

## Base URL

```
http://localhost:8000/api
```

## Authentication

Semua endpoint (kecuali login) memerlukan token authentication via header:

```
Authorization: Bearer {token}
```

---

## Authentication Endpoints

### Login

**POST** `/auth/login`

Login user dan dapatkan authentication token.

**Request Body:**

```json
{
  "email": "operator@yamatogomu.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 2,
    "name": "Operator 1",
    "email": "operator@yamatogomu.com",
    "phone": "081234567891",
    "department": "Press",
    "role": {
      "id": 1,
      "name": "operator",
      "display_name": "Operator"
    }
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "message": "Invalid credentials"
}
```

---

### Logout

**POST** `/auth/logout`

Logout user dan invalidate token.

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "message": "Logout successful"
}
```

---

### Get Current User

**GET** `/auth/me`

Get informasi user yang sedang login.

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "id": 2,
  "name": "Operator 1",
  "email": "operator@yamatogomu.com",
  "phone": "081234567891",
  "department": "Press",
  "role": {
    "id": 1,
    "name": "operator",
    "display_name": "Operator"
  }
}
```

---

## Reports Endpoints

### Get All Reports

**GET** `/reports`

Get daftar semua reports. Operator hanya bisa lihat report mereka sendiri. Admin Press dan Admin IT bisa lihat semua.

**Headers:**

```
Authorization: Bearer {token}
```

**Query Parameters:**

- `page` (optional): Halaman (default 1)
- `per_page` (optional): Item per halaman (default 20)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "title": "Laporan Press Line A",
        "quantity": 150,
        "status": "draft",
        "report_date": "2026-01-13T08:00:00.000000Z",
        "user": {
          "id": 2,
          "name": "Operator 1",
          "email": "operator@yamatogomu.com"
        },
        "partType": {
          "id": 1,
          "part_number": "PT-001",
          "part_name": "Engine Seal"
        },
        "created_at": "2026-01-13T08:00:00.000000Z",
        "updated_at": "2026-01-13T08:00:00.000000Z"
      }
    ],
    "current_page": 1,
    "per_page": 20,
    "total": 5
  }
}
```

---

### Get Report Detail

**GET** `/reports/{id}`

Get detail report spesifik.

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Laporan Press Line A",
    "content": "Produksi berjalan lancar...",
    "quantity": 150,
    "status": "draft",
    "report_date": "2026-01-13T08:00:00.000000Z",
    "user": {
      "id": 2,
      "name": "Operator 1"
    },
    "partType": {
      "id": 1,
      "part_number": "PT-001",
      "part_name": "Engine Seal"
    },
    "created_at": "2026-01-13T08:00:00.000000Z"
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "message": "Report not found"
}
```

---

### Create Report

**POST** `/reports`

Buat report baru.

**Headers:**

```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**

```json
{
  "part_type_id": 1,
  "title": "Laporan Produksi Shift Pagi",
  "content": "Produksi berjalan normal. Tidak ada hambatan.",
  "quantity": 250,
  "report_date": "2026-01-13"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Report created successfully",
  "data": {
    "id": 6,
    "user_id": 2,
    "part_type_id": 1,
    "title": "Laporan Produksi Shift Pagi",
    "content": "Produksi berjalan normal. Tidak ada hambatan.",
    "quantity": 250,
    "status": "draft",
    "report_date": "2026-01-13T00:00:00.000000Z",
    "created_at": "2026-01-13T08:00:00.000000Z",
    "updated_at": "2026-01-13T08:00:00.000000Z"
  }
}
```

**Validation Error (422 Unprocessable Entity):**

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "part_type_id": ["The part type id field is required."],
    "title": ["The title field is required."]
  }
}
```

---

### Search Reports by Part Number

**GET** `/reports/search/part?q={search}`

Cari reports berdasarkan nomor part atau nama part.

**Headers:**

```
Authorization: Bearer {token}
```

**Query Parameters:**

- `q` (required): Keyword pencarian
- `page` (optional): Halaman
- `per_page` (optional): Item per halaman

**Example:**

```
GET /reports/search/part?q=PT-001&page=1
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "title": "Laporan Press Line A",
        "quantity": 150,
        "report_date": "2026-01-13T08:00:00.000000Z",
        "partType": {
          "part_number": "PT-001",
          "part_name": "Engine Seal"
        }
      }
    ]
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "message": "Part number query is required"
}
```

---

### Search Reports by Date

**GET** `/reports/search/date?start_date={date}&end_date={date}`

Cari reports berdasarkan range tanggal.

**Headers:**

```
Authorization: Bearer {token}
```

**Query Parameters:**

- `start_date` (required): Tanggal mulai (format: YYYY-MM-DD)
- `end_date` (required): Tanggal akhir (format: YYYY-MM-DD)
- `page` (optional): Halaman
- `per_page` (optional): Item per halaman

**Example:**

```
GET /reports/search/date?start_date=2026-01-01&end_date=2026-01-31&page=1
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "title": "Laporan Press Line A",
        "quantity": 150,
        "report_date": "2026-01-13T08:00:00.000000Z",
        "partType": {
          "part_number": "PT-001",
          "part_name": "Engine Seal"
        }
      }
    ]
  }
}
```

---

### Download Report

**POST** `/reports/{id}/download`

Download/export report sebagai file.

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Report ready for download",
  "data": {
    "id": 1,
    "title": "Laporan Press Line A",
    "quantity": 150,
    "report_date": "2026-01-13T08:00:00.000000Z"
  }
}
```

---

## Part Types Endpoints

### Get All Part Types

**GET** `/part-types`

Get daftar semua jenis part.

**Headers:**

```
Authorization: Bearer {token}
```

**Query Parameters:**

- `q` (optional): Keyword pencarian
- `page` (optional): Halaman
- `per_page` (optional): Item per halaman

**Example:**

```
GET /part-types?q=engine&page=1
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "part_number": "PT-001",
        "part_name": "Engine Seal",
        "description": "Seal untuk mesin mobil",
        "category": "Seal",
        "created_at": "2026-01-13T08:00:00.000000Z",
        "updated_at": "2026-01-13T08:00:00.000000Z"
      },
      {
        "id": 2,
        "part_number": "PT-002",
        "part_name": "Brake Pad Support",
        "description": "Support untuk brake pad",
        "category": "Brake",
        "created_at": "2026-01-13T08:00:00.000000Z",
        "updated_at": "2026-01-13T08:00:00.000000Z"
      }
    ],
    "current_page": 1,
    "per_page": 20,
    "total": 5
  }
}
```

---

### Get Part Type Detail

**GET** `/part-types/{id}`

Get detail part type spesifik.

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "part_number": "PT-001",
    "part_name": "Engine Seal",
    "description": "Seal untuk mesin mobil",
    "category": "Seal",
    "created_at": "2026-01-13T08:00:00.000000Z",
    "updated_at": "2026-01-13T08:00:00.000000Z"
  }
}
```

---

### Create Part Type

**POST** `/part-types`

Buat jenis part baru. **HANYA Admin Press dan Admin IT yang bisa.**

**Headers:**

```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**

```json
{
  "part_number": "PT-006",
  "part_name": "Door Handle",
  "category": "Handle",
  "description": "Handle untuk pintu mobil"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Part type created successfully",
  "data": {
    "id": 6,
    "part_number": "PT-006",
    "part_name": "Door Handle",
    "category": "Handle",
    "description": "Handle untuk pintu mobil",
    "created_at": "2026-01-13T08:00:00.000000Z",
    "updated_at": "2026-01-13T08:00:00.000000Z"
  }
}
```

**Error Response (403 Forbidden):**

```json
{
  "message": "Unauthorized"
}
```

**Validation Error (422 Unprocessable Entity):**

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "part_number": ["The part number has already been taken."],
    "part_name": ["The part name field is required."]
  }
}
```

---

## Role-Based Access

| Endpoint         | Operator | Admin Press | QC       | Supervisi | Mixing   | Admin IT |
| ---------------- | -------- | ----------- | -------- | --------- | -------- | -------- |
| POST /auth/login | ✅       | ✅          | ✅       | ✅        | ✅       | ✅       |
| GET /reports     | Own only | All         | Own only | Own only  | Own only | All      |
| POST /reports    | ✅       | ✅          | ✅       | ✅        | ✅       | ✅       |
| GET /part-types  | ✅       | ✅          | ✅       | ✅        | ✅       | ✅       |
| POST /part-types | ❌       | ✅          | ❌       | ❌        | ❌       | ✅       |

---

## HTTP Status Codes

| Code | Meaning                                              |
| ---- | ---------------------------------------------------- |
| 200  | OK - Request berhasil                                |
| 201  | Created - Resource berhasil dibuat                   |
| 400  | Bad Request - Request tidak valid                    |
| 401  | Unauthorized - Tidak authenticated/token tidak valid |
| 403  | Forbidden - User tidak punya permission              |
| 404  | Not Found - Resource tidak ditemukan                 |
| 422  | Unprocessable Entity - Validation error              |
| 500  | Internal Server Error - Server error                 |

---

## Common Headers

```
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
```

---

## Example cURL Requests

### Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "operator@yamatogomu.com",
    "password": "password123"
  }'
```

### Get Reports

```bash
curl -X GET http://localhost:8000/api/reports \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Report

```bash
curl -X POST http://localhost:8000/api/reports \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "part_type_id": 1,
    "title": "Laporan Produksi",
    "quantity": 100,
    "report_date": "2026-01-13"
  }'
```

### Search Reports by Date

```bash
curl -X GET "http://localhost:8000/api/reports/search/date?start_date=2026-01-01&end_date=2026-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Rate Limiting

Saat ini tidak ada rate limiting. Untuk production, recommend menambahkan throttle middleware.

---

## Error Handling

Semua error response akan memiliki format:

```json
{
  "message": "Error message",
  "errors": {
    "field_name": ["Error detail"]
  }
}
```
