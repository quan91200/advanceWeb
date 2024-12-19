<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;
use App\Models\User;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'content' => $this->faker->sentence(),
            'post_id' => Post::factory(), 
            'created_by' => User::factory(), 
        ];
    }
}
