<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'comments';
    protected $fillable = [
        'content',
        'image_url',
        'user_id',
        'post_id',
        'parent_id',
    ];
    // Bình luận thuộc về một người dùng
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // Bình luận thuộc về một bài đăng
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
    // Bình luận thuộc về 1 người dùng
    public function comment()
    {
        return $this->hasMany(Comment::class, 'user_id');
    }
    public function parentComment()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
    // Phương thức lấy các bình luận con trực tiếp của bình luận này
    public function immediateChildren()
    {
        return $this->hasMany(Comment::class, 'parent_id')->with('user');
    }
    public function reactions()
    {
        return $this->morphMany(Reaction::class, 'reactable');
    }
}
