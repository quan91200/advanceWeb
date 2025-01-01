<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'email',
        'name',
        'password',
        'profile_pic',
        'role'
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
    // Một người dùng có nhiều bài đăng
    public function posts()
    {
        return $this->hasMany(Posts::class, 'created_by');
    }
    // Một người dùng có nhiều bình luận
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
