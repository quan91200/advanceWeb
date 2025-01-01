<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        // Kiểm tra nếu người dùng là admin hoặc người dùng thông thường
        if ($user && $user->isAdmin()) {
            $posts = \App\Models\Posts::with('user')->paginate(10);
        } else {
            // Người dùng: Hiển thị bài đăng public và friend
            $posts = \App\Models\Posts::with('user')
                ->whereIn('status', ['public', 'friend'])
                ->paginate(10);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(), // Thông tin người dùng
                'role' => $request->user() ? $request->user()->role: null, // Role
                'posts' => $posts, // Chia sẻ bài viết tùy thuộc vào quyền người dùng
            ],
        ];
    }
}
