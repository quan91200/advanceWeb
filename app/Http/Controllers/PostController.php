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
    public function create()
    {
        return inertia('Post/Create');
    }
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
            'user_id' => $request->user()->id,
            'created_by' => $request->user()->id,
            'updated_by' => $request->user()->id,
        ]);
        return redirect()->route('posts.index');
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
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully!');
    }
    // Thùng rác
    public function trash()
    {
        $posts = Post::onlyTrashed()->paginate(5);
        return inertia('Post/Trash', [
            'posts' => (PostResource::collection($posts))->resolve(),
        ]);
    }
    // restore
    public function restore($id)
    {
        $post = Post::onlyTrashed()->where('id', $id)->firstOrFail(); // Đúng cú pháp
        $post->restore();

        return redirect()->back()->with('success', 'Post restored successfully!');
    }
    // restore all
    public function restoreAll()
    {
        Post::onlyTrashed()->restore();
        redirect()->back()->with('success', 'All posts restored successfully!');
    }
    // delete
    public function delete(Post $post)
    {
        $post->forceDelete();
        redirect()->back()->with('success', 'Post deleted successfully!');
    }
    // delete all
    public function deleteAll()
    {
        Post::onlyTrashed()->forceDelete();
        redirect()->back()->with('success', 'All posts deleted successfully!');
    }
}
