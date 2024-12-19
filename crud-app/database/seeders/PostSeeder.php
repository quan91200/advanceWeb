<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
class PostSeeder extends Seeder
{
    public function run(): void
    {
         // Tạo 10 người dùng
         $users = User::factory()->count(10)->create();

         // Với mỗi người dùng, tạo 1 bài viết
         $users->each(function ($user) use ($users) {
             $post = Post::factory()->create([
                 'created_by' => $user->id,
                 'updated_by' => $user->id,
             ]);
 
             // Với mỗi bài viết, tạo comment từ 10 người dùng
             $users->each(function ($commenter) use ($post) {
                 Comment::factory()->create([
                     'post_id' => $post->id,
                     'created_by' => $commenter->id,
                 ]);
             });
         });
    }
}
