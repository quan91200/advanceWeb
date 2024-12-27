<?php

namespace Database\Seeders;

use App\Models\Posts;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Arr;

class PostsSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $users = User::all();

        foreach ($users as $user) {
            for ($i = 0; $i < 1; $i++) {  
                Posts::create([
                    'user_id' => $user->id, 
                    'status' => $faker->randomElement(Posts::getStatus()),  
                    'content' => $faker->paragraph,  
                    'image_url' => $faker->imageUrl(), 
                    'created_at' => now(), 
                    'updated_at' => now(), 
                ]);
            }
        }
    }
}