<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'iamge',
        'description',
        'author',
        'continent',
        'time',
        'difficulty',
        'ingredients',
        'number',
        'preparation',
        'user_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
