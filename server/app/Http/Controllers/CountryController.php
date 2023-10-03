<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;

class CountryController extends Controller
{
    public function verifyCountry(Request $request)
    {
        $countryName = $request->input('country');
        $mapboxAccessToken = 'pk.eyJ1IjoiZ2VuZW5mIiwiYSI6ImNsbXN2MmJ1ZzAzaTEyaXM0aGhvcWVmZDEifQ.nBufcYLKUJUZb0yobUyJWg'; // Reemplaza con tu clave de acceso de Mapbox

        $response = Http::get("https://api.mapbox.com/geocoding/v5/mapbox.places/{$countryName}.json", [
            'access_token' => $mapboxAccessToken,
            'types' => 'country',
            'limit' => 1,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'No se pudo obtener información del país desde Mapbox'], 500);
        }

        $mapboxData = $response->json();

        // Verifica si se encontró el país en Mapbox
        if (empty($mapboxData['features'])) {
            return response()->json(['error' => 'No se encontró información para el país especificado'], 404);
        }

        // Obtiene información adicional del país desde Mapbox
        $countryInfo = $mapboxData['features'][0];

        return response()->json(['message' => 'El país es válido', 'country_info' => $countryInfo]);
    }

    public function addCountry(Request $request)
    {
        // Aquí puedes agregar la lógica para guardar el país en tu base de datos si lo deseas.
        // Puedes acceder a la información del país desde $request->input('country_info').

        return response()->json(['message' => 'El país ha sido agregado con éxito']);
    }
}