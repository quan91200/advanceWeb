<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\User;
use App\Models\Posts;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition()
    {
        return [
            'content' => $this->faker->sentence(),
            'image_url' => $this->faker->optional()->imageUrl(640, 480, 'cats'),
            'post_id' => Posts::factory(),
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
