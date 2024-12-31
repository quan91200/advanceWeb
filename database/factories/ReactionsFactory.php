<?php

namespace Database\Factories;

use App\Models\Reactions;
use App\Models\User;
use App\Models\Posts;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReactionsFactory extends Factory
{
    protected $model = Reactions::class;

    public function definition()
    {
        $entity = $this->faker->randomElement(['post', 'comment']);
        return [
            'created_by' => User::factory(),
            'updated_by' => User::factory(),
            "{$entity}_id" => $entity === 'post' ? Posts::factory() : Comment::factory(),
            'reaction_type' => $this->faker->randomElement(Reactions::getTypes()),
        ];

    }
}
