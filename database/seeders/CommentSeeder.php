<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use App\Models\Posts;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $posts = Posts::all();
        
        foreach ($posts as $post) {
            $parentComments = Comment::factory(2)->create([
                'post_id' => $post->id,
                'user_id' => User::inRandomOrder()->first()->id,
            ]);

            foreach ($parentComments as $parentComment) {
                Comment::factory(1)->create([
                    'post_id' => $post->id,
                    'user_id' => User::inRandomOrder()->first()->id,
                    'parent_id' => $parentComment->id,
                ]);
            }
        }
    }
}