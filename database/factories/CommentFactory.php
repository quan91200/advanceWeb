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
            'post_id' => Posts::factory(), // Sử dụng PostFactory để tạo bài đăng
            'user_id' => User::factory(), // Sử dụng UserFactory để tạo người dùng
            'content' => $this->faker->text(100),
            'image_url' => $this->faker->imageUrl(640, 480, 'animals'),
        ];
    }
}
