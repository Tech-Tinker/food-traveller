<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RecipeReview;

class RecipeReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required|exists:recipes,id', 
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);

        $review = new RecipeReview();
        $review->recipe_id = $request->input('recipe_id');
        $review->rating = $request->input('rating');
        $review->comment = $request->input('comment');
        $review->save();

        return response()->json(['message' => 'Revisión de receta guardada con éxito'], 201);
    }
}
