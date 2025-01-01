<?php

namespace App\Http\Controllers;
use App\Models\Posts;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class DashboardController extends Controller
{
    public function index(Request $request)
{
    $posts = Posts::where('created_by', auth()->id())
                 ->orderBy('created_at', 'desc')
                 ->paginate(10); 
    
    return inertia('Dashboard', [
        'posts' => PostResource::collection($posts),
        'user' => auth()->user(), 
    ]);
}
}
