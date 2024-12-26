<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use App\Models\Password_Reset_Token;
use App\Models\User;
use Illuminate\Database\Seeder;

class PasswordResetTokenSeeder extends Seeder
{
    public function run(): void
    {
        // Lấy một vài người dùng để tạo password reset tokens cho họ
        $users = User::all();

        foreach ($users as $user) {
            // Tạo một token ngẫu nhiên cho mỗi người dùng
            Password_Reset_Token::create([
                'email' => $user->email,
                'token' => Str::random(60),  // Tạo token ngẫu nhiên
                'created_at' => now(),     // Thời gian tạo token
            ]);
        }
    }
}
