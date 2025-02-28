<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Hobby;
use App\Models\UserHobby;
use Illuminate\Database\Seeder;

class UserHobbySeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $hobbies = Hobby::all();
        // Gán sở thích cho mỗi người dùng
        $users->each(function ($user) use ($hobbies) {
            // Chọn một số sở thích ngẫu nhiên cho mỗi người dùng
            $randomHobbies = $hobbies->random(3);  
            // Cập nhật sở thích cho người dùng
            $user->hobbies()->sync($randomHobbies->pluck('id'));
        });
    }
}
