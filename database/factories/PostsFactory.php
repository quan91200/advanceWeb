<?php

namespace Database\Factories;

use App\Models\Posts;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostsFactory extends Factory
{
    protected $model = Posts::class;

    public function definition()
    {
        return [
            'created_by' => User::factory(),
            'updated_by' => User::factory(),
            'status' => $this->faker->randomElement(['public', 'private', 'friend']),
            'content' => $this->faker->text(200),
            'image_url' => $this->faker->imageUrl(800, 600, 'nature'),
            'comment_count' => $this->faker->numberBetween(0, 1000),
        ];
    }
}
