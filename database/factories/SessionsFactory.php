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
            'id' => $this->faker->uuid,
            'user_id' => User::factory(), 
            'ip_address' => $this->faker->ipv4,
            'user_agent' => $this->faker->userAgent,
            'payload' => json_encode([
                '_token' => $this->faker->uuid,
                '_flash' => ['old' => [], 'new' => []],
            ]),
            'last_activity' => time(),
        ];
    }
}

