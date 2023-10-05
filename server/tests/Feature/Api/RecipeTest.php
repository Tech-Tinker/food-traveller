<?php

namespace Tests\Feature\Api;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Api\Validator;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Recipe;
use App\Models\User;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;

class RecipeTest extends TestCase
{

    use RefreshDatabase;

    public function test_user_no_auth_can_see_all_recipes(): void
    {
        $this->withExceptionHandling();

        $category = Category::factory()->create();

        Recipe::factory()->create([
            'category_id' => $category->id,
        ]);

        $response = $this->getJson('/api/recipes');

        $response->assertJsonStructure([
            '*' => [
                'id',
                'user_id',
                'title',
                'description',
                'time',
                'category_id',
                'difficulty',
                'ingredients',
                'preparation',
                'country',
                'image',
            ]
        ]);

        $response->assertJsonCount(1);
    }

    public function test_user_can_see_all_recipes(): void
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();

        $category = Category::factory()->create();

        Recipe::factory()->create([
            'category_id' => $category->id,
        ]);

        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('/api/recipes');

        $response->assertStatus(200);

        $response->assertJsonCount(1);
    }

    public function test_user_can_create_a_recipe()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        Storage::fake('public');
        $file = UploadedFile::fake()->image('recipe.jpg');

        $data = [
            'title' => 'Mafe',
            'description' => 'Un estofado de verduras...',
            'time' => '1:00',
            'category' => 'entrante',
            'difficulty' => 'fácil',
            'ingredients' => '1 zanahoria grande...',
            'preparation' => '1. Triturar los tomates...',
            'country' => 'USA',
            'image' => $file,
        ];

        $response = $this->postJson('api/recipe', $data);

        $response->assertStatus(201);
    }

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

    public function test_user_can_see_their_recipes(): void
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();

        $category = Category::factory()->create();

        Recipe::factory()->create([
            'category_id' => $category->id,
        ]);

        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('api/recipes');

        $response->assertJsonCount(1);
    }

    public function test_user_can_see_recipe_details(): void
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();

        $category = Category::factory()->create();

        $recipe = Recipe::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson("api/recipe/{$recipe->id}");

        $response->assertStatus(200)
            ->assertJson([
                'recipe' => [
                    'id' => $recipe->id,
                    'title' => $recipe->title,
                    'description' => $recipe->description,
                    'time' => $recipe->time,
                    'category_id' => $recipe->category_id,
                    'difficulty' => $recipe->difficulty,
                    'ingredients' => $recipe->ingredients,
                    'preparation' => $recipe->preparation,
                    'country' => $recipe->country,
                    'image' => $recipe->image,
                ],
                'username' => $recipe->user->name
            ]);
    }

    public function test_user_can_not_see_a_nonexistent_recipe(): void
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();
        $category = Category::factory()->create();

        $recipe = Recipe::factory()->create([
            'category_id' => $category->id,
            'user_id' => $user->id,
        ]);

        Sanctum::actingAs($user);
        $response = $this->getJson('api/recipe/999');

        $response->assertStatus(404);
    }

    public function test_user_no_auth_cannot_see_recipe_details(): void
    {
        $this->withExceptionHandling();

        $category = Category::factory()->create();

        $recipe = Recipe::factory()->create([
            'category_id' => $category->id,
        ]);

        $response = $this->getJson("api/recipe/{$recipe->id}");

        $response->assertStatus(401);
    }

    public function test_user_can_update_own_recipe()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $category = Category::factory()->create();

        $recipe = Recipe::factory()->create([
            'category_id' => $category->id,
            'user_id' => $user->id,
        ]);

        $newData = [
            'title' => 'Mafe',
            'description' => 'Un estofado de verduras...',
            'time' => '1:00',
            'category' => $category->name,
            'difficulty' => 'fácil',
            'ingredients' => '1 zanahoria grande...',
            'preparation' => '1. Triturar los tomates...',
            'country' => 'USA',
            'image' => 'url'
        ];

        $response = $this->postJson("api/recipe/{$recipe->id}", $newData);

        $response->assertStatus(200);
    }

    public function test_user_cannot_update_nonexistent_recipe(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $newData = [
            'title' => 'Receta actualizada',
            'description' => 'Un estofado de verduras...',
        ];

        $response = $this->postJson('api/recipe/999', $newData);

        $response->assertStatus(404);
    }

    public function test_user_no_auth_cannot_update_recipe(): void
    {
        $category = Category::factory()->create();

        $recipe = Recipe::factory()->create([
            'category_id' => $category->id,
        ]);

        $newData = [
            'title' => 'Receta actualizada',
            'description' => 'Un estofado de verduras...',
        ];

        $response = $this->postJson("api/recipe/{$recipe->id}", $newData);

        $response->assertStatus(401);
    }

    public function test_user_cannot_update_recipe_with_missing_fields(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $category = Category::factory()->create();

        $recipe = Recipe::factory()->create([
            'category_id' => $category->id,
            'user_id' => $user->id,
        ]);

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

        $response = $this->postJson("api/recipe/{$recipe->id}", $newData);

        $response->assertStatus(422)
            ->assertJson(['errors' => [
                'description' => ['The description field is required.'],
            ]]);
    }

    public function test_user_cannot_update_recipe_of_another_user(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $otherUser = User::factory()->create();
        $category = Category::factory()->create();

        $recipe = Recipe::factory()->create([
            'category_id' => $category->id,
            'user_id' => $otherUser->id,
        ]);

        $newData = [
            'title' => 'Receta actualizada',
            'description' => 'Un estofado de verduras...',
            'time' => '1:00',
            'category' => $category->name,
            'difficulty' => 'fácil',
            'ingredients' => '1 zanahoria grande...',
            'preparation' => '1. Triturar los tomates...',
            'country' => 'USA',
            'image' => 'url',
        ];

        $response = $this->postJson("api/recipe/{$recipe->id}", $newData);

        $response->assertStatus(403);
    }

    public function test_user_can_delete_own_recipe()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $category = Category::factory()->create();

        $recipe = Recipe::factory()->create([
            'category_id' => $category->id,
            'user_id' => $user->id,
        ]);

        $response = $this->deleteJson("api/recipe/{$recipe->id}");

        $response->assertStatus(200);
    }

    public function test_user_cannot_delete_nonexistent_recipe(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $response = $this->deleteJson('api/recipe/999');

        $response->assertStatus(404);
    }

    public function test_user_no_auth_cannot_delete_recipe(): void
    {
        $category = Category::factory()->create();

        $recipe = Recipe::factory()->create([
            'category_id' => $category->id,
        ]);

        $response = $this->deleteJson("api/recipe/{$recipe->id}");

        $response->assertStatus(401);
    }

    public function test_user_cannot_delete_recipe_of_another_user(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $otherUser = User::factory()->create();
        $category = Category::factory()->create();

        $recipe = Recipe::factory()->create([
            'category_id' => $category->id,
            'user_id' => $otherUser->id,
        ]);

        $response = $this->deleteJson("api/recipe/{$recipe->id}");

        $response->assertStatus(403);
    }
}
