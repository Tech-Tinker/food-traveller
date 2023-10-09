<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        $recipes = Recipe::where('title', 'LIKE', "%$query%")
            ->orWhere('country', 'LIKE', "%$query%")
            ->orderBy('title', 'asc')
            ->get();

        if ($recipes->isEmpty()) {
            return response()->json(['message' => 'No hay recetas de este país']);
        }

        foreach ($recipes as $recipe) {
            $recipe->image_url = asset('storage/' . $recipe->image);
        }

        return response()->json($recipes);
    }
}
