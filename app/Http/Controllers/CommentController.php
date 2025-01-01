<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Models\Posts;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Thêm bình luận mới vào bài đăng
    public function store(StoreCommentRequest $request, Posts $post)
    {   
        Comment::create([
            'post_id' => $post->id,
            'created_by' => $request->user()->id,
            'updated_by' => $request->user()->id,
            'content' => $request->content,
            'image_url' => $request->image_url,
        ]);
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        $query = $post->comments();

        if (request("created_by")) {
            $query->where("created_by", "like", "%" . request("created_by") . "%");
        }
        $comments = $query->orderBy($sortField, $sortDirection)->get();

        return redirect()->route('posts.show', $post->id)->with('comments', $comments);
    }

    // Chỉnh sửa bình luận
    public function edit(Comment $comment)
    {
        return view('comments.edit', compact('comment'));
    }

    // Cập nhật bình luận
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        $validated = $request->validated();
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