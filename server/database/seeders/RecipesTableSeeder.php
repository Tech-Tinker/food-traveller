<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipesTableSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()
    {
        $recipes = [
            [
                'title' => 'Gnocchi de patata',
                'description' => 'los Gnocchi son uno de los platos italianos más típicos y conocidos en el mundo, por su curiosa consistencia, forma redonda/ovalada y bondad única. El origen de los ñoquis se remonta alrededor del siglo XVI cuando fueron importados a Italia papas de america. En realidad, incluso antes, allá por el siglo XVI, se servía un plato que recordaba a los ñoquis, pero la consistencia era diferente ya que se mezclaban con harina, agua y unos huevos. Entonces se puede decir que el gnocco nació como un plato pobre, aunque hoy en día ha sido revisado en varias formas y recetas también según la región visitada.',
                'time' => '1:30 h',
                'category_id' => 2,
                'difficulty' => 'Intermedia',
                'ingredients' => '1 Kg de patatas medianas, 200 g de harina de trigo, 2 yemas de huevo, Sal y nuez moscada',
                'preparation' => 'Lavar, hervir y luego enfriar, triturando las papas para obtener un puré suave y no pegajoso. Distribuir como una montaña, añadir un huevo y pasar un puñado de sal. Amase rápidamente el compuesto para hacer una hogaza, luego, cuando esté listo, córtelo en pequeñas porciones de cilindros con un diámetro de un dedo y comience a tallar sus albóndigas.',
                'country' => 'Italia',
                'image' => 'images/HU2ggHuo7gDvEhBa8xm48OowxTVgEZfAUGHu2hWt.jpg',
                'user_id' => 2,
                'privacy' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Hummus',
                'description' => 'Muchas regiones del mundo afirman ser el lugar donde se originó el hummus, esto se debe a que es un alimento que ha existido durante mucho tiempo, y en muchas variaciones, lo que impide que se conozca su origen exacto. Según antiguas escrituras, la versión que hoy conocemos como hummus, se consumió por primera vez en Egipto alrededor del siglo XIII.',
                'time' => '45 minutos',
                'category_id' => 1,
                'difficulty' => 'Fácil',
                'ingredients' => '400g de garbanzos cocidos, aceite de oliva, 60 g de tahini, 1 diente de ajo, sal, zumo de limon y comino.',
                'preparation' => 'Lavamos bien los garbanzos. Escurrimos e introducimos en el vaso de un robot de cocina. Añadimos el diente de ajo pelado, el sésamo, el comino, la sal, el zumo de limón y el agua.Trituramos hasta obtener una masa semi homogénea antes de incorporar el aceite de oliva. Continuamos triturando unos minutos o hasta obtener una mezcla cremosa.',
                'country' => 'Truquía',
                'image' => 'images/RFLFf6tXS6ptg5gV7C0nNu3ftd0gK2hffAm3w8FR.jpg',
                'user_id' => 3,
                'privacy' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Tarta de Santiago',
                'description' => 'La tarta de Santiago es una tarta tradicional de la cocina gallega con indicación geográfica protegida.
                Actualmente se pueden comprar en casi todas las pastelerías de las poblaciones y zonas por las que pasa el Camino de Santiago, desde Roncesvalles o Jaca hasta Santiago de Compostela; y en toda la Comunidad Autónoma de Galicia, especialmente durante el mes de julio y la primera semana de agosto (debido a que el 25 de julio es Santiago Apóstol). Sus principales ingredientes son almendras, azúcar, huevos y naranja.',
                'time' => '1:30 h',
                'category_id' => 4,
                'difficulty' => 'Intermedia',
                'ingredients' => '250 g de almendra molida cruda, 5 huevos grandes, 250 g de azúcar blanquilla, ralladura de la piel de 1/2 limón, 1/2 cuchara pequeña rasa de canela molida (unos 5 g), 1 trocito de mantequilla, 1/2 chupito de aguardiente de hierbas, 50 g de azúcar molido',
                'preparation' => 'Molemos la almendra sin piel en una picadora. Colocamos la almendra molida en el horno a unos 120º C durante unos 10 minutos. Mientras la almendra se está tostando añadimos en un bol el azúcar y los huevos. Batimos todo bien hasta que blanqueen un poco. Reservamos. Lavamos el limón, secamos y rallamos la mitad del mismo. Añadimos la ralladura, medio chupito (25 ml) del licor que más os guste. También media cuchara de canela molida a la mezcla del huevo. Dejamos que se enfríe la almendra tostada y cuando esté tibia añadimos la crema de huevo aromatizada. Mezclamos bien con una espátula, sin llegar a batir. Sólo remover los ingredientes para que la almendra se junte bien con la crema de huevo.',
                'country' => 'España',
                'image' => 'images/eDTTLQjubLNuTbqNX7YqL2dB2xZgFzARdsCj03nW.jpg',
                'user_id' => 3,
                'privacy' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Pizza Napolitana',
                'description' => 'La pizza como la conocemos hoy en día, con la masa recubierta con tomate y queso, fue inventada en Nápoles. Antes del año 1700, ya existían los panes planos, pero nunca fueron cubiertos y combinados con otros ingredientes, lo que ahora es una característica definitoria de la pizza.',
                'time' => '40 minutos',
                'category_id' => 3,
                'difficulty' => 'Fácil',
                'ingredients' => '200 g de harina de trigo 00, 130 g de agua, sal, levadura seca, salsa de tomate, mozzarella fresca, albahaca y aceite de oliva.',
                'preparation' => 'Mezclar la harina con el agua y la levadura. Amasar durante unos 13-15 minutos, incorporar un poco de aceite en el proceso y trabajar hasta que esté elástica. Añadir la sal y amasar un poco más. Formar una bola, envolver en un paño limpio húmedo y dejar 24 horas a 14-15 grados, o a temperatura ambiente y cuando haya doblado su volumen, guardarla en la nevera hasta cumplir unas 24 horas de fermentación total. Dividir en dos y trabajar cada masa con la punta de los dedos de dentro hacia fuera, dejando el borde ligeramente grueso. Extender el tomate con una cuchara, añadir el queso muy escurrido troceado y un poco de sal se desea.Hornear a la máxima temperatura posible. Cocer unos 3-4 minutos y añadir la albahaca fresca y un chorrito de aceite de oliva.',
                'country' => 'Italia',
                'image' => 'images/lzzokcp3nsjOQStvCCosk56vf5aP5R0EXi6nmiEY.jpg',
                'user_id' => 2,
                'privacy' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Shakshuka',
                'description' => 'Uno de los platos más populares en Israel por su exquisito sabor. Está elaborado con huevos cocinados en una salsa de tomate y es ideal para ponerlo para picar y mojarlo en pan. Es un plato muy similar al turco menemen o a los famosos huevos rancheros de la gastronomía latinoamericana.',
                'time' => '40 minutos',
                'category_id' => 1,
                'difficulty' => 'Fácil',
                'ingredients' => '3 cebollas, 2 pimientos rojos, 2 dientes de ajo, 6 tomates, azúcar moreno, laurel, perejil, tomillo, 75 ml de aceite de oliva, sal y pimienta, pimentón, 8 huevos.',
                'preparation' => 'Salteamos las cebollas picadas en dados a fuego medio. Salpimentamos. Después añadimos los pimientos cortados en trozos pequeños y dejamos cocer todo junto durante 10 minutos. Añadimos las especias, removemos y dejamos cocinar todo de nuevo cinco minutos más. Incorporamos la harissa y dejamos cocer 10 minutos más. Agregamos el concentrado de tomates y dejamos cocer otros 10 minutos y finalmente los tomates frescos pelados. Precalentamos el horno a 200 grados. En una bandeja o sartén refractaria, vertemos nuestra base y hacemos seis agujeros donde cascaremos un huevo en cada unos de ellos. Horneamos de siete a nueve minutos, o hasta que veamos las claras cuajadas.',
                'country' => 'Israel',
                'image' => 'images/u5us9hnvNhUs226WZDlMdBZ3snuirRDJJ1mEug4a.jpg',
                'user_id' => 3,
                'privacy' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Hamburguesa',
                'description' => 'Se cree que su procedencia es alemana, de Hamburgo, donde los trabajadores comían carne picada sobre pan tostado. De ahí embarcó a EEUU de mano de inmigrantes alemanes, donde se hizo muy popular extendiéndose por todo el país.',
                'time' => '20 minutos',
                'category_id' => 2,
                'difficulty' => 'Fácil',
                'ingredients' => '500 g de carne de ternera, 1 diente de ajo, 1 huevo, albahaca, queso curado rallado, sal y pimienta, cebolla confitada, queso de cabra, rúcula, pan de hamburguesa, aceite de oliva.',
                'preparation' => 'En un bol mezclamos todos los ingredientes de la hamburguesa. Por un lado la carne picada, el ajo bien troceado y la yema de un huevo previamente batida. También irán en la mezcla las hojas de albahaca y el queso italiano curado Grana Padano rallado. Mezclamos todos los ingredientes amasando con las manos hasta que estén todos bien integrados. Dividimos la mezcla en 4 partes. Antes de poner en la sartén es el momento de añadir sal y pimienta negra recién molida, al gusto de cada uno. En una sartén calentamos 2 cucharadas de aceite de oliva virgen extra. Las cocinaremos a fuego medio alto, por ambos lados dejándolas un poco al gusto de cada uno. Montamos cada hamburguesa con pan previamente tostado por el interior. Añadimos unas hojas de rúcula lavadas antes con un poquito de agua, dos rodajitas de queso de rulo de cabra y una buena cantidad de cebolla confitada.',
                'country' => 'Estados Unidos',
                'image' => 'images/MftVd5QNKJfqy7GIAw0DDlfy9SouSBVP4yRRFq6H.jpg',
                'user_id' => 1,
                'privacy' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Burritos',
                'description' => 'Hay quienes cuentan que un hombre mexicano llamado Juan Méndez de Chihuahua, usó un burro para llevar las provisiones de su carrito de comida. Para mantenerla caliente, la envolvía en una tortilla de harina casera, y es así como se hizo popular. Pero, esta historia, es probablemente una leyenda.',
                'time' => '35 minutos',
                'category_id' => 2,
                'difficulty' => 'Fácil',
                'ingredients' => '400 g de carne de ternera, 2 dientes de ajo, cebolla, 4 tortillas de trigo, chile, tomate, cilantro, aceite de oliva.',
                'preparation' => 'Ponemos una sartén a fuego medio con dos cucharadas de aceite de oliva. cuando esté caliente, se añaden la cebolla y los dos dientes de ajo. Añadimos los 400 gramos de carne picada a la sartén y se sube el fuego, añadimos el sobre de sazonador y se cocina la carne hasta que esté dorada. Agregamos tres cucharadas de salsa chipotle, removemos, apagamos el fuego. Para hacer el pico de gallo de acompañamiento, picamos en dados de medio centímetro los tomates y la cebolleta fresca, los aliñamos con el zumo de la lima y el cilantro picado muy fino. Calentamos las tortillas de trigo en una sartén sin aceite, durante unos segundos. Envolvemos la tortilla haciendo paquetitos. los partimos por la mitad y acompañamos del pico de gallo. ',
                'country' => 'México',
                'image' => 'images/BHpSpMVOLNQhMEuH04v0wKxsUwvtuirxpFeb0OPd.jpg',
                'user_id' => 1,
                'privacy' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];


        DB::table('recipes')->insert($recipes);
    }
}
