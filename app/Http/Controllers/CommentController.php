<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class CommentController extends Controller
{
    // Tạo một bình luận mới.
    public function store(CommentRequest $request)
    {
        $validated = $request->validated();
        $imageUrl = null;
        if ($request->hasFile('image_url')) {
            $imageUrl = $request->file('image_url')->store('comments_images', 'public');
        }
        $comment = Comment::create([
            'content' => $validated['content'],
            'user_id' => $request->user()->id,
            'post_id' => $validated['post_id'],
            'image_url' => $imageUrl,
            'parent_id' => $validated['parent_id'] ?? null,
        ]);
        return new CommentResource($comment);
    }
    // Cập nhật bình luận.
    public function update(CommentRequest $request, Comment $comment)
    {
        $validated = $request->validated();
        if ($comment->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if ($request->hasFile('image_url')) {
            $imageUrl = $request->file('image_url')->store('comments_images', 'public');
            $comment->update(['image_url' => $imageUrl]);
        }
        $comment->update([
            'content' => $validated['content'],
        ]);
        return new CommentResource($comment);
    }
    // Xóa bình luận.
    public function destroy(Comment $comment)
    {
        if ($comment->user_id !== request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if ($comment->image_url) {
            // Xóa ảnh khỏi hệ thống file
            Storage::disk('public')->delete($comment->image_url);
        }
        $comment->delete();
        return response()->json(['message' => 'Comment deleted successfully']);
    }
    // Hiển thị bình luận cho một bài viết.
    public function show(Post $post)
    {
        $comments = $post->comments()->with('user')->get();
        return CommentResource::collection($comments);
    }
}
