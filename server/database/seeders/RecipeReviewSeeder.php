<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RecipeReview;
use App\Models\Recipe;
use Faker\Factory as Faker;

class RecipeReviewSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $recipeIds = Recipe::pluck('id');

        foreach ($recipeIds as $recipeId) {
            RecipeReview::create([
                'recipe_id' => $recipeId,
                'rating' => $faker->numberBetween(1, 5),
                'comment' => $faker->sentence,
            ]);
        }
    }
}
