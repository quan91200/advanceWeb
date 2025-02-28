<?php

namespace Database\Factories;

use App\Models\Reaction;
use App\Models\ReactionType;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReactionFactory extends Factory
{
    protected $model = Reaction::class;
    public function definition(): array
    {
        return [
            'reaction_type_id' => ReactionType::factory(),
            'user_id' => User::factory(),
            'reactable_type' => $this->faker->randomElement(['post', 'comment']),
            'reactable_id' => $this->faker->randomElement([Post::factory(), Comment::factory()]),
        ];
    }
}
