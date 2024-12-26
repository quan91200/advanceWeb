<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PostsSeeder extends Seeder
{
    public function run(): void
    {
        // Tạo 20 bài đăng
        \App\Models\Posts::factory(20)->create();
    }
}
