<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;
use App\Models\Profile;
use Faker\Factory as Faker;
class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $profileCount = Profile::count();
        if ($profileCount > 0) {
            $faker = Faker::create();

            for ($i = 0; $i < $profileCount; $i++) {
                Location::create([
                    'country_code' => $faker->countryCode(),  // Mã quốc gia ngẫu nhiên
                    'country_name' => $faker->country(),  // Tên quốc gia ngẫu nhiên
                    'city' => $faker->city(),  // Thành phố ngẫu nhiên
                ]);
            }
        }
    }
}
