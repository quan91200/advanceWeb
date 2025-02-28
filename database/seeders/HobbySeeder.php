<?php

namespace Database\Seeders;

use App\Models\Hobby;
use Illuminate\Database\Seeder;

class HobbySeeder extends Seeder
{
    public function run(): void
    {
        $hobbies = [
            ['name' => 'Reading', 'description' => 'Đọc sách hoặc bài viết để có thêm kiến ​​thức'],
            ['name' => 'Cooking', 'description' => 'Chuẩn bị thức ăn và khám phá công thức nấu ăn mới'],
            ['name' => 'Traveling', 'description' => 'Thăm những địa điểm mới và khám phá những nền văn hóa khác nhau'],
            ['name' => 'Photography', 'description' => 'Ghi lại khoảnh khắc qua ống kính máy ảnh'],
            ['name' => 'Gardening', 'description' => 'Trồng cây và hoa trong vườn'],
        ];

        foreach ($hobbies as $hobby) {
            Hobby::create($hobby);
        }
    }
}
