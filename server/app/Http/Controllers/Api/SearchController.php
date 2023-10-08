<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $search = $request->input('query'); 
        if (!empty($search)) {
            $result = Recipe::where('id', 'LIKE', "%$search%")
                            ->orWhere('title', 'LIKE', "%$search%")
                            ->orWhere('description', 'LIKE', "%$search%")
                            ->orWhere('time', 'LIKE', "%$search%")
                            ->orWhere('category_id', 'LIKE', "%$search%")
                            ->orWhere('difficulty', 'LIKE', "%$search%")
                            ->orWhere('ingredients', 'LIKE', "%$search%")
                            ->orWhere('preparation', 'LIKE', "%$search%")
                            ->paginate(5); 
        } else {
            $result = collect(); 
        }
        return view('recipes.show', compact('result', 'search'));
    }
}