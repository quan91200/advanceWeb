<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;
    protected $table = 'locations';
    protected $fillable = [
        'country_code',
        'country_name',
        'city',
    ];
    public function profiles()
    {
        return $this->hasMany(Profile::class);
    }
}
