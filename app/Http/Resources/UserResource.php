<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $isCurrentUser = Auth::id();
        return [
            'auth' => $isCurrentUser,
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'profile_pic' => $this->profile_pic ? Storage::url($this->profile_pic) : null,
            'language' => $this->language,
            'dark_mode' => $this->dark_mode,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'profile' => $this->profile ? (new ProfileResource($this->profile))->resolve() : null,
            'posts' => PostResource::collection($this->whenLoaded('posts')),
            'friends' => FriendResource::collection($this->whenLoaded('friends')),
            'hobbies' => HobbyResource::collection($this->whenLoaded('hobbies')),
            'posts_count' => $this->posts->count(),
            'friends_count' => $this->friends->count(),  
        ];
    }
}
