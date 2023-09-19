<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipesTableSeeder extends Seeder
{
     /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ejemplo de datos para las recetas
        $recipes = [
            [
                'name' => 'Receta 1',
                'image' => 'imagen1.jpg',
                'description' => 'Descripción de la receta 1',
                'author' => 'Autor 1',
                'time' => '30 minutos',
                'difficulty' => 'Fácil',
                'ingredients' => 'Ingrediente 1, Ingrediente 2, Ingrediente 3',
                'preparation' => 'Instrucciones para la preparación de la receta 1',
                'user_id' => 1,
                'privacy' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Receta 2',
                'image' => 'imagen2.jpg',
                'description' => 'Descripción de la receta 2',
                'author' => 'Autor 2',
                'time' => '45 minutos',
                'difficulty' => 'Moderado',
                'ingredients' => 'Ingrediente A, Ingrediente B, Ingrediente C',
                'preparation' => 'Instrucciones para la preparación de la receta 2',
                'user_id' => 2,
                'privacy' => 'private',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Agrega más recetas según tus necesidades
        ];

        // Inserta los datos en la tabla 'recipes'
        DB::table('recipes')->insert($recipes);
    }
}
