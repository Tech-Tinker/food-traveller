<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\UserProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/recipes', [RecipeController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [UserProfileController::class, 'show']);
    Route::post('/edit-profile', [UserProfileController::class, 'update']);
    Route::delete('/profile', [UserProfileController::class, 'destroy']);
    Route::post('/recipe', [RecipeController::class, 'store']);
    Route::get('/recipe/{id}', [RecipeController::class, 'show']);
    Route::post('/recipe/{id}', [RecipeController::class, 'update']);
    Route::delete('/recipe/{id}', [RecipeController::class, 'destroy']);
});
