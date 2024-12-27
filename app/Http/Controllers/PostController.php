<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // Hiển thị tất cả bài đăng
    public function index()
    {
        $posts = Posts::with('user')->get(); 
        return view('posts.index', compact('posts'));
    }

    public function create()
    {
        return view('posts.create');
    }

    // Lưu bài đăng mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'status' => 'nullable|in:public,private,friend', 
            'image_url' => 'nullable|url',
        ]);

        Posts::create([
            'user_id' => $request->user()->id,
            'content' => $request->content,
            'status' => $request->status ?: 'public', 
            'image_url' => $request->image_url,
        ]);

        return redirect()->route('posts.index');
    }

    // Hiển thị form chỉnh sửa bài đăng
    public function edit(Posts $post)
    {
        return view('posts.edit', compact('post'));
    }

    // Cập nhật bài đăng
    public function update(Request $request, Posts $post)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'status' => 'nullable|in:public,private,friend',
            'image_url' => 'nullable|url',
        ]);

        $post->update([
            'content' => $request->content,
            'status' => $request->status ?: 'public',
            'image_url' => $request->image_url,
        ]);

        return redirect()->route('posts.index');
    }

    // Xóa bài đăng
    public function destroy(Posts $post)
    {
        $post->delete();

        return redirect()->route('posts.index');
    }
}