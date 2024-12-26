<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Posts;
use App\Models\Comment;
use App\Models\Followers;
use App\Models\Reactions;
use App\Models\Sessions;
use App\Models\Password_Reset_Token;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Tạo 10 người dùng
        User::factory(10)
            ->hasPosts(3) // Mỗi người dùng sẽ có 3 bài đăng
            ->hasComments(2) // Mỗi người dùng sẽ có 2 bình luận
            ->create();

        // Tạo vài Followers
        Followers::factory(20)->create();

        // Tạo vài Reaction cho bài viết
        Reactions::factory(30)->create();

        // Tạo vài Session
        Sessions::factory(15)->create();

        // Tạo vài Password Reset Tokens
        Password_Reset_Token::factory(5)->create();
    }
}

