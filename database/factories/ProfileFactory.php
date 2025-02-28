<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Location;
class ProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'phone_number' => $this->faker->phoneNumber, 
            'dob' => $this->faker->dateTimeBetween('-60 years', '-18 years')->format('Y-m-d'),
            'job' => $this->faker->jobTitle, 
            'relationship' => $this->faker->randomElement(['single', 'married', 'divorced']),
            'bio' => $this->faker->paragraph,
            'location_id' => Location::inRandomOrder()->first()?->id ?? Location::factory(),
        ];
    }
}
