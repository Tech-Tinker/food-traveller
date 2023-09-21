<?php

namespace Database\Factories;

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
            'name' => fake()->name(),
            'image' => fake()->imageUrl($width = 640, $height = 480),
            'description' => fake()->paragraph(),
            'author' => fake()->name(),
            'time' => fake()->numberBetween(1, 10),
            'difficulty' => fake()->word(),
            'ingredients' => fake()->text(),
            'preparation' => fake()->text(),
        ];
    }
}
