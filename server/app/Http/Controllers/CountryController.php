<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country; // Asegúrate de importar el modelo Country o ajusta la importación según la ubicación de tu modelo

class CountryController extends Controller
{
    public function getCountries()
    {
        try {
            // Aquí realizas la lógica para obtener la lista de países, por ejemplo, desde una tabla en tu base de datos
            $countries = Country::all(); // Suponiendo que tienes un modelo llamado Country

            // Formatea los datos según sea necesario y devuelve una respuesta JSON
            $countryOptions = $countries->map(function ($country) {
                return [
                    'label' => $country->name, // Suponiendo que tienes un campo "name" en tu tabla
                    'value' => $country->name,
                ];
            });

            return response()->json($countryOptions);
        } catch (\Exception $e) {
            // Maneja cualquier error que pueda ocurrir al obtener los países
            return response()->json(['error' => 'Error fetching countries'], 500);
        }
    }
}
