<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReactionTypeRequest;
use App\Http\Resources\ReactionTypeResource;
use App\Models\ReactionType;

class ReactionTypeController extends Controller
{
    // Hiển thị tất cả loại phản ứng
    public function index()
    {
        $reactionTypes = ReactionType::all();
        return ReactionTypeResource::collection($reactionTypes);
    }
    // Hiển thị một loại phản ứng
    public function show(ReactionType $reactionType)
    {
        return new ReactionTypeResource($reactionType);
    }
    // Tạo một loại phản ứng mới
    public function store(ReactionTypeRequest $request)
    {
        $validated = $request->validated();
        $reactionType = ReactionType::create([
            'name' => $validated['name'],
            'icon' => $validated['icon'],
        ]);
        return new ReactionTypeResource($reactionType);
    }
    // Cập nhật một loại phản ứng
    public function update(ReactionTypeRequest $request, ReactionType $reactionType)
    {
        $validated = $request->validated();
        $reactionType->update([
            'name' => $validated['name'],
            'icon' => $validated['icon'],
        ]);
        return new ReactionTypeResource($reactionType);
    }
}
