<?php

namespace App\Http\Controllers\Api;

use App\Models\Recipe;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recipes = Recipe::all();
        return response()->json($recipes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valida la solicitud
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'time' => 'required|string',
            'category' => 'required|string',
            'difficulty' => 'required|string',
            'ingredients' => 'required|string',
            'preparation' => 'required|string',
            'country' => 'required|string',
            // 'image' => 'required', // podemos ajustar la reglas
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Obtiene el usuario autenticado
        // $user = $request->user();

        // Obtiene la imagen subida y la almacena en el directorio RecipeImages
        // $imagePath = $request->file('image')->store('RecipeImages', 'public');

        // Crea una nueva receta con los datos proporcionados
        $recipe = new Recipe();
        $recipe->title = $request->title;
        $recipe->description = $request->description;
        $recipe->time = $request->time;
        $recipe->category = $request->category;
        $recipe->difficulty = $request->difficulty;
        $recipe->ingredients = $request->ingredients;
        $recipe->preparation = $request->preparation;
        $recipe->country = $request->country;
        $recipe->image = $request->image;
        // Asocia la receta con el usuario autenticado
        // $user->recipes()->save($recipe);

        // $recipe->save();
        $request->user()->recipe()->save($recipe);

        // Obtiene el nombre de usuario del propietario de la receta
        $username = $recipe->user->name;

        return response()->json([
            'id' => $recipe->id,
            'user_id' => $recipe->user_id,
            'username' => $username,
            'message' => '¡Genial! Acabas de publicar tu receta.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        // Verifica si el usuario está autenticado
        if (!$request->user()) {
            return response()->json(['error' => 'Debes estar autenticado para ver esta receta'], 401);
        }

        // Busca la receta por ID con el usuario asociado
        $recipe = Recipe::with('user')->find($id);

        // Verifica si la receta existe
        if (!$recipe) {
            return response()->json(['error' => 'La receta no se encontró'], 404);
        }

        // Obtiene solo el nombre de usuario
        $username = $recipe->user->name;

        // Remover el objeto 'user' de la respuesta
        unset($recipe->user);

        // Devuelve los detalles de la receta junto con el nombre de usuario
        return response()->json([
            'recipe' => $recipe,
            'username' => $username
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Verifica si el usuario está autenticado
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Debes estar autenticado para actualizar una receta'], 401);
        }

        // Busca la receta por ID
        $recipe = Recipe::find($id);

        // Verifica si la receta existe
        if (!$recipe) {
            return response()->json(['error' => 'La receta no se encontró'], 404);
        }

        // Verifica si el usuario es el propietario de la receta
        if ($recipe->user_id !== $user->id) {
            return response()->json(['error' => 'No tienes permiso para actualizar esta receta'], 403);
        }

        // Define reglas de validación
        $rules = [
            'title' => 'string|max:255',
            'description' => 'string',
            'time' => 'string',
            'category' => 'string',
            'difficulty' => 'string',
            'ingredients' => 'string',
            'preparation' => 'string',
            'country' => 'string',
            'image' => 'string',
        ];

        // Valida la solicitud
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Actualiza los campos de la receta
        $recipe->fill($request->all());

        // Maneja la actualización de la imagen si se proporciona
        // if ($request->hasFile('image')) {
        // Elimina la imagen anterior si existe
        // if ($recipe->image) {
        //     Storage::disk('public')->delete($recipe->image);
        // }

        // Almacena la nueva imagen
        //     $imagePath = $request->file('image')->store('RecipeImages', 'public');
        //     $recipe->image = $imagePath;
        // }

        // Guarda los cambios en la receta
        $recipe->save();

        // Redirige a una página de detalle de receta o devuelve una respuesta JSON de éxito
        // return view('recipes.show', compact('recipe'));
        return response()->json([
            'recipe' => $recipe,
            'message' => '¡Genial! Acabas de editar tu receta.'
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        // Verifica si el usuario está autenticado
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Debes estar autenticado para eliminar una receta'], 401);
        }

        // Busca la receta por ID
        $recipe = Recipe::find($id);

        // Verifica si la receta existe
        if (!$recipe) {
            return response()->json(['error' => 'La receta no se encontró'], 404);
        }

        // Verifica si el usuario es el propietario de la receta
        if ($recipe->user_id !== $user->id) {
            return response()->json(['error' => 'No tienes permiso para eliminar esta receta'], 403);
        }

        // Elimina la imagen asociada a la receta si existe
        // if ($recipe->image) {
        //     Storage::disk('public')->delete($recipe->image);
        // }

        // Elimina la receta de la base de datos
        $recipe->delete();

        return response()->json(['message' => 'Receta eliminada con éxito']);
    }
}
