<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // Hiển thị danh sách bài viết
    public function index()
    {
        $posts = Post::all();
        return view('posts.index', compact('posts'));
    }

    // Hiển thị form tạo bài viết
    public function create()
    {
        $users = User::all();  // Lấy danh sách người dùng để chọn làm người tạo bài viết
        return view('posts.create', compact('users'));
    }

    // Lưu bài viết vào cơ sở dữ liệu
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'desc' => 'required|string',
            'status' => 'required|string',
        ]);

        Post::create([
            'title' => $request->title,
            'desc' => $request->desc,
            'status' => $request->status,
            'created_by' => $request->created_by,  // Người tạo bài viết
            'updated_by' => $request->updated_by,  // Người cập nhật bài viết
        ]);

        return redirect()->route('posts.index');
    }

    // Hiển thị chi tiết bài viết
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return view('posts.show', compact('post'));
    }

    // Hiển thị form chỉnh sửa bài viết
    public function edit($id)
    {
        $post = Post::findOrFail($id);
        $users = User::all();
        return view('posts.edit', compact('post', 'users'));
    }

    // Cập nhật bài viết
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'desc' => 'required|string',
            'status' => 'required|string',
        ]);

        $post = Post::findOrFail($id);
        $post->update($request->all());

        return redirect()->route('posts.index');
    }

    // Xóa bài viết
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return redirect()->route('posts.index');
    }
}

