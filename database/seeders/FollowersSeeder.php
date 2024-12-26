<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FollowersSeeder extends Seeder
{
    public function run(): void
    {
        // Tạo 100 mối quan hệ theo dạng follow
        \App\Models\Followers::factory(100)->create();
    }
}
