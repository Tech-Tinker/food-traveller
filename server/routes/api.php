<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\UserController;
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

Route::post('/recipe', [RecipeController::class, 'show']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/recipes', [RecipeController::class, 'index']);
    Route::post('/recipe', [RecipeController::class, 'store']);
    Route::get('/recipe/{id}', [RecipeController::class, 'show']);
    Route::put('/recipe/{id}', [RecipeController::class, 'update']);
    Route::delete('/recipe/{id}', [RecipeController::class, 'destroy']);
    
    // Ruta para obtener el perfil del usuario
Route::middleware(['auth:sanctum'])->get('/user-profile', [UserController::class, 'getUserProfile']);
});

