<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class LikesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
            // Obtén todas las recetas
        $recetas = Receta::all();

        // Obtén todos los usuarios registrados
        $usuariosRegistrados = User::all();

        // Simula "likes" aleatorios
        foreach ($recetas as $receta) {
            // Verifica si hay usuarios registrados
            if ($usuariosRegistrados->isNotEmpty()) {
                // Cuántos "likes" aleatorios deseas asignar a cada receta
                $numLikes = rand(1, $usuariosRegistrados->count());

                // Selecciona usuarios aleatorios de entre los registrados
                $usuariosAleatorios = $usuariosRegistrados->random($numLikes);

                // Asigna "likes" a la receta
                foreach ($usuariosAleatorios as $usuario) {
                    // Registra el "like" en la tabla de likes
                    DB::table('likes')->insert([
                        'user_id' => $usuario->id,
                        'recipe_id' => $receta->id,
                    ]);

                    // También podrías registrar el "like" en el perfil del usuario
                    $usuario->favoritos()->attach($receta->id);
                    }
                }
            }
        }
    
}
