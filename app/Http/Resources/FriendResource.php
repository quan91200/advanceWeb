<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
class FriendResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $this->user;
        $friend = $this->friend;
        return [
            'user_id' => $this->user_id,
            'friend_id' => $this->friend_id,
            'status' => $this->status,
            'friend' => [
                'name' => $friend->name,
                'profile_pic' => $friend->profile_pic ? Storage::url($friend->profile_pic) : null,
            ],
        ];
    }
}
