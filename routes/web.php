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
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // User Routes
    Route::prefix('users')->name('users.')->group(function () {

        Route::get('/', [UserController::class, 'index'])->name('index'); // Lấy danh sách người dùng
        Route::get('/{id}', [UserController::class, 'show'])->where('id', '[0-9]+')->name('show'); // Hiển thị chi tiết người dùng
        Route::get('/{id}/edit', [UserController::class, 'edit'])->name('edit'); // Hiển thị form chỉnh sửa
        Route::post('/{id}', [UserController::class, 'update'])->name('update'); // Cập nhật người dùng
        // User Hobbies
        Route::get('/edit/my-hobbies={id}', [UserHobbyController::class, 'edit'])->name('hobbies.edit');
        Route::patch('/edit/my-hobbies={userId}/add-my-hobbies/{hobbyId}', [UserHobbyController::class, 'addHobbyToUser'])->name('addHobbies');
        Route::patch('/edit/my-hobbies/add-new-hobbies', [UserHobbyController::class, 'addNewHobbyToUser'])->name('newHobbies');
        Route::delete('/my-hobbies={userId}/delete/{hobbyId}', [UserHobbyController::class, 'removeHobbyFromUser'])->name('removeMyHobby');
        // Profile Routes
        Route::get('/edit/profile={id}', [ProfileController::class, 'edit'])->name('profiles.edit');
        Route::patch('/update/profile', [ProfileController::class, 'update'])->name('profiles.update');
        // Price
        Route::get('/price', [ProfileController::class, 'pricing'])->name('price');
        // Setting
        Route::get('/settings', [UserController::class, 'setting'])->name('settings'); // Hiển thị form cài đặt
        Route::get('/settings/account-center', [UserController::class,'accountCenter'])->name('settings.accountCenter'); // Trung tâm tài khoản
        Route::get('/setting/block', [UserController::class,'block'])->name('block'); // Block
        // Language
        Route::get('/setting/language', [UserController::class,'language'])->name('language'); 
        Route::post('/setting/language', [UserController::class, 'updateLanguage'])->name('updateLang');
        
        // Dark mode
        Route::get('/setting/darkmode', [UserController::class,'darkMode'])->name('darkmode'); 
        Route::post('/setting/darkmode', [UserController::class, 'updateDarkMode'])->name('updateDarkmode');

        Route::get('/setting/emotion-options', [UserController::class,'emotionOptions'])->name('emotion'); // EmotionOptions
        Route::get('/setting/community-standards', [UserController::class,'community'])->name('community'); // Community
        Route::get('/setting/privacy-policy', [UserController::class,'privacy'])->name('privacy'); // Privacy
        Route::get('/setting/terms-of-service', [UserController::class,'termOfService'])->name('terms'); // Term of service
        Route::get('/setting/notification', [UserController::class,'notification'])->name('notification'); // Notification
    });
    
    // Post Routes
    Route::prefix('posts')->name('posts.')->middleware(['auth', 'verified'])->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('index'); // Danh sách bài viết
        Route::get('/create', [PostController::class, 'create'])->name('create'); // Form tạo bài viết
        Route::post('/', [PostController::class, 'store'])->name('store'); // Xử lý tạo bài viết
        Route::get('/edit/{id}', [PostController::class, 'edit'])->name('edit'); // Form chỉnh sửa
        Route::patch('/{id}', [PostController::class, 'update'])->name('update'); // Cập nhật bài viết
        Route::delete('/{id}', [PostController::class, 'destroy'])->name('destroy'); // Xóa bài viết
        Route::get('/trash', [PostController::class,'trash'])->name("trash"); // Thùng rác
        Route::patch('/restore/{id}', [PostController::class,'restore'])->name("restore"); // Khôi phục
        Route::patch("/restore-all", [PostController::class, 'restoreAll'])->name("restoreAll"); // Khôi phục tất cả
        Route::delete('/delete/{id}', [PostController::class,'delete'])->name("delete"); // Xóa vĩnh viễn
        Route::delete('/delete-all', [PostController::class, 'deleteAll'])->name("deleteAll"); // Xóa vĩnh viễn tất cả
    });

    // Comment Routes
    Route::prefix('comments')->group(function () {
        Route::post('/', [CommentController::class, 'store'])->name('comments.store');
        Route::put('{comment}', [CommentController::class, 'update'])->name('comments.update');
        Route::delete('{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
        Route::get('post/{post}', [CommentController::class, 'show'])->name('comments.show');
    });

    // Reaction Routes
    Route::post('/reactions', [ReactionController::class, 'store'])->name('reactions.store');
    Route::delete('/reactions/{id}', [ReactionController::class, 'destroy'])->name('reactions.destroy');

    // Locations
    Route::apiResource('locations', LocationController::class);

    // Friends
    Route::prefix('friends')->group(function () {
        Route::get('/', [FriendController::class, 'index'])->name('friends.index'); // Danh sách bạn bè
        Route::post('/', [FriendController::class, 'store'])->name('friends.addfriend'); // Gửi lời mời kết bạn
        Route::patch('/{id}', [FriendController::class, 'update'])->name('friends.update'); // Chấp nhận / từ chối
        Route::delete('/{id}', [FriendController::class, 'destroy'])->name('friends.unfriend'); // Hủy kết bạn
    });
    // Groups
    Route::prefix('groups')->name('groups.')->group(function () {
        Route::get('/', [FriendController::class, 'groups'])->name('index'); // Danh sách nhóm
    });
});

require __DIR__ . '/auth.php';
