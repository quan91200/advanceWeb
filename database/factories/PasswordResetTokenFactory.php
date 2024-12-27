<?php

namespace Database\Factories;

use App\Models\Password_Reset_Token;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PasswordResetTokenFactory extends Factory
{
    protected $model = Password_Reset_Token::class;

    public function definition()
    {
        return [
            'email' => $this->faker->safeEmail(),
            'token' => Str::random(64),
            'created_at' => now(),
        ];
    }
}

