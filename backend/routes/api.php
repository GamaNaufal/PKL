<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\PartTypeController;
use App\Http\Controllers\Api\PressHistoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Health check endpoint (no authentication required)
Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'message' => 'API is running',
        'timestamp' => now(),
    ]);
});

// Authentication routes (no authentication required)
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Report routes
    Route::get('/reports', [ReportController::class, 'index']);
    Route::post('/reports', [ReportController::class, 'store']);
    Route::get('/reports/{id}', [ReportController::class, 'show']);
    Route::post('/reports/{id}/download', [ReportController::class, 'download']);
    Route::get('/reports/search/date', [ReportController::class, 'searchByDate']);
    Route::get('/reports/search/part', [ReportController::class, 'searchByPartNumber']);

    // Part Type routes
    Route::get('/part-types', [PartTypeController::class, 'index']);
    Route::post('/part-types', [PartTypeController::class, 'store']);
    Route::get('/part-types/{id}', [PartTypeController::class, 'show']);

    // Press History routes
    Route::get('/press-history', [PressHistoryController::class, 'index']);
    Route::post('/press-history', [PressHistoryController::class, 'store']);
    Route::get('/press-history/{pressHistory}', [PressHistoryController::class, 'show']);
    Route::put('/press-history/{pressHistory}', [PressHistoryController::class, 'update']);
    Route::delete('/press-history/{pressHistory}', [PressHistoryController::class, 'destroy']);
});


// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
