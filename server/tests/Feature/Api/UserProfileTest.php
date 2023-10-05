<?php

namespace Tests\Feature\Api;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;

class UserProfileTest extends TestCase
{

    use RefreshDatabase;

    public function test_user_no_auth_cannot_see_profile(): void
    {
        $this->withExceptionHandling();

        $response = $this->getJson("api/profile");

        $response->assertStatus(401);
    }

    public function test_user_can_see_profile(): void
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();

        $profile = UserProfile::factory()->create(['user_id' => $user->id]);

        Sanctum::actingAs($user);

        $response = $this->getJson("api/profile");

        $response->assertStatus(200)
            ->assertJson([
                'profile' => [
                    "id" => $profile->id,
                    "user_id" => $profile->user_id,
                    "user_name" => $profile->user_name,
                    "profile_image" => $profile->profile_image,
                    "description" => $profile->description,
                    "birthdate" => $profile->birthdate,
                    "country" => $profile->country,
                    "interests" => $profile->interests,
                    "culinary_experience" => $profile->culinary_experience
                ]
            ]);
    }

    public function test_user_can_update_profile()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user, ['*']);

        $profile = UserProfile::factory()->create(['user_id' => $user->id]);

        $newData = [
            "user_name" => "Alejo",
            "profile_image" => "url",
            "description" => "Desde siempre quise ser Cocinero",
            "birthdate" => "12/01/1990",
            "country" => "Argentina",
            "interests" => "Cookies de chocolate",
            "culinary_experience" => "Experto sibarita"
        ];

        $response = $this->postJson("api/edit-profile", $newData);

        $response->assertStatus(200);
    }

    public function test_user_no_auth_cannot_update_profile(): void
    {
        $profile = UserProfile::factory()->create(['user_id' => User::factory()->create()->id]);

        $newData = [
            'user_name' => 'Leonel',
            'description' => 'Soy amigo de un amigo',
        ];

        $response = $this->postJson("api/edit-profile", $newData);

        $response->assertStatus(401);
    }

    public function test_user_can_delete_profile()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $profile = UserProfile::factory()->create(['user_id' => $user->id]);

        $response = $this->deleteJson("api/profile");

        $response->assertStatus(200);
    }

    public function test_user_no_auth_cannot_delete_profile(): void
    {
        $user = User::factory()->create();

        $profile = UserProfile::factory()->create(['user_id' => $user->id]);

        auth()->logout();

        $response = $this->deleteJson("api/profile");

        $response->assertStatus(401);
    }
}
