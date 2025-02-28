<?php

namespace Database\Seeders;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Database\Seeder;

class FriendSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        if ($users->count() > 1) {
            foreach ($users as $user) {
                // Lấy ngẫu nhiên một danh sách bạn bè từ người dùng khác
                $friends = $users->where('id', '!=', $user->id)->random(rand(1, 3));

                foreach ($friends as $friend) {
                    // Sắp xếp user_id và friend_id để đảm bảo thứ tự
                    [$userId, $friendId] = ($user->id < $friend->id) 
                        ? [$user->id, $friend->id] 
                        : [$friend->id, $user->id];

                    // Kiểm tra xem quan hệ đã tồn tại chưa trước khi tạo mới
                    Friend::firstOrCreate([
                        'user_id' => $userId,
                        'friend_id' => $friendId,
                    ], [
                        'status' => 'accepted', // Đánh dấu đã là bạn bè
                    ]);
                }
            }
        }
    }
}