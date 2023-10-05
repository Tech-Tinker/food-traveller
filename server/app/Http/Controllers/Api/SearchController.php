<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->only('search');
    }

    public function search(Request $request)
    {
        $search = $request->input('query'); 
        if (!empty($search)) {
            $result = foodtravel::where('id', 'LIKE', "%$search%")
                            ->orWhere('title', 'LIKE', "%$search%")
                            ->orWhere('description', 'LIKE', "%$search%")
                            ->orWhere('time', 'LIKE', "%$search%")
                            ->orWhere('category_id', 'LIKE', "%$search%")
                            ->orWhere('difficulty', 'LIKE', "%$search%")
                            ->orWhere('ingredients', 'LIKE', "%$search%")
                            ->orWhere('preparation', 'LIKE', "%$search%")
                            ->paginate(10); 
        } else {
            $result = collect(); // Usar collect() en lugar de collect() para evitar errores de referencia indefinida
        }
        return view('recipes.search', compact('result', 'search'));
    }
}

