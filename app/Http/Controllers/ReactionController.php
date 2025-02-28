<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReactionRequest;
use App\Http\Resources\ReactionResource;
use App\Models\Reaction;
use App\Models\Post;
use App\Models\Comment;

class ReactionController extends Controller
{
     // Lấy tất cả phản ứng
     public function index()
     {
         return ReactionResource::collection(Reaction::all());
     }
     // Tạo một phản ứng mới
    public function store(ReactionRequest $request)
    {
        $validated = $request->validated();
        // Kiểm tra loại phản ứng và loại đối tượng mà phản ứng áp dụng
        $reactionable = $validated['reactable_type'] == 'post' 
            ? Post::find($validated['reactable_id']) 
            : Comment::find($validated['reactable_id']);
        if (!$reactionable) {
            return response()->json(['message' => 'Không tìm thấy đối tượng để phản ứng.'], 404);
        }
        $reaction = $reactionable->reactions()->create([
            'reaction_type_id' => $validated['reaction_type_id'],
            'user_id' => $request->user()->id,
        ]);

        return new ReactionResource($reaction);
    }
    // Xóa phản ứng
    public function destroy(Reaction $reaction)
    {
        $reaction->delete();
        return response()->json(null, 204);
    }
}
