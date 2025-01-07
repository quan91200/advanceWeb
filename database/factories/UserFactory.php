<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class UserFactory extends Factory
{
    protected static ?string $password;

    protected $model = User::class;

    public function definition(): array
    {
        return [
            'email' => fake()->unique()->safeEmail(),
            'password' => bcrypt('password'),
            'name' => fake()->name(),
            'profile_pic' => $this->faker->optional()->imageUrl(300, 300, 'people'),
            'role' => $this->faker->randomElement(['admin', 'user']),
            'created_at' => now(),
        ];
    }
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
    public function withDefaultAvatar()
    {
        return $this->state([
            'profile_pic' => 'images/default.png',
        ]);
    }
}
