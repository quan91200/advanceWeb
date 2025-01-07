<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;
    protected $with = ['commentOwner', 'post', 'children'];
    protected $fillable = [
        'user_id',
        'post_id',
        'parent_id',
        'content',
        'image_url',
    ];
    // Bình luận thuộc về một bài đăng
    public function post()
    {
        return $this->belongsTo(Posts::class, 'post_id');
    }
    // Bình luận thuộc về một người dùng
    public function commentOwner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    // Một bình luận có thể có nhiều bình luận con
    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
    // Một bình luận con thuộc về một bình luận cha
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
    public function immediateChildren()
    {
        return $this->children()->with('user');
    }
}