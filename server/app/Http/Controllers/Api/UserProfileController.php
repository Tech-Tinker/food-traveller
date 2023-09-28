<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserProfile;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserProfileController extends Controller
{
    public function show(Request $request)
{
    $user = $request->user();

    if ($user) {
        
        $profile = $user->profile;

        return response()->json(['profile' => $profile]);
    } else {
        return response()->json(['message' => 'Usuario no autenticado'], 401);
    }
}

    // Método para actualizar el perfil de usuario
    public function update(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $request->validate([
                'name' => 'string|max:255',
                'profile_image' => 'image|max:2048',
                'birthdate' => 'date',
                'country' => 'string',
                'interests' => 'string',
                'culinary-experience' => 'integer',
            ]);

            $profileData = [
                'name' => $request->input('name'),
                'birthdate' => $request->input('fbirthdate'),
                'country' => $request->input('country'),
                'interests' => $request->input('interests'),
                'culinary-experience' => $request->input('culinary-experience'),
            ];

            if ($request->hasFile('profile_image')) {
                $imagePath = $request->file('profile_image')->store('profile_images', 'public');
                $profileData['profile_image'] = $imagePath;
            }

            if ($user->profile) {
                $user->profile->update($profileData);
            } else {
                $user->profile()->create($profileData);
            }

            // Actualizar también el nombre en el modelo User
            if ($request->input('name')) {
                $user->update(['name' => $request->input('name')]);
            }

            return response()->json(['message' => 'Perfil actualizado con éxito']);
        } else {
            return response()->json(['message' => 'Usuario no autenticado'], 401);
        }
    }
}