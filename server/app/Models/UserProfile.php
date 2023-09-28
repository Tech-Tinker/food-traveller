<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use App\Models\User;

class UserProfile extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_name',
        'profile_image',
        'description',
        'birthdate',
        'country',
        'interests',
        'culinary_experience'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}