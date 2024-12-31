<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Http\Resources\PostResource;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;
class PostController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $posts = auth()->user()->posts()
            ->withCount('comments')
            ->with('user') 
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1)
            ->map(function($post) {
                $post->image_url = $post->image_url ? Storage::url($post->image_url) : null;
                return $post;
        });
        return Inertia::render('Posts/Index', [
            'posts' => PostResource::collection($posts),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function create()
    {
        return Inertia::render('Posts/Create', [
            'status' => ['public', 'private', 'friend']
        ]);
    }

    public function store(StorePostRequest $request)
    {   
        $data = $request->validated();
        $imagePath = null;
        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');
            $imagePath = $file->storeAs('posts', time() . '.' . $file->getClientOriginalExtension(), 'public');
        }
        // Gắn đường dẫn ảnh vào dữ liệu
        $data['image_url'] = $imagePath;
            // Tạo bài đăng mới
            Posts::create($data);

            return redirect()->route('posts.index');
    }
    // Hiển thị form chỉnh sửa bài đăng
    public function edit(Posts $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => new PostResource($post),
            'status' => ['public', 'private', 'friend']
        ]);
    }

    public function update(UpdatePostRequest $request, Posts $post)
    {
        // Validate dữ liệu đầu vào
        $data = $request->validated();
    
        // Kiểm tra và lưu ảnh mới nếu có
        $imagePath = $post->image_url; // Lấy ảnh cũ nếu không có ảnh mới
        if ($request->hasFile('image_url')) {
            // Xóa ảnh cũ nếu có
            if ($post->image_url && Storage::exists('public/' . $post->image_url)) {
                Storage::delete('public/' . $post->image_url);
            }
            $imagePath = $request->file('image_url')->storeAs('posts', time() . '.' . $request->file('image_url')->getClientOriginalExtension(), 'public');
        }
        // Gắn đường dẫn ảnh vào dữ liệu
        $data['image_url'] = $imagePath;
        // Cập nhật bài đăng
        $post->update($data);
        return redirect()->route('posts.index');
    }  
    public function destroy(Posts $post)
    {
        // Xóa ảnh liên quan nếu có
        if ($post->image_url && Storage::exists('public/' . $post->image_url)) {
            Storage::delete('public/' . $post->image_url);
        }
        $post->delete();
        return redirect()->route('posts.index');
    }

}