<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Http\Resources\PostResource;
use App\Http\Resources\CommentResource;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class PostController extends Controller
{
    public function index()
    {
        $query = Posts::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if ($content = request("content")) {
            $query->where("content", "like", "%" . $content . "%");
        }

        if ($status = request("status")) {
            $query->where("status", $status);
        }

        $posts = $query->orderBy($sortField, $sortDirection)
            ->withCount('comments')
            ->with([
                'user',
                'comments',
            ])
            ->paginate(3)
            ->onEachSide(1);

        return inertia('Posts/Index', [
            'posts' => PostResource::collection($posts),
            'queryParams' => request()->query() ?: null,
            'user' => auth()->user(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Posts/Create');
    }
    public function show($id)
    {
        $post = Posts::with(['user', 'comments'])
            ->withCount('comments')
            ->findOrFail($id);
        return response()->json([
            'post' => new PostResource($post),
            'comments' => CommentResource::collection($post->comments),
            'comment_count' => $post->comments_count, 
        ]);
    }
    public function store(StorePostRequest $request)
    {   
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            $file = $request->file('image_url');
            $image = $file->storeAs('posts', time() . '.' . $file->getClientOriginalExtension(), 'public');
            $data['image_url'] = $image;
        } else {
            $data['image_url'] = null;
        }
        Posts::create($data);
        return redirect()->route('dashboard');
    }
    public function edit(Posts $post)
    {
        $post = Posts::findOrFail( $post->id);
        return inertia('Posts/Edit', [
            'posts' => new PostResource($post)
        ]);
    }
    public function update(UpdatePostRequest $request, Posts $post)
    {
        $data = $request->validated();
        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            if ($post->image_url && Storage::exists('public/' . $post->image_url)) {
                Storage::delete('public/' . $post->image_url);
            }
            $data['image_url'] = $request->file('image_url')->storeAs(
                'posts',
                time() . '.' . $request->file('image_url')->getClientOriginalExtension(),
                'public'
            );
        }
        $post->fill($data);
        $post->save();
        return to_route('dashboard');
    }  
    public function destroy(Posts $post)
    {
        if ($post->image_url && Storage::exists('public/' . $post->image_url)) {
            Storage::delete('public/' . $post->image_url);
        }
        $post->delete();
        return response()->json([
            'message' => 'Post deleted successfully',
            'success' => true,
        ]);
    }
    public function trashed($userId)
    {   
        $query = Posts::onlyTrashed()->where('created_by', $userId); 
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
    
        if (request("content")) {
            $query->where("content", "like", "%" . request("content") . "%");
        }
        if (request("deleted_at")) {
            $query->whereDate("deleted_at", "like", "%" . request("deleted_at") . "%");
        }        
        $trashed = $query->orderBy($sortField, $sortDirection)->paginate(10);
        return inertia('Posts/Trashed', [
            'trashed' => PostResource::collection($trashed)->additional([
                'meta' => [
                    'current_page' => $trashed->currentPage(),
                    'last_page' => $trashed->lastPage(),
                    'total' => $trashed->total(),
                ],
            ]),
            'queryParams' => request()->query() ?: null,
        ]);
    }    
    public function restore($id)
    {
        $post = Posts::onlyTrashed()->findOrFail($id);
        $post->restore(); 
        return redirect()->route('posts.trashed', ['userId' => $post->created_by]);
    }
    public function forceDelete($id)
    {
        $post = Posts::onlyTrashed()->findOrFail($id);
        $post->forceDelete();
        return redirect()->route('posts.trashed', ['userId' => $post->created_by]);
    }
    public function restoreAll($userId)
    {
        $trashed = Posts::onlyTrashed()->where('created_by', $userId)->get();
        foreach ($trashed as $post) {
            $post->restore();
        }
        return redirect()->route('posts.trashed', ['userId' => $userId]);
    }
    public function forceDeleteAll($userId)
    {
        $trashedPosts = Posts::onlyTrashed()->where('created_by', $userId)->get();
        foreach ($trashedPosts as $post) {
            $post->forceDelete();
        }
        return redirect()->route('posts.trashed', ['userId' => $userId]);
    }
}