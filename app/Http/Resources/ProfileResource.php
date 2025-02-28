<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $id = Auth::user();
        return [
            'user_id' => $id,
            'phone_number' => $this->phone_number,
            'location' => new LocationResource($this->whenLoaded('location')),
            'dob' => $this->dob ? $this->dob->toDateString() : null,
            'gender' => $this->gender,
            'job' => $this->job,
            'relationship' => $this->relationship,
            'bio' => $this->bio,
            'created_at' => $this->created_at ? $this->created_at->toDateTimeString() : null,
            'updated_at' => $this->updated_at ? $this->updated_at->toDateTimeString() : null,
        ];
    }
}