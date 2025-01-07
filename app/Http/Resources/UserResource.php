<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class UserResource extends JsonResource
{
    public static $wrap = false;
    public function toArray(Request $request)
    {
        $isCurrentUser = Auth::id();
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'profile_pic' => $this->profile_pic ? Storage::url($this->profile_pic) : asset('images/default.png'),
            'role' => $this->role,
            'created_at' => $this->created_at ? $this->created_at->format('l, d-m-Y H:i') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('l, d-m-Y H:i') : null,
            'posts_count' => $this->posts_count,
            'comments_count' => $this->comments_count,
            'sessions_count' => $this->sessions_count,
            'sessions' => SessionResource::collection($this->whenLoaded('sessions')),
            'posts' => PostResource::collection($this->whenLoaded('posts')),
            'auth' => $isCurrentUser,
            'hobbies' => $this->hobbies,
            'address' => $this->address,
            'phone_number' => $this->phone_number,
            'dob' => $this->dob,
            'job' => $this->job,
            'relationship' => $this->relationship
        ];
    }
}