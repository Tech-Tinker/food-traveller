<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserProfilesTableSeeder extends Seeder
{
    public function run(): void
    {
        $user1 = User::where('email', 'j@mail.com')->first();
        if ($user1) {
            $profile1 = UserProfile::updateOrCreate(
                ['user_id' => $user1->id],
                [
                    'user_name' => 'Julia',
                    'profile_image' => 'profile_images/1YzVviLyvCGxuq940Xy1zCl9Zp7dDCwpH3P9MlxO.jpg',
                    'description' => 'Me gustan las especias',
                    'birthdate' => '1990-01-01',
                    'country' => 'Cuba',
                    'interests' => 'Vegetariana',
                    'culinary_experience' => 'Principiante',
                ]
            );
        }

        $user2 = User::where('email', 'b@mail.com')->first();
        if ($user2) {
            $profile2 = UserProfile::updateOrCreate(
                ['user_id' => $user2->id],
                [
                    'user_name' => 'Bruno',
                    'profile_image' => 'profile_images/BcVWiOTH5wWLbmlS2joyQIBp6xhAwf1C0lPC86Ua.jpg',
                    'description' => 'Amo las pastas',
                    'birthdate' => '1995-05-05',
                    'country' => 'Italia',
                    'interests' => 'Creativa',
                    'culinary_experience' => 'Intermedio',
                ]
            );
        }

        $user3 = User::where('email', 'l@mail.com')->first();
        if ($user3) {
            $profile3 = UserProfile::updateOrCreate(
                ['user_id' => $user3->id],
                [
                    'user_name' => 'Lucia',
                    'profile_image' => 'profile_images/dmEnwmcksCLwF6M6jLNGgfoXJlasiGvq1cEUnRVx.jpg',
                    'description' => 'La comida me hace muy felíz!',
                    'birthdate' => '1988-12-10',
                    'country' => 'Alemania',
                    'interests' => 'Picante',
                    'culinary_experience' => 'Experto sibarita',
                ]
            );
        }
    }
}
