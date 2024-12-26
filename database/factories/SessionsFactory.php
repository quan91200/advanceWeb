<?php

namespace Database\Factories;

use App\Models\Sessions;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SessionsFactory extends Factory
{
    protected $model = Sessions::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // Tạo user mới cho mỗi session
            'ip_address' => $this->faker->ipv4,
            'user_agent' => $this->faker->userAgent,
            'payload' => $this->faker->text,
            'last_activity' => $this->faker->unixTime,
        ];
    }
}

