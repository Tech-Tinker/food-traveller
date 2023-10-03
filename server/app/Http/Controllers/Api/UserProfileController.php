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

    public function update(Request $request)
    {
        $user = $request->user();

        if ($user) {
            if ($request->user_id) {
                return response()->json(['error' => 'Solicitud inválida'], 400);
            }
            $request->validate([
                'user_name' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'profile_image' => 'nullable|string',
                'birthdate' => 'nullable|string',
                'country' => 'nullable|string',
                'interests' => 'nullable|string',
                'culinary_experience' => 'nullable|string',
            ]);

            $profile = $user->profile;

            if (!$profile) {
                return response()->json(['error' => 'Perfil no encontrado'], 404);
            }

            $profileData = [
                'user_name' => $request->input('user_name'),
                'description' => $request->input('description'),
                'profile_image' => $request->input('profile_image'),
                'birthdate' => $request->input('birthdate'),
                'country' => $request->input('country'),
                'interests' => $request->input('interests'),
                'culinary_experience' => $request->input('culinary_experience'),
            ];

            // if ($request->hasFile('profile_image')) {
            //     $imagePath = $request->file('profile_image')->store('profile_images', 'public');
            //     $profileData['profile_image'] = $imagePath;
            // }

            $profile->update($profileData);

            if ($request->input('user_name')) {
                $user->update(['name' => $request->input('user_name')]);
            }

            return response()->json([
                'message' => 'Perfil actualizado con éxito'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Usuario no autenticado'
            ], 401);
        }
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Usuario no autenticado'
            ], 401);
        }

        if ($user) {
            if ($request->user_id) {
                return response()->json(['error' => 'Solicitud inválida'], 400);
            }

            $profile = $user->profile;

            if (!$profile) {
                return response()->json(['error' => 'El perfil no se encontró'], 404);
            }

            $profile->delete();

            $user->delete();

            return response()->json([
                'message' => 'Perfil y usuario eliminado con éxito'
            ], 200);
        }
    }
}

