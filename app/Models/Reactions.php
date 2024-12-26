<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reactions extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'post_id',
        'reaction_type',
    ];

    // Reaction thuộc về một người dùng
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Reaction thuộc về một bài đăng
    public function post()
    {
        return $this->belongsTo(Posts::class);
    }

    // Nếu cần, reaction có thể thuộc về một bình luận (thay đổi schema nếu cần)
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }
}

