<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('/home', UserController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('posts', PostController::class);
    Route::get('/posts/trashed/{userId}', [PostController::class, 'trashed'])->name('posts.trashed');
    Route::get('/posts/restore/{id}', [PostController::class, 'restore'])->name('posts.restore');
    Route::get('/posts/force-delete/{id}', [PostController::class, 'forceDelete'])->name('posts.forceDelete');
    Route::post('posts/restore-all/{userId}', [PostController::class, 'restoreAll'])->name('posts.restoreAll');
    Route::post('posts/force-delete-all/{userId}', [PostController::class, 'forceDeleteAll'])->name('posts.forceDeleteAll');

    Route::resource('user', UserController::class);

    Route::resource('posts.comments', CommentController::class)->only(['store', 'update', 'destroy']);
});

require __DIR__.'/auth.php';
