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
                'title' => 'Receta 1',
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
                'title' => 'Receta 2',
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
            [
                'title' => 'Tarta de Santiago',
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_uHEvWiDBWlV8qE8ptk4QuLEQxKpFsRo8JQ&usqp=CAU',
                'description' => 'La tarta de Santiago es una tarta tradicional de la cocina gallega con indicación geográfica protegida.
                Actualmente se pueden comprar en casi todas las pastelerías de las poblaciones y zonas por las que pasa el Camino de Santiago, desde Roncesvalles o Jaca hasta Santiago de Compostela; y en toda la Comunidad Autónoma de Galicia, especialmente durante el mes de julio y la primera semana de agosto (debido a que el 25 de julio es Santiago Apóstol). Sus principales ingredientes son almendras, azúcar, huevos y naranja.',
                'author' => 'Lea',
                'time' => '1.30 h',
                'difficulty' => 'Moderado',
                'ingredients' => '-250 g de almendra molida cruda variedad Marcona o 250 g de almendra sin piel (si vais a hacer vosotros la harina),
                -5 huevos grandes L,
                -250 g de azúcar blanquilla,
                -La ralladura de la piel de 1/2 limón (sólo lo amarillo),
                -1/2 cuchara pequeña rasa de canela molida (unos 5 g),
                -1 trocito de mantequilla para engrasar el molde,
                -1/2 chupito de aguardiente de hierbas o del licor que más te guste,
                -50 g de azúcar molido o glass para adornar la tarta',
                'preparation' => '1. Molemos la almendra sin piel en una picadora. Lo mejor es que sea en dos tandas para obtener dos gramajes diferentes. Una muy molida, casi harina, y la otra un poco más gruesa para que se note al comer. Colocamos la almendra molida en el horno a unos 120º C durante unos 10 minutos.
                2. De esta manera conseguimos que la almendra suelte sus aceites y aromas. A la vez que desaparece parte de la humedad que suele tener la almendra cruda. También podéis hacerlo en una sartén tostando la almendra a temperatura baja.
                3. Mientras la almendra se está tostando añadimos en un bol el azúcar y los huevos. Batimos todo bien hasta que blanqueen un poco. Reservamos.
                4. Lavamos el limón, secamos y rallamos la mitad del mismo. Añadimos la ralladura, medio chupito (25 ml) del licor que más os guste. Yo le he añadido licor de hierbas de mi padre. También media cuchara de canela molida a la mezcla del huevo.
                5. Dejamos que se enfríe la almendra tostada y cuando esté tibia añadimos la crema de huevo aromatizada. Mezclamos bien con una espátula, sin llegar a batir. Sólo remover los ingredientes para que la almendra se junte bien con la crema de huevo.',
                'user_id' => 3,
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
