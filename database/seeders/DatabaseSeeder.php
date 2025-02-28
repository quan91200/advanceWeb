<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\PostSeeder;
use Database\Seeders\CommentSeeder;
use Database\Seeders\FriendSeeder;
use Database\Seeders\ProfileSeeder;
use Database\Seeders\HobbySeeder;
use Database\Seeders\UserHobbySeeder;
use Database\Seeders\ReactionSeeder;
use Database\Seeders\ReactionTypeSeeder;
use Database\Seeders\LocationSeeder;
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PostSeeder::class,
            FriendSeeder::class,
            CommentSeeder::class,
            LocationSeeder::class,
            ProfileSeeder::class,
            ReactionTypeSeeder::class,
            ReactionSeeder::class,
            HobbySeeder::class,
            UserHobbySeeder::class,
        ]);
    }
}
