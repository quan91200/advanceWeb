<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'username',
        'email',
        'password',
        'name',
        'profile_pic',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'role'
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Một người dùng có nhiều bài đăng
    public function posts()
    {
        return $this->hasMany(Posts::class);
    }

    // Một người dùng có nhiều bình luận
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Một người dùng có thể follow nhiều người khác
    public function following()
    {
        return $this->belongsToMany(User::class, 'followers', 'user_id_1', 'user_id_2')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    // Một người dùng có thể được follow bởi nhiều người
    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'user_id_2', 'user_id_1')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    // Một người dùng có thể react vào nhiều bài đăng hoặc bình luận
    public function reactions()
    {
        return $this->hasMany(Reactions::class);
    }
}
