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
        do {
            $user1 = User::factory()->create();
            $user2 = User::factory()->create();
        } while ($user1->id === $user2->id);
        
        return [
            'user_id_1' => $user1->id,
            'user_id_2' => $user2->id,
            'status' => $this->faker->randomElement(['pending', 'accepted', 'rejected']),
        ];
        
    }
}
