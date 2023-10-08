<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RecipeReview;
use App\Models\Recipe;

class RecipeReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required|exists:recipes,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);

        $recipeId = $request->input('recipe_id');
        $recipe = Recipe::find($recipeId);

        if (!$recipe) {
            return response()->json(['message' => 'Receta no encontrada'], 404);
        }

        $review = new RecipeReview();
        $review->recipe_id = $recipeId;
        $review->rating = $request->input('rating');
        $review->comment = $request->input('comment');
        $review->save();

        return response()->json(['message' => 'Revisión de receta guardada con éxito'], 201);
    }

    public function show(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        $recipeId = $request->input('recipe_id');
        $reviews = RecipeReview::where('recipe_id', $recipeId)->get();

        return response()->json(['reviews' => $reviews], 200);
    }
}