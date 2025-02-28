<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Comment;
use App\Models\User;
use App\Models\Post;
class CommentFactory extends Factory
{
    protected $model = Comment::class;
    public function definition(): array
    {
        return [
            'content' => $this->faker->sentence(),
            'image_url' => $this->faker->optional()->imageUrl(640, 480, 'cats'),
            'post_id' => Post::factory(),
            'user_id' => User::factory(),
            'parent_id' => null,
        ];
    }
    public function child($parentId)
    {
        return $this->state(function () use ($parentId) {
            return [
                'parent_id' => $parentId,
            ];
        });
    }
}
