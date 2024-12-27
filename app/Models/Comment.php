<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'user_id',
        'parent_id',
        'content',
        'image_url',
    ];

    // Bình luận thuộc về một bài đăng
    public function post()
    {
        return $this->belongsTo(Posts::class);
    }

    // Bình luận thuộc về một người dùng
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Một bình luận có thể có nhiều bình luận con
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    // Một bình luận con thuộc về một bình luận cha
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
}

