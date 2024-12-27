<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            PostsSeeder::class,
            CommentSeeder::class,
            FollowersSeeder::class,
            ReactionsSeeder::class,
            SessionsSeeder::class,
            PasswordResetTokenSeeder::class,
        ]);
    }
}