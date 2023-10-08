<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register(): void
    {
        $this->postJson('api/register', [
            'name' => 'Luciana',
            'email' => 'l@mail.com',
            'password' => Hash::make('123456789')
        ]);

        $this->assertCount(1, User::all());
    }

    public function test_user_can_login(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('abcdefghi')
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'abcdefghi',
        ]);

        $response->assertStatus(200);
        $response->assertJsonFragment(['message' => 'Se ha iniciado sesión correctamente!']);
    }

    public function test_login_authentication_failure(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'l@mail.com',
            'password' => 'incorrect_password',
        ]);

        $response->assertJsonFragment(['message' => 'Credenciales incorrectas']);
    }

    public function test_user_can_logout(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('abcdefghi')
        ]);

        $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'abcdefghi',
        ]);

        Sanctum::actingAs($user, ['*']);

        $response = $this->postJson('/api/logout');

        $response->assertJsonFragment([
            'message' => 'Se ha cerrado la sesión!'
        ]);
    }
}
