<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
class PostFactory extends Factory
{
    protected $model = Post::class;
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'desc' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['draft', 'published']),
            'img_url' => $this->faker->imageUrl(),
            'created_by' => User::factory(),
            'updated_by' => User::factory(),
        ];
    }

    public function withComments(int $count = 5)
    {
        return $this->has(Comment::factory()->count($count), 'comments');
    }
}
