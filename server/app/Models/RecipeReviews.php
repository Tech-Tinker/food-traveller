<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'recipe_id',
        'rating',
        'comment',
    ];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
