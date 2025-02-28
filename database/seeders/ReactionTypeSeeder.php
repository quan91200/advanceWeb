<?php

namespace Database\Seeders;

use App\Models\ReactionType;
use Illuminate\Database\Seeder;

class ReactionTypeSeeder extends Seeder
{
    public function run(): void
    {
        $reactionTypes = [
            ['name' => 'like', 'icon' => 'FiThumbsUp'],
            ['name' => 'love', 'icon' => 'FiHeart'],
            ['name' => 'sad', 'icon' => 'FiFrown'],
            ['name' => 'angry', 'icon' => 'FaRegAngry'],
            ['name' => 'wow', 'icon' => 'FiSmile'],
        ];

        foreach ($reactionTypes as $reactionType) {
            ReactionType::updateOrCreate(['name' => $reactionType['name']], $reactionType);
        }
    }
}
