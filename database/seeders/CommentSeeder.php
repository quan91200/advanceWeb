<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
       // Tạo 50 bình luận
       \App\Models\Comment::factory(50)->create();
    }
}
