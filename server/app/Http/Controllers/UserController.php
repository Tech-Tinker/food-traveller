<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Asegúrate de importar el modelo de usuario

class UserController extends Controller
{
    // Método para obtener el perfil del usuario
    public function getUserProfile()
    {
        // Supongamos que obtienes los datos del usuario autenticado
        $user = auth()->user();

        // Crear un objeto con los datos del usuario
        $userResponse = [
            'nombre' => $user->name,
            'photoUrl' => $user->photo_url,
            'descripcion' => $user->descripcion,
        ];

        return response()->json($userResponse);
    }

    // Otras acciones del controlador, si es necesario
}
