<?php

namespace Database\Factories;

use App\Models\Password_Reset_Token;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PasswordResetTokenFactory extends Factory
{
    protected $model = Password_Reset_Token::class;

    public function definition()
    {
        return [
            'email' => $this->faker->safeEmail(),
            'token' => $this->faker->uuid(),
            'created_at' => now(),
        ];
    }
}

