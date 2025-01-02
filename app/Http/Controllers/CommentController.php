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
        $query = Comment::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request('sort_direction','desc');
        if (request('created_at')) {
            $query->whereDate("created_at", request('created_at'));
        }
        $comment = $query->orderBy($sortField, $sortDirection)->get();
        return inertia("Comment/Index", [
            'comment' => CommentResource::collection($comment),
            'queryParams' => request()->query() ?: null,
            'user' => auth()->user(),
        ]);
    }
    public function create()
    {
        return inertia("Comment/Create");
    }
    // Thêm bình luận mới vào bài đăng
    public function store(StoreCommentRequest $request, Posts $post)
    {   
        $data = $request->validated();
        $post->comments()->create([
            'content' => $data['content'],
            'image_url' => $data['image_url'] ?? null,
            'created_by' => $request->user()->id,
            'updated_by' => $request->user()->id,
        ]);
        $sortDirection = $request->input("sort_direction", "desc");
        $comments = $post->comments()
            ->orderBy('created_at', $sortDirection)
            ->get();

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
            'content' => $validated['content'],
            'image_url' => $validated['image_url'] ?? null,
        ]);
        return redirect()->route('posts.show', $comment->post_id);
    }

    // Xóa bình luận
    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete();
        return redirect()->route('posts.show', $comment->post_id);
    }
}