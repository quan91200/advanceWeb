<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Posts;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Thêm bình luận mới vào bài đăng
    public function store(Request $request, Posts $post)
    {
        $validated = $request->validate([
            // 1 trong 2 null
            'content' => 'nullable|string|required_without:image_url',
            'image_url' => 'nullable|url|required_without:content', 
        ]);

        $comment = Comment::create([
            'post_id' => $post->id,
            'created_by' => $request->user()->id,
            'updated_by' => $request->user()->id,
            'content' => $request->content,
            'image_url' => $request->image_url,
        ]);

        return redirect()->route('posts.show', $post->id);
    }

    // Chỉnh sửa bình luận
    public function edit(Comment $comment)
    {
        return view('comments.edit', compact('comment'));
    }

    // Cập nhật bình luận
    public function update(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            // 1 trong 2 null
            'content' => 'nullable|string|required_without:image_url',
            'image_url' => 'nullable|url|required_without:content', 
        ]);

        $comment->update([
            'content' => $request->content,
            'image_url' => $request->image_url,
        ]);

        return redirect()->route('posts.show', $comment->post_id);
    }

    // Xóa bình luận
    public function destroy(Comment $comment)
    {
        $comment->delete();

        return redirect()->route('posts.show', $comment->post_id);
    }
}