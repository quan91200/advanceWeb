<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\UserHobby;
use App\Models\User;
use App\Models\Hobby;
class UserHobbyFactory extends Factory
{
    protected $model = UserHobby::class;
    public function definition(): array
    {
        
        return [
            'user_id' => User::factory(),
            'hobby_id' => Hobby::factory(),
        ];
    }
}
