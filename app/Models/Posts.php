<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Posts extends Model
{
    use HasFactory;

    const STATUS_PUBLIC = 'public';
    const STATUS_PRIVATE = 'private';
    const STATUS_FRIEND = 'friend';
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

    public static function getStatus(): array
    {
        return [
            self::STATUS_PUBLIC,
            self::STATUS_PRIVATE,
            self::STATUS_FRIEND,
        ];
    }
    public function scopePublic($query)
    {
        return $query->where('status', self::STATUS_PUBLIC);
    }
    public function scopePrivate($query)
    {
        return $query->where('status', self::STATUS_PRIVATE);
    }
    public function scopeFriend($query)
    {
        return $query->where('status', self::STATUS_FRIEND);
    }
}