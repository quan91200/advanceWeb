<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Friend;
use App\Models\User;
class FriendFactory extends Factory
{
    protected $model = Friend::class;
    public function definition(): array
    {
        // Lấy danh sách user_id từ database để tránh tạo trùng lặp
        $userIds = User::pluck('id')->toArray();
        do {
            $user = $this->faker->randomElement($userIds);
            $friend = $this->faker->randomElement($userIds);
        } while ($user === $friend); // Kiểm tra nếu chúng giống nhau thì lặp lại

        return [
            'user_id' => $user,  // Người gửi
            'friend_id' => $friend,  // Người nhận
            'status' => $this->faker->randomElement(array: ['pending', 'accepted', 'blocked']),
        ];
    }
}
