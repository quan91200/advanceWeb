<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'image_url' => $this->image_url,
            'post_id' => $this->post_id,
            'parent_id' => $this->parent_id,
            'created_by' => $this->whenLoaded('createdBy', new UserResource($this->createdBy)),
            'updated_by' => $this->whenLoaded('updatedBy', new UserResource($this->updatedBy)),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
