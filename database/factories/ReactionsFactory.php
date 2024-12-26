<?php

namespace Database\Factories;

use App\Models\Reactions;
use App\Models\User;
use App\Models\Posts;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReactionsFactory extends Factory
{
    protected $model = Reactions::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'post_id' => Posts::factory(),
            'reaction_type' => $this->faker->randomElement(['like', 'love', 'haha', 'wow', 'sad', 'angry']),
        ];
    }
}
