<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'parent_id',
        'content',
        'image_url',
        'created_by',
        'updated_by'
    ];

    // Bình luận thuộc về một bài đăng
    public function post()
    {
        return $this->belongsTo(Posts::class, 'post_id');
    }

    // Bình luận thuộc về một người dùng
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    // Bình luận được cập nhật bởi người dùng
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
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

