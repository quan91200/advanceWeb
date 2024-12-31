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
            'post_id' => Posts::factory(),
            'parent_id' => null,
            'content' => $this->faker->text(100),
            'image_url' => $this->faker->imageUrl(640, 480, 'animals'),
            'created_by' => User::factory(),
            'updated_by' => User::factory(), 
        ];
    }
    public function withParent(Comment $parent)
    {
        return $this->state(function (array $attributes) use ($parent) {
            return [
                'parent_id' => $parent->id,
            ];
        });
    }
}
