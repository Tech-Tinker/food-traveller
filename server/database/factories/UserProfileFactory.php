<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserProfile>
 */
class UserProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_name' => $this->faker->name(),
            'description' => $this->faker->sentence(),
            'profile_image' => $this->faker->imageUrl($width = 640, $height = 480),
            'birthdate' => $this->faker->date(),
            'country' => $this->faker->country(),
            'interests' => $this->faker->sentence(),
            'culinary_experience' => $this->faker->sentence(),
        ];
    }
}
