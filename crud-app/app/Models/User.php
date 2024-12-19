<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

     // Một người dùng có thể tạo nhiều bài viết (One-to-Many)
     public function posts()
     {
         return $this->hasMany(Post::class, 'created_by'); // 'created_by' là khóa ngoại trong bảng 'posts'
     }
 
     // Một người dùng có thể tạo nhiều bình luận (One-to-Many)
     public function comments()
     {
         return $this->hasMany(Comment::class, 'created_by'); // 'created_by' là khóa ngoại trong bảng 'comments'
     }
}
