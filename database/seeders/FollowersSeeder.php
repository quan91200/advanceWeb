<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Followers;

class FollowersSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $randomUsers = $users->except($user->id)->random(min(3, $users->count() - 1));

            foreach ($randomUsers as $followedUser) {
                Followers::firstOrCreate([
                    'user_id_1' => $user->id,
                    'user_id_2' => $followedUser->id,
                ], [
                    'status' => 'accepted',
                ]);
            }
        }
    }
}