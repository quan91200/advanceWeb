<?php

namespace Database\Seeders;

use App\Models\Reaction;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\ReactionType;
use Illuminate\Database\Seeder;

class ReactionSeeder extends Seeder
{
    
    public function run(): void
    {
        $users = User::all();
        $posts = Post::all();
        $comments = Comment::all();
        $reactionTypes = ReactionType::all();
        // Tạo reactions cho bài viết
        $posts->each(function ($post) 
            use ($users, $reactionTypes) {
            $randomUser = $users->random();
            $randomReaction = $reactionTypes->random();
            // Tạo reaction cho mỗi post
            Reaction::create([
                'user_id' => $randomUser->id,
                'reactable_type' => 'App\Models\Post',
                'reactable_id' => $post->id,
                'reaction_type_id' => $randomReaction->id,
            ]);
        });
        // Tạo reactions cho bình luận
        $comments->each(function ($comment) 
            use ($users, $reactionTypes) {
            $randomUser = $users->random();
            $randomReaction = $reactionTypes->random();
            // Tạo reaction cho mỗi comment
            Reaction::create([
                'user_id' => $randomUser->id,
                'reactable_type' => 'App\Models\Comment', // Xác định loại đối tượng là Comment
                'reactable_id' => $comment->id,
                'reaction_type_id' => $randomReaction->id,
            ]);
        });
    }
}
