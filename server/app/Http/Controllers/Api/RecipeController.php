<?php

namespace App\Http\Controllers\Api;

use App\Models\Recipe;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RecipeController extends Controller
{

    public function index()
    {
        $userId = request()->query('user_id');

        if ($userId) {
            $recipes = Recipe::where('user_id', $userId)->get();
        } else {
            $recipes = Recipe::all();
        }

        foreach ($recipes as $recipe) {
            $recipe->image_url = asset('storage/' . $recipe->image);
        }

        return response()->json($recipes);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'time' => 'required|string',
            'category' => 'required',
            'difficulty' => 'required|string',
            'ingredients' => 'required|string',
            'preparation' => 'required|string',
            'country' => 'required|string',
            // 'image' => 'required', // podemos ajustar la reglas
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Obtiene la imagen subida y la almacena en el directorio RecipeImages
        $imagePath = $request->file('image')->store('images', 'public');

        // Construye la URL de la imagen
        $imageUrl = asset('storage/' . $imagePath);

        // Verifica si la categoría ya existe
        $category = Category::where('name', $request->category)->first();

        if (!$category) {
            // Si no existe, crea una nueva categoría
            $category = new Category();
            $category->name = $request->category;
            $category->save();
        }

        $recipe = new Recipe();
        $recipe->title = $request->title;
        $recipe->description = $request->description;
        $recipe->time = $request->time;
        $recipe->category_id = $category->id;
        $recipe->difficulty = $request->difficulty;
        $recipe->ingredients = $request->ingredients;
        $recipe->preparation = $request->preparation;
        $recipe->country = $request->country;
        $recipe->image = $imagePath;

        $request->user()->recipe()->save($recipe);

        $username = $recipe->user->name;

        return response()->json([
            'id' => $recipe->id,
            'user_id' => $recipe->user_id,
            'username' => $username,
            'image_url' => $imageUrl,
            'message' => '¡Genial! Acabas de publicar tu receta.'
        ], 201);
    }

    public function show(Request $request, $id)
    {
        if (!$request->user()) {
            return response()->json(['error' => 'Debes estar autenticado para ver esta receta'], 401);
        }

        $recipe = Recipe::with(['user', 'category'])->find($id);

        if (!$recipe) {
            return response()->json(['error' => 'La receta no se encontró'], 404);
        }

        $username = $recipe->user->name;
        $category = $recipe->category;

        // Obtener la URL de la imagen
        $imageUrl = asset('storage/' . $recipe->image);

        unset($recipe->user);
        unset($recipe->category);

        return response()->json([
            'recipe' => $recipe,
            'username' => $username,
            'category' => $category->name,
            'image_url' => $imageUrl
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Debes estar autenticado para actualizar una receta'], 401);
        }

        $recipe = Recipe::find($id);

        if (!$recipe) {
            return response()->json(['error' => 'La receta no se encontró'], 404);
        }

        if ($recipe->user_id !== $user->id) {
            return response()->json(['error' => 'No tienes permiso para actualizar esta receta'], 403);
        }

        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'time' => 'required|string',
            'category' => 'required|exists:categories,name',
            'difficulty' => 'required|string',
            'ingredients' => 'required|string',
            'preparation' => 'required|string',
            'country' => 'required|string',
            // 'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ];

        // print_r($request->all());

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = Category::where('name', $request->input('category'))->first();

        if (!$category) {
            return response()->json(['error' => 'La categoría no se encontró'], 404);
        }

        $recipe->fill($request->all());

        $recipe->category_id = $category->id;

        // Maneja la actualización de la imagen si se proporciona
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            // Elimina la imagen anterior si existe
            if ($recipe->image) {
                Storage::disk('public')->delete($recipe->image);
            }

            $recipe->image = $imagePath;
        }

        $recipe->save();

        return response()->json([
            'recipe' => $recipe,
            'message' => '¡Genial! Acabas de editar tu receta.'
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Debes estar autenticado para eliminar una receta'], 401);
        }

        $recipe = Recipe::find($id);

        if (!$recipe) {
            return response()->json(['error' => 'La receta no se encontró'], 404);
        }

        if ($recipe->user_id !== $user->id) {
            return response()->json(['error' => 'No tienes permiso para eliminar esta receta'], 403);
        }

        // Elimina la imagen asociada a la receta si existe
        if ($recipe->image) {
            Storage::disk('public')->delete($recipe->image);
        }

        $recipe->delete();

        return response()->json(['message' => 'Receta eliminada con éxito'], 200);
    }
}
