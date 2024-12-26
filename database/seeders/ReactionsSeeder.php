<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ReactionsSeeder extends Seeder
{
    public function run(): void
    {
        // Tạo 100 reactions
        \App\Models\Reactions::factory(100)->create();
    }
}
