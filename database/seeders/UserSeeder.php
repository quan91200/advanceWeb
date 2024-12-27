<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Comment;
use App\Models\Posts;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory(5)->create();
    }
}