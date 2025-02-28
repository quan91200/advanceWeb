<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserHobbyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'user_id' => $this->user_id,
            'hobby_id' => $this->hobby ? (new HobbyResource($this->hobby))->resolve() : null,
        ];
    }
}
