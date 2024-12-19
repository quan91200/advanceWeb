<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // Một bài viết thuộc về một người dùng (Many-to-One)
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by'); // 'created_by' là khóa ngoại trong bảng 'posts'
    }

    // Một bài viết có thể có nhiều bình luận (One-to-Many)
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id'); // 'post_id' là khóa ngoại trong bảng 'comments'
    }
}
