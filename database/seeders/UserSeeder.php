<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Tạo 10 người dùng với Factory
        \App\Models\User::factory(10)->create();
    }
}
