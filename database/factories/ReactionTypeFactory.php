<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ReactionType;
class ReactionTypeFactory extends Factory
{
    protected $model = ReactionType::class;
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'icon' => $this->faker->word,
        ];
    }
}
