<?php

namespace App\Http\Controllers;
use App\Models\Posts;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Log;
class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $postsCount = Posts::count(); 
        $usersCount = User::count();   

        $search = $request->input("search", '');
        $posts = Posts::query()
            ->where('content', 'like', "%{$search}%")
            ->paginate(10);
        $users = User::query()
            ->where('name', 'like', "%{$search}%")
            ->orWhere('email', 'like', "%{$search}%")
            ->take(5)
            ->get();
        return inertia('Dashboard', [
            'posts' => PostResource::collection($posts),
            'users' => UserResource::collection($users),
            'search' => $search,
            'posts_count' => $postsCount,
            'users_count' => $usersCount,
        ]);
    }
}
