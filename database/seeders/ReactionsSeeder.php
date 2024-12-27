<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Comment;
use App\Models\Reactions;
use App\Models\Posts;
use Illuminate\Support\Arr;

class ReactionsSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $posts = Posts::all();
        $comments = Comment::all();
        $reactionType = Arr::random(Reactions::getTypes());
        
        foreach ($posts as $post) {
            foreach ($users->random(3) as $user) { 
                Reactions::create([
                    'user_id' => $user->id,
                    'post_id' => $post->id,
                    'reaction_type' => $reactionType,
                ]);
            }
        }

        foreach ($comments as $comment) {
            foreach ($users->random(2) as $user) {  
                Reactions::create([
                    'user_id' => $user->id,
                    'comment_id' => $comment->id,
                    'reaction_type' => $reactionType,
                ]);
            }
        }
    }
}