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

        // dd($response->getContent());

        $response->assertJsonStructure([
            '*' => [
                'id',
                'user_id',
                'title',
                'description',
                'time',
                'category',
                'difficulty',
                'ingredients',
                'preparation',
                'country',
                'image',
            ]
        ]);

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
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

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

        $response->assertStatus(201);
    }

    /**
     * Should test a user can not post a recipe with missing fields.
     */

    public function test_user_cannot_post_recipe_with_missing_fields(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $data = [
            'title' => '',
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

        $response->assertStatus(422)
            ->assertJson(['errors' => [
                'title' => ['The title field is required.'],
            ]]);
    }

    /**
     * Should test a user no auth can not post a recipe.
     */

    public function test_user_no_auth_cannot_post_recipe(): void
    {
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

        $response->assertStatus(401);
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
     * Should test a user can see the recipe details.
     */

    public function test_user_can_see_recipe_details(): void
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();
        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

        Sanctum::actingAs($user);

        $response = $this->getJson("api/recipe/{$recipe->id}");

        $response->assertStatus(200)
            ->assertJson([
                'recipe' => [
                    'id' => $recipe->id,
                    'title' => $recipe->title,
                    'description' => $recipe->description,
                    'time' => $recipe->time,
                    'category' => $recipe->category,
                    'difficulty' => $recipe->difficulty,
                    'ingredients' => $recipe->ingredients,
                    'preparation' => $recipe->preparation,
                    'country' => $recipe->country,
                    'image' => $recipe->image,
                ],
                'username' => $recipe->user->name
            ]);
    }

    /**
     * Should test a user can not see the recipe details of a non existent recipe.
     */

    public function test_user_can_not_see_a_nonexistent_recipe(): void
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();
        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

        Sanctum::actingAs($user);
        $response = $this->getJson('api/recipe/999');

        $response->assertStatus(404);
    }

    /**
     * Should test a user no auth can not see the recipes details.
     */

    public function test_user_no_auth_cannot_see_recipe_details(): void
    {
        $this->withExceptionHandling();

        $recipe = Recipe::factory()->create();

        $response = $this->getJson("api/recipe/{$recipe->id}");

        $response->assertStatus(401);
    }

    /**
     * Should test a user can update the own recipes.
     */

    public function test_user_can_update_own_recipe()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

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

        $response = $this->putJson("api/recipe/{$recipe->id}", $newData);

        $response->assertStatus(201);
    }

    /**
     * Should test a user can not update a nonexistent recipe.
     */

    public function test_user_cannot_update_nonexistent_recipe(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $newData = [
            'title' => 'Receta actualizada',
            'description' => 'Un estofado de verduras...',
        ];

        $response = $this->putJson('api/recipe/999', $newData);

        $response->assertStatus(404);
    }

    /**
     * Should test a user no auth can not update recipe.
     */

    public function test_user_no_auth_cannot_update_recipe(): void
    {
        $recipe = Recipe::factory()->create();

        $newData = [
            'title' => 'Receta actualizada',
            'description' => 'Un estofado de verduras...',
        ];

        $response = $this->putJson("api/recipe/{$recipe->id}", $newData);

        $response->assertStatus(401);
    }

    /**
     * Should test a user can not update recipe with missing fields.
     */

    public function test_user_cannot_update_recipe_with_missing_fields(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

        $newData = [
            'title' => 'Receta',
            'description' => '',
            'time' => '1:00',
            'category' => 'entrante',
            'difficulty' => 'fácil',
            'ingredients' => '1 zanahoria grande...',
            'preparation' => '1. Triturar los tomates...',
            'country' => 'USA',
            'image' => 'url',
        ];

        $response = $this->putJson("api/recipe/{$recipe->id}", $newData);

        $response->assertStatus(422)
            ->assertJson(['errors' => [
                'description' => ['The description field is required.'],
            ]]);
    }

    /**
     * Should test a user can not update the recipe of another user.
     */

    public function test_user_cannot_update_recipe_of_another_user(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $otherUser = User::factory()->create();
        $recipe = Recipe::factory()->create(['user_id' => $otherUser->id]);

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

        $response = $this->putJson("api/recipe/{$recipe->id}", $newData);

        $response->assertStatus(403);
    }

    /**
     * Should test a user can remove the recipes.
     */

    public function test_user_can_delete_own_recipe()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

        $response = $this->deleteJson("api/recipe/{$recipe->id}");

        $response->assertStatus(200);
    }

    /**
     * Should test a user can not remove a nonexistent recipe.
     */

    public function test_user_cannot_delete_nonexistent_recipe(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $response = $this->deleteJson('api/recipe/999');

        $response->assertStatus(404);
    }

    /**
     * Should test a user no auth can not remove a recipe.
     */

    public function test_user_no_auth_cannot_delete_recipe(): void
    {
        $recipe = Recipe::factory()->create();

        $response = $this->deleteJson("api/recipe/{$recipe->id}");

        $response->assertStatus(401);
    }

    /**
     * Should test a user can not remove a recipe of another user.
     */

    public function test_user_cannot_delete_recipe_of_another_user(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $otherUser = User::factory()->create();
        $recipe = Recipe::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->deleteJson("api/recipe/{$recipe->id}");

        $response->assertStatus(403);
    }
}
