<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $posts = Post::all();
        $posts->each(function ($post) use ($users) {
            $randomUsers = $users->random(min(2, $users->count()));
            foreach ($randomUsers as $user) {
                // Tạo bình luận cha
                $parentComment = Comment::factory()->create([
                    'post_id' => $post->id,
                    'user_id' => $user->id,
                ]);
                // Tạo bình luận con
                Comment::factory()->child($parentComment->id)->create([
                    'post_id' => $post->id,
                    'user_id' => $user->id,
                ]);
            }
        });
    }
}
