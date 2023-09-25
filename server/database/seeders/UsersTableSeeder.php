<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash; // Importa la clase Hash
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;



class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    { // Ejemplo de datos para usuarios
        $users = [
            [
                'name' => 'Usuario 1',
                'email' => 'usuario1@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('contraseña1'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Usuario 2',
                'email' => 'usuario2@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('contraseña2'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lucia',
                'email' => 'l@mail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Agrega más usuarios según tus necesidades
        ];

        // Inserta los datos en la tabla 'users'
        DB::table('users')->insert($users);
    }
}
