<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hobby extends Model
{
    use HasFactory;
    protected $table = 'hobbies';
    protected $fillable = [
        'name',
        'description',
    ];
    // Quan hệ n-n giữa User và Hobby thông qua bảng trung gian UserHobby
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_hobbies', 'hobby_id', 'user_id');
    }
    // Lọc sở thích không thuộc của người dùng
    public function scopeNotInUserHobbies($query, $userId)
    {
        return $query->whereNotIn('id', function ($query) use ($userId) {
            $query->select('hobby_id')
                ->from('user_hobbies')
                ->where('user_id', $userId);
        });
    }   
}