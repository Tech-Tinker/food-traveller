<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*Si deseas agregar un campo de video en tu tabla de recetas y también deseas incluir un video en tu seeder, aquí tienes una forma de hacerlo:

            Supongamos que tienes un campo llamado "video_url" en tu tabla de recetas donde almacenarás las URL de los videos asociados a cada receta. Puedes seguir estos pasos:

            Actualizar la migración de la tabla de recetas:
            Asegúrate de que la migración de la tabla de recetas incluya el campo "video_url". Puedes modificar la migración existente o crear una nueva si aún no tienes una.  */
        
            // Insertar una receta ficticia con un enlace de video
         DB::table('recipes')->insert([
            'name' => 'Receta con Video',
            'description' => 'Esta receta tiene un video.',
            //Tiempo de preparació, dificultad y la imagen al principio.
            'ingredients' => 'Ingrediente 1, Ingrediente 2',
            'preparation' => 'Paso 1, Paso 2, Paso 3',
            'video_url' => 'https://www.ejemplo.com/video.mp4', // URL de video ficticia
        ]);

        // Insertar otras recetas ficticias sin video
        DB::table('recipes')->insert([
            'name' => 'Receta sin Video',
            'description' => 'Esta receta no tiene video.',
            'ingredients' => 'Ingrediente A, Ingrediente B',
            'preparation' => 'Paso A, Paso B, Paso C',
            'video_url' => null, // Puedes dejar el campo de video_url como nulo para recetas sin video
        ]);

        /*Si deseas permitir que los usuarios suban videos directamente desde sus archivos en tu aplicación, debes implementar la funcionalidad de carga de archivos y almacenamiento de videos. Aquí hay una guía básica sobre cómo hacerlo en una aplicación Laravel:

Configurar el sistema de almacenamiento:
En Laravel, puedes utilizar sistemas de almacenamiento como el sistema de archivos local o servicios en la nube como Amazon S3 para almacenar archivos. Configura tu sistema de almacenamiento en el archivo config/filesystems.php. Puedes encontrar más información en la documentación de Laravel sobre sistemas de archivos: File Storage - Laravel.

Crear una migración y modelo para los videos:
Crea una migración para la tabla de videos y un modelo correspondiente. Esto te permitirá almacenar información sobre los videos subidos, como el nombre del archivo y la URL de acceso. Ejecuta los siguientes comandos Artisan:

bash
Copy code
php artisan make:model Video -m
En la migración, agrega los campos necesarios para la tabla de videos, por ejemplo, nombre_archivo, url, receta_id (para relacionar los videos con las recetas), y cualquier otro campo que necesites.

Crear un formulario para cargar videos:
Crea una vista y un formulario donde los usuarios puedan cargar videos. Asegúrate de incluir un campo de entrada de tipo "archivo" en el formulario para seleccionar y cargar videos desde su dispositivo.

Validar y almacenar el video:
En el controlador de recetas, crea un método para manejar la carga de videos. Dentro de este método, valida el archivo cargado y luego almacénalo utilizando el sistema de almacenamiento configurado. Puedes utilizar el método store de Laravel para hacerlo. Ejemplo:

php
Copy code
$path = $request->file('video')->store('videos');
Esto almacenará el video en la ubicación configurada y devolverá la ruta del video que puedes guardar en la base de datos junto con la receta correspondiente.

Mostrar y reproducir videos:
En la vista de detalle de la receta, muestra el video asociado a la receta utilizando un elemento de video HTML o un reproductor de video de tu elección. Utiliza la URL del video almacenado para cargar y mostrar el video.

Administrar videos en la base de datos:
Asegúrate de que tu modelo Video tenga métodos para relacionar los videos con las recetas y realizar otras operaciones relacionadas con la gestión de videos, como eliminarlos si es necesario.

Asegurar la carga de archivos:
Implementa medidas de seguridad para garantizar que los archivos subidos sean seguros y no presenten riesgos de seguridad. Esto puede incluir la validación del tipo de archivo, el control de tamaño y la prevención de ataques como la inyección de archivos.

Autenticación y autorización:
Controla quién puede cargar videos y quién puede acceder a ellos mediante el sistema de autenticación y autorización de Laravel.

Ten en cuenta que esta es una visión general de alto nivel de cómo implementar la carga y gestión de videos en tu aplicación Laravel. El proceso exacto puede variar según los detalles específicos de tu proyecto y los requisitos de seguridad. Siempre es importante considerar la seguridad y las mejores prácticas al implementar funciones de carga de archivos en tu aplicación.




 */
    }
}
