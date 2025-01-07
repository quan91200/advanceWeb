<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use App\Models\Posts;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run()
    {
        // $users = User::all();
        // $posts = Posts::all();

        // if ($users->isEmpty() || $posts->isEmpty()) {
        //     $this->command->info('No users or posts found.');
        //     return;
        // }
        // $posts->each(function ($post) use ($users) {
        //     $randomUsers = $users->random(min(2, $users->count()));

        //     foreach ($randomUsers as $user) {
        //         // Tạo bình luận cha
        //         $parentComment = Comment::factory()->create([
        //             'post_id' => $post->id,
        //             'user_id' => $user->id,
        //         ]);
        //         // Tạo bình luận con
        //         Comment::factory()->child($parentComment->id)->create([
        //             'post_id' => $post->id,
        //             'user_id' => $user->id,
        //         ]);
        //     }
        // });
    }
}