<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Posts;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::with(['user', 'children.user'])->paginate(10);
        return CommentResource::collection($comments);
    }
    public function show($id)
    {
        $comment = Comment::with(['user', 'children.user'])->findOrFail($id);
        return new CommentResource($comment);
    }
    // Thêm bình luận mới vào bài đăng
    public function store(StoreCommentRequest $request, Posts $post)
    {   
        $comment = $post->comments()->create([
            'content' => $request->content,
            'image_url' => $request->image,
            'user_id' => $request->user()->id,
            'parent_id' => $request->parent_id,
        ]);
        return new CommentResource($comment->load('user', 'children.user'));
    }
    // Cập nhật bình luận
    public function update(UpdateCommentRequest $request, Comment $comment, Posts $post)
    {
        if ($this->authorize('update', $comment)) {
            abort(403, 'Comment does not belong to this post.');
        }
        $comment->update($request->only('content', 'image_url'));
        return new CommentResource($comment->load('user', 'children.user'));
    }
    // Xóa bình luận
    public function destroy(Comment $comment, Posts $post)
    {
        if ($this->authorize('destroy', $comment)) {
            abort(403, 'Comment does not belong to this post.');
        }
        $comment->children()->delete();
        $comment->delete();
        return response()->json(['message' => 'Comment deleted successfully.'], 200);
    }
}