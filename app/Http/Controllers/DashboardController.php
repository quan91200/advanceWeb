<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Posts;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Lấy tất cả bài đăng của người dùng đã đăng nhập
        $posts = Posts::with('user')->get(); 

        // Trả về view Dashboard với dữ liệu bài đăng
        return Inertia::render('Dashboard', [
            'posts' => $posts
        ]);
    }
}
