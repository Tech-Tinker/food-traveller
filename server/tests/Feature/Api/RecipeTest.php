<?php

namespace Tests\Feature\Api;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Api\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Recipe;
use App\Models\User;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;

class RecipeTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Should test guest get all recipes
     */
    public function test_user_no_auth_can_see_all_recipes(): void
    {
        $this->withExceptionHandling();

        Recipe::factory()->create();

        $response = $this->getJson('/api/recipes');

        $response->assertJsonCount(1);
    }


    /**
     * Should test user get all recipes
     */
    public function test_user_can_see_all_recipes(): void
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();

        Recipe::factory()->create();

        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('/api/recipes');

        $response->assertStatus(200);

        $response->assertJsonCount(1);
    }
    /**
     * Should test a user can post a recipe.
     */

    public function test_user_can_create_a_recipe()
    {
        // Autenticar al usuario
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        // Datos de la receta
        $data = [
            'title' => 'Mafe',
            'description' => 'Un estofado de verduras...',
            'time' => '1:00',
            'category' => 'entrante',
            'difficulty' => 'fácil',
            'ingredients' => '1 zanahoria grande...',
            'preparation' => '1. Triturar los tomates...',
            'country' => 'USA',
            'image' => 'url',
        ];

        $response = $this->postJson('api/recipe', $data);

        // Asegurarse de que la receta se haya creado con éxito
        $response->assertStatus(201);
    }


    /**
     * Should test a user can see the recipes.
     */

    public function test_user_can_see_their_recipes(): void
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();

        Recipe::factory()->create();

        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('api/recipes');

        $response->assertJsonCount(1);
    }

    /**
     * Should test a user can update the recipes.
     */

    public function test_user_can_update_own_recipe()
    {
        // Autenticar al usuario
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        // Crear una receta perteneciente al usuario
        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

        // Nuevos datos para la receta (incluye una nueva imagen)
        $newData = [
            'title' => 'Receta actualizada',
            'description' => 'Un estofado de verduras...',
            'time' => '1:00',
            'category' => 'entrante',
            'difficulty' => 'fácil',
            'ingredients' => '1 zanahoria grande...',
            'preparation' => '1. Triturar los tomates...',
            'country' => 'USA',
            'image' => 'url',
        ];

        // Realizar la solicitud PUT a la API para actualizar la receta
        $response = $this->putJson("api/recipe/{$recipe->id}", $newData);

        // Asegurarse de que la receta se haya actualizado con éxito
        $response->assertStatus(201);
    }

    /**
     * Should test a user can remove the recipes.
     */

    public function test_user_can_delete_own_recipe()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

        // Realizar la solicitud DELETE a la API para eliminar la receta
        $response = $this->deleteJson("api/recipe/{$recipe->id}");

        // Asegurarse de que la receta se haya eliminado con éxito
        $response->assertStatus(200);
    }
}
