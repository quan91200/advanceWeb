<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Post;
class PostSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        foreach ($users as $user) {
            for ($i = 0; $i < 1; $i++) {  
                Post::factory()->count(1)->create([ 
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
