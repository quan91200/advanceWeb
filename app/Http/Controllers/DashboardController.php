<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userCurrent = Auth::user()?->load(['posts', 'hobbies']);
        $postCount = Post::count();
        $userCount = User::count();
        $search = $request->input("search", '');
        $post = Post::query()
            ->where('content', 'like', "%{$search}%")
            ->paginate(10);
        $user = User::query()
            ->where('name', 'like', "%{$search}%")
            ->orWhere('email', 'like', "%{$search}%")
            ->take(5)
            ->get();
        Log::info('Dashboard Data', [
            'post' => $post,
            'user' => $user,
            'post_count' => $postCount,
            'user_count' => $userCount,
        ]);
            
        return inertia('Dashboard', [
            'userCurrent' => $userCurrent ? (new UserResource($userCurrent))->resolve() : null,
            'post' => (PostResource::collection($post))->resolve(),
            'user' => (UserResource::collection($user))->resolve(),
            'search' => $search,
            'post_count' => $postCount,
            'user_count' => $userCount,
        ]);
    }
}
