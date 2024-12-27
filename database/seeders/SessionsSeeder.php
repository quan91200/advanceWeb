<?php

namespace Database\Seeders;

use App\Models\Sessions;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class SessionsSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $users = User::all();

        foreach ($users as $user) {
            $payload = json_encode([
                '_token' => Str::random(60),
                '_flash' => ['old' => [], 'new' => []],
            ]);

            Sessions::create([
                'user_id' => $user->id,
                'ip_address' => $faker->ipv4, 
                'user_agent' => $faker->userAgent,
                'payload' => $payload,  
                'last_activity' => time(), 
            ]);
        }
    }
}