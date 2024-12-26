<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class SessionsSeeder extends Seeder
{
    public function run(): void
    {
         // Tạo 50 sessions
         \App\Models\Sessions::factory(50)->create();
    }
}
