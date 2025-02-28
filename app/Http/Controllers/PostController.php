<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    // Hiển thị danh sách bài viết
    public function index()
    {
        $posts = Post::with('user')
            ->publicAndFriend(auth()->id())
            ->createdAt()
            ->paginate(5);
        return inertia('Post/Index', [
            'posts' => PostResource::collection($posts)
        ]);
    }
    // Hiển thị bài viết cụ thể
    public function show(Post $post)
    {
        // eager load quan hệ khi cần thiết
        $post->load(['user', 'updatedBy', 'comments', 'reactions']);
        return inertia('Post/Show', [
            'post' => new PostResource($post)
        ]);
    }
    // Tạo bài viết mới
    public function store(PostRequest $request)
    {
        $validated = $request->validated();
        // Nếu có ảnh, lưu vào storage và lấy đường dẫn
        if ($request->hasFile('image_url')) {
            $imageUrl = $request->file('image_url')->store('posts', 'public');
        } else {
            $imageUrl = null;
        }
        Post::create([
            'content' => $validated['content'],
            'status' => $validated['status'],
            'image_url' => $imageUrl,
            'created_by' => $request->user()->id,
            'updated_by' => $request->user()->id,
        ]);
        return Inertia::location(route('posts.index'));
    }
    // Hiển thị form chỉnh sửa bài viết
    public function edit(Post $post)
    {
        return inertia('Post/Edit', [
            'post' => new PostResource($post)
        ]);
    }
    // Cập nhật bài viết
    public function update(PostRequest $request, Post $post)
    {
        $validated = $request->validated();
        // Nếu có ảnh mới, lưu vào storage và cập nhật đường dẫn
        if ($request->hasFile('image_url')) {
            $imageUrl = $request->file('image_url')->store('posts', 'public');
            // Xóa ảnh cũ nếu có
            if ($post->image_url) {
                unlink(storage_path('app/public/' . $post->image_url));
            }
        } else {
            $imageUrl = $post->image_url; // Giữ nguyên ảnh cũ nếu không có ảnh mới
        }
        $post->update([
            'content' => $validated['content'],
            'status' => $validated['status'],
            'image_url' => $imageUrl,
            'updated_by' => $request->user()->id,
        ]);
        return Inertia::location(route('posts.show', $post));
    }
    // Xóa bài viết
    public function destroy(Post $post)
    {
        $post->delete();
        return back()->with('success', 'Post deleted successfully.');
    }
}
