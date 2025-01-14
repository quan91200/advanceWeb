<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Posts extends Model
{
    use HasFactory, SoftDeletes;
    protected $with = ['comments', 'user'];
    const STATUS_PUBLIC = 'public';
    const STATUS_PRIVATE = 'private';
    const STATUS_FRIEND = 'friend';
    protected $fillable = [
        'status',
        'content',
        'image_url',
        'created_by',
        'updated_by',
    ];
    // Quan hệ: 1 Bài đăng thuộc về một người dùng
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    // Quan hệ: Một bài đăng có nhiều bình luận
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }
    // Trạng thái bài đăng
    public static function getStatus(): array
    {
        return [
            self::STATUS_PUBLIC => 'public',
            self::STATUS_PRIVATE => 'private',
            self::STATUS_FRIEND => 'friend',
        ];
    }
    // Scopes
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }
    // Các sự kiện
    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($post) {
            $post->comments()->delete();
        });
        static::restoring(function ($post) {
            $post->comments()->restore();
        });
    }
}