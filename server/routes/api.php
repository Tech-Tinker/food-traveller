<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RecipeController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Route::get('/recipes', [RecipeController::class, 'index']);
// Route::get('/recipe/{id}', [RecipeController::class, 'show']);
// Route::post('/recipe', [RecipeController::class, 'store']);




Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/recipes', [RecipeController::class, 'index']);
    Route::post('/recipe', [RecipeController::class, 'store']);
    Route::get('/recipe/{id}', [RecipeController::class, 'show']);
    // Route::put('/recipe/{id}', [RecipeController::class, 'edit']);
    Route::put('/recipe/{id}', [RecipeController::class, 'update']);
    Route::delete('/recipe/{id}', [RecipeController::class, 'destroy']);
});
