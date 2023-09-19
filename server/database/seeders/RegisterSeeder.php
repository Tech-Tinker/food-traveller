<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegisterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
// Datos simulados del formulario de registro
$datosRegistro = [
    'nombre' => 'Usuario de Prueba',
    'email' => 'registro@example.com',
    'fecha_nacimiento' => '1990-01-01',
    //País de origen, preferencias culinaria y otra de intereses a definir.
    'password' => Hash::make('contraseña'),
];

// Crear un nuevo usuario en la base de datos
$usuario = new User();
$usuario->name = $datosRegistro['nombre'];
$usuario->email = $datosRegistro['email'];
$usuario->fecha_nacimiento = $datosRegistro['fecha_nacimiento'];
$usuario->password = $datosRegistro['password'];
$usuario->save();

// Simular preferencias de comida seleccionadas por el usuario
$preferencias = ['Comida 1', 'Comida 2', 'Comida 3']; // Puedes ajustar estas preferencias
$preferenciasIds = [];

foreach ($preferencias as $nombrePreferencia) {
    $preferencia = PreferenciaComida::create(['nombre' => $nombrePreferencia]);
    $preferenciasIds[] = $preferencia->id;
}

// Asociar las preferencias de comida al usuario
$usuario->preferencias()->sync($preferenciasIds);
    }
}
