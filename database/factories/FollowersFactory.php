<?php

namespace Database\Factories;

use App\Models\Followers;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FollowersFactory extends Factory
{
    protected $model = Followers::class;

    public function definition()
    {
        return [
            'user_id_1' => User::factory(),
            'user_id_2' => User::factory(),
            'status' => $this->faker->randomElement(['pending', 'accepted', 'rejected']),
        ];
    }
}
