<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recipe>
 */
class RecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->title(),
            'description' => fake()->paragraph(),
            'time' => fake()->numberBetween(1, 10),
            'category_id' => 1,
            'difficulty' => fake()->word(),
            'ingredients' => fake()->text(),
            'preparation' => fake()->text(),
            'country' => fake()->text(),
            'image' => fake(15)->imageUrl($width = 640, $height = 480),
        ];
    }
}
