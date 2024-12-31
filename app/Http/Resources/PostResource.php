<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_name' => $this->user->name ?? 'Anonymous', 
            'content' => $this->content,
            'image_url' => $this->image_url ? asset('storage/' . $this->image_url) : null,
            'status' => $this->status,
            'likes_count' => $this->likes_count,
            'comments_count' => $this->comments()->count(),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}