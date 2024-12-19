<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Hiển thị danh sách bình luận của bài viết
    public function index($postId)
    {
        $post = Post::findOrFail($postId);
        $comments = $post->comments;  // Lấy tất cả bình luận của bài viết
        return view('comments.index', compact('post', 'comments'));
    }

    // Hiển thị form tạo bình luận
    public function create($postId)
    {
        $post = Post::findOrFail($postId);
        return view('comments.create', compact('post'));
    }

    // Lưu bình luận vào cơ sở dữ liệu
    public function store(Request $request, $postId)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        Comment::create([
            'content' => $request->content,
            'post_id' => $postId,  // Gắn bình luận với bài viết
            'created_by' => $request->created_by,  // Người tạo bình luận
        ]);

        return redirect()->route('comments.index', $postId);
    }

    // Hiển thị thông tin bình luận
    public function show($postId, $id)
    {
        $post = Post::findOrFail($postId);
        $comment = Comment::findOrFail($id);
        return view('comments.show', compact('post', 'comment'));
    }

    // Hiển thị form chỉnh sửa bình luận
    public function edit($postId, $id)
    {
        $post = Post::findOrFail($postId);
        $comment = Comment::findOrFail($id);
        return view('comments.edit', compact('post', 'comment'));
    }

    // Cập nhật bình luận
    public function update(Request $request, $postId, $id)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $comment = Comment::findOrFail($id);
        $comment->update($request->all());

        return redirect()->route('comments.index', $postId);
    }

    // Xóa bình luận
    public function destroy($postId, $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return redirect()->route('comments.index', $postId);
    }
}