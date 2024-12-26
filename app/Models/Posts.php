<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Posts extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'content',
        'image_url',
        'likes_count',
    ];

    // Bài đăng thuộc về một người dùng
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Một bài đăng có nhiều bình luận
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Một bài đăng có nhiều reactions
    public function reactions()
    {
        return $this->hasMany(Reactions::class);
    }
}