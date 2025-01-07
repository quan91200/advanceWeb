<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'image_url' => $this->image_url ? Storage::url($this->image_url) : null,
            'status' => $this->status,
            'comment_count' => $this->comments_count,
            'created_at' => $this->created_at ? $this->created_at->format('l, d-m-Y H:i') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('l, d-m-Y H:i') : null,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}