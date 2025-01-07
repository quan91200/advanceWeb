<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
class UserSeeder extends Seeder
{
    public function run(): void
    {
        // $images = [
        //     'james' => 'images/james.jpg',
        //     'enzo' => 'images/enzo.jpg',
        //     'palmer' => 'images/palmer.jpg',
        //     'caicedo' => 'images/caicedo.jpg',
        //     'sanchez' => 'images/sanchez.jpg',
        // ];
        // foreach ($images as $key => $image) {
        //     $profilePic = Storage::exists('public/' . $image) ? $image : 'images/default.png';
        //     User::create([
        //         'name' => $this->getNameFromKey($key),
        //         'email' => $this->getEmailFromKey($key),
        //         'password' => bcrypt('12345678'),
        //         'profile_pic' => $profilePic,
        //     ]);
        // }
    }
    // private function getNameFromKey(string $key): string
    // {
    //     $names = [
    //         'james' => 'Reece James',
    //         'enzo' => 'Enzo Fernández',
    //         'palmer' => 'Cole Palmer',
    //         'caicedo' => 'Moisés Caicedo',
    //         'sanchez' => 'Robert Sánchez',
    //     ];
    //     return $names[$key] ?? 'Unknown';
    // }
    // private function getEmailFromKey(string $key): string
    // {
    //     $emails = [
    //         'james' => 'reece@james.com',
    //         'enzo' => 'enzo@fernandez.com',
    //         'palmer' => 'palmer@cole.com',
    //         'caicedo' => 'caicedo@moises.com',
    //         'sanchez' => 'sanchez@robert.com',
    //     ];
    //     return $emails[$key] ?? 'unknown@example.com';
    // }
}