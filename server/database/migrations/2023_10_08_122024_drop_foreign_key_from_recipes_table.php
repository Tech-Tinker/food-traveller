<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropForeignKeyFromRecipesTable extends Migration
{
    public function up()
    {
        Schema::table('recipes', function (Blueprint $table) {
            // Elimina la restricción de clave foránea:
            $table->dropForeign('recipes_user_id_foreign');
            // Elimina la columna user_id:
            $table->dropColumn('user_id');
        });
    }

    public function down()
    {
        Schema::table('recipes', function (Blueprint $table) {
            // Si necesitas revertir los cambios <-
        });
    }
}
