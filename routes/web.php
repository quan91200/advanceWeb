<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use App\Http\Controllers\{
    DashboardController,
    UserController,
    PostController,
    ProfileController,
    CommentController,
    ReactionController,
    UserHobbyController,
    LocationController,
    FriendController
};

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('users')->name('users.')->group(function () {

        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/{id}', [UserController::class, 'show'])->where('id', '[0-9]+')->name('show');
        Route::get('/{id}/edit', [UserController::class, 'edit'])->name('edit');
        Route::post('/{id}', [UserController::class, 'update'])->name('update');

        Route::get('/edit/my-hobbies={id}', [UserHobbyController::class, 'edit'])->name('hobbies.edit');
        Route::patch('/edit/my-hobbies={userId}/add-my-hobbies/{hobbyId}', [UserHobbyController::class, 'addHobbyToUser'])->name('addHobbies');
        Route::patch('/edit/my-hobbies/add-new-hobbies', [UserHobbyController::class, 'addNewHobbyToUser'])->name('newHobbies');
        Route::delete('/my-hobbies={userId}/delete/{hobbyId}', [UserHobbyController::class, 'removeHobbyFromUser'])->name('removeMyHobby');

        Route::get('/edit/profile={id}', [ProfileController::class, 'edit'])->name('profiles.edit');
        Route::patch('/update/profile', [ProfileController::class, 'update'])->name('profiles.update');

        Route::get('/price', [ProfileController::class, 'pricing'])->name('price');
  
        Route::get('/settings', [UserController::class, 'setting'])->name('settings');
        Route::get('/settings/account-center', [UserController::class,'accountCenter'])->name('settings.accountCenter');
        Route::get('/setting/block', [UserController::class,'block'])->name('block');
  
        Route::get('/setting/language', [UserController::class,'language'])->name('language'); 
        Route::post('/setting/language', [UserController::class, 'updateLanguage'])->name('updateLang');
        
        Route::get('/setting/darkmode', [UserController::class,'darkMode'])->name('darkmode'); 
        Route::post('/setting/darkmode', [UserController::class, 'updateDarkMode'])->name('updateDarkmode');

        Route::get('/setting/emotion-options', [UserController::class,'emotionOptions'])->name('emotion');
        Route::get('/setting/community-standards', [UserController::class,'community'])->name('community');
        Route::get('/setting/privacy-policy', [UserController::class,'privacy'])->name('privacy');
        Route::get('/setting/terms-of-service', [UserController::class,'termOfService'])->name('terms');
        Route::get('/setting/notification', [UserController::class,'notification'])->name('notification');
    });
    
    Route::prefix('posts')->name('posts.')->middleware(['auth', 'verified'])->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('index');
        Route::get('/create', [PostController::class, 'create'])->name('create');
        Route::post('/', [PostController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [PostController::class, 'edit'])->name('edit');
        Route::patch('/{id}', [PostController::class, 'update'])->name('update');
        Route::delete('/{id}', [PostController::class, 'destroy'])->name('destroy');
        Route::get('/trash', [PostController::class,'trash'])->name("trash");
        Route::patch('/restore/{id}', [PostController::class,'restore'])->name("restore");
        Route::patch("/restore-all", [PostController::class, 'restoreAll'])->name("restoreAll");
        Route::delete('/delete/{id}', [PostController::class,'delete'])->name("delete");
        Route::delete('/delete-all', [PostController::class, 'deleteAll'])->name("deleteAll");
    });

    Route::apiResource('locations', LocationController::class);

    Route::prefix('friends')->group(function () {
        Route::get('/', [FriendController::class, 'index'])->name('friends.index'); // Danh sách bạn bè
        Route::post('/', [FriendController::class, 'store'])->name('friends.addfriend'); // Gửi lời mời kết bạn
        Route::patch('/{id}', [FriendController::class, 'update'])->name('friends.update'); // Chấp nhận / từ chối
        Route::delete('/{id}', [FriendController::class, 'destroy'])->name('friends.unfriend'); // Hủy kết bạn
    });
    Route::prefix('groups')->name('groups.')->group(function () {
        Route::get('/', [FriendController::class, 'groups'])->name('index'); // Danh sách nhóm
    });
});

require __DIR__ . '/auth.php';
