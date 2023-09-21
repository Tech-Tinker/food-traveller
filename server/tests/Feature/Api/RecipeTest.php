<?php

namespace Tests\Feature\Api;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Recipe;
use App\Models\User;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;

class RecipeTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Should test get all recipes
     */
    public function test_user_can_see_all_recipes(): void
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();

        Recipe::factory()->create();

        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('api/recipes');

        $response->assertJsonCount(1);

    }

     /**
     * Should test a guest can't post a recipe.
     */

    // public function guests_may_not_create_recipes(): void
    // {
    //     $this->get('api/recipes')
    //         ->assertRedirect('/login');

    // }

     /**
     * Should test a user can post a recipe.
     */
     
     public function test_user_can_create_a_recipe()
    {
        // Autenticar al usuario
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        // Cargar una imagen de muestra desde el directorio RecipeImages
        $imagePath = storage_path('app/public/RecipeImages/cocina-rusa.jpg');
        $file = new UploadedFile($imagePath, 'cocina-rusa.jpg', 'image/jpeg', null, true);

        // Datos de la receta
        $data = [
            'name' => 'Mafe',
            'image' => $file,
            'description' => 'Un estofado de verduras...',
            'author' => 'Mahua',
            'time' => '1:00',
            'difficulty' => 'fácil',
            'ingredients' => '1 zanahoria grande...',
            'preparation' => '1. Triturar los tomates...',
        ];

        // Realizar la solicitud POST a la API para crear la receta
        $response = $this->postJson('api/recipes', $data);

        // Asegurarse de que la receta se haya creado con éxito
        $response->assertStatus(201);

        // Verificar que la receta esté en la base de datos
        $this->assertDatabaseHas('recipes', [
            'name' => 'Mafe',
            // Agrega otras comprobaciones según tus datos de receta
        ]);

        // Verificar que la imagen se haya almacenado en el directorio correcto
        Storage::disk('public')->assertExists('RecipeImages/' . $file->hashName());

        // Verificar que el usuario tenga la receta en su lista de recetas
        $this->assertEquals(1, $user->recipes->count());
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

    public function test_user_can_update_own_recipe()
    {
        // Autenticar al usuario
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        // Crear una receta perteneciente al usuario
        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

        // Cargar una imagen de muestra desde el directorio RecipeImages
        $imagePath = storage_path('app/public/RecipeImages/sample.jpg');
        $file = new UploadedFile($imagePath, 'sample.jpg', 'image/jpeg', null, true);

        // Nuevos datos para la receta (incluye una nueva imagen)
        $newData = [
            'name' => 'Nueva Receta',
            'description' => 'Descripción actualizada',
            'image' => $file,
            'author' => 'Nuevo Autor',
            'time' => '2:00',
            'difficulty' => 'medio',
            'ingredients' => 'Nuevos ingredientes...',
            'preparation' => 'Pasos actualizados...',
        ];

        // Realizar la solicitud PUT a la API para actualizar la receta
        $response = $this->putJson("api/recipes/{$recipe->id}", $newData);

        // Asegurarse de que la receta se haya actualizado con éxito
        $response->assertStatus(200);

        // Verificar que los datos de la receta se hayan actualizado en la base de datos
        $this->assertDatabaseHas('recipes', [
            'id' => $recipe->id,
            'name' => 'Nueva Receta',
            'description' => 'Descripción actualizada',
            // Agrega otras comprobaciones según tus datos de receta
        ]);

        // Verificar que la nueva imagen se haya almacenado en el directorio correcto
        Storage::disk('public')->assertExists('RecipeImages/' . $newData['image']->hashName());
    }

    public function test_user_can_delete_own_recipe()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

        // Realizar la solicitud DELETE a la API para eliminar la receta
        $response = $this->deleteJson("api/recipes/{$recipe->id}");

        // Asegurarse de que la receta se haya eliminado con éxito
        $response->assertStatus(204);

        // Verificar que la receta ya no esté en la base de datos
        $this->assertDatabaseMissing('recipes', ['id' => $recipe->id]);
    }


}
