<?php

namespace Database\Seeders;

use App\Models\UserProfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserProfileSeeder extends Seeder
{
    public function run(): void
    {
        $user_profiles = [
            $user = User::find(1)

        if ($user) {
            $profile = new UserProfile();
            $profile->user_name = $user->name;
            $profile->user_id = $user->id;
            $profile->profile_image = 'server/public/storage/profile_images/geZbNQGF7vH66hT69aUSPOyqCfYza3wzkVVLq0uB.jpg';
            $profile->description = 'Me gustan las especias';
            $profile->birthdate = '1990-01-01';
            $profile->country = 'Cuba';
            $profile->interests = 'Vegetariana';
            $profile->culinary_experience = 'Principiante';
            $profile->save();
        }
        ]
    }
}