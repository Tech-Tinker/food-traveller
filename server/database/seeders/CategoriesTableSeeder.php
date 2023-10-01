<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{

    public function run(): void
    {
        $categories = [
            ['name' => 'Entrante'],
            ['name' => 'Primero'],
            ['name' => 'Segundo'],
            ['name' => 'Postre'],
        ];

        DB::table('categories')->insert($categories);
    }
}
