<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
class PostFactory extends Factory
{
    protected $model = Post::class;
    public function definition(): array
    {
        // Lấy tất cả các file trong thư mục storage/app/posts
        $images = Storage::files('posts');
        return [
            'content' => $this->faker->paragraph(),
            'user_id' => User::factory(),
            'status' => $this->faker->randomElement(['public', 'private', 'friend']),
            'image_url' => $this->faker->randomElement($images),
            'is_comment' => false, 
        ];
    }
}
