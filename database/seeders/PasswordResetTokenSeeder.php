<?php

namespace Database\Seeders;

use App\Models\Password_Reset_Token;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class PasswordResetTokenSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            Password_Reset_Token::create([
                'email' => $user->email,
                'token' => Str::random(60),  
                'created_at' => now(),      
            ]);
        }
    }
}