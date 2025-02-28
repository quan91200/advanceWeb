<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $images = [
            'james' => 'avatar/james.jpg',
            'enzo' => 'avatar/enzo.jpg',
            'palmer' => 'avatar/palmer.jpg',
            'caicedo' => 'avatar/caicedo.jpg',
            'sanchez' => 'avatar/sanchez.jpg',
        ];
        foreach ($images as $key => $image) {
            $profilePic = Storage::exists('public/' . $image);
            User::create([
                'name' => $this->getNameFromKey($key),
                'email' => $this->getEmailFromKey($key),
                'password' => bcrypt('12345678'),
                'profile_pic' => $profilePic,
                'dark_mode' => fake()->randomElement(['light', 'dark']),
                'language' => fake()->randomElement(['en', 'vi']),
            ]);
        }
    }
    private function getNameFromKey(string $key): string
    {
        $names = [
            'james' => 'Reece James',
            'enzo' => 'Enzo Fernández',
            'palmer' => 'Cole Palmer',
            'caicedo' => 'Moisés Caicedo',
            'sanchez' => 'Robert Sánchez',
        ];
        return $names[$key] ?? 'Unknown';
    }
    private function getEmailFromKey(string $key): string
    {
        $emails = [
            'james' => 'reece@james.com',
            'enzo' => 'enzo@fernandez.com',
            'palmer' => 'palmer@cole.com',
            'caicedo' => 'caicedo@moises.com',
            'sanchez' => 'sanchez@robert.com',
        ];
        return $emails[$key] ?? 'unknown@example.com';
    }
}
