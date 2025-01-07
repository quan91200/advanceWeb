<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
class CommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'image_url' => $this->image_url ? Storage::url($this->image_url) : null,
            'post_id' => $this->post_id,
            'parent_id' => $this->parent_id,
            'children' => CommentResource::collection($this->whenLoaded('immediateChildren')),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at'=> $this->updated_at?->toDateTimeString(),
        ];
    }
}