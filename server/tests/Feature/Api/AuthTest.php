<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Should create a new user.
     */
    public function test_user_can_register(): void
    {
        $this->postJson('api/register', [
            'name' => 'Luciana',
            'email' => 'l@mail.com',
            'password' => Hash::make('123456789')
        ]);

        $this->assertCount(1, User::all());
    }

    public function test_user_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();
        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong password',
        ]);
        $this->assertGuest();
    }
}
