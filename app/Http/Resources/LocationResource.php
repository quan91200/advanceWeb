<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'city' => $this->city, // Tên thành phố (nếu có)
            'country_code' => $this->country_code, // Mã quốc gia (vd: +84)
            'country_name' => $this->country_name, // Tên quốc gia (nếu có)
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
