<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Post extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'posts';
    protected $fillable = [
        'content',
        'status',
        'image_url',
        'user_id',
        'react',
        'is_comment'
    ];
    protected $dates = ['deleted_at'];
    protected $casts = [
        'is_comment' => 'boolean',
    ];
    // Quan hệ: 1 Bài đăng thuộc về một người dùng
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    // Quan hệ: Một bài đăng có nhiều bình luận
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }
    // Quan hệ: Bình luận chưa bị xóa (soft delete) khỏi bài viết
    public function activeComments()
    {
        return $this->hasMany(Comment::class)->whereNull('deleted_at');
    }
    // Quan hệ: Bài đăng có nhiều phản ứng
    public function reactions()
    {
        return $this->morphMany(Reaction::class, 'reactable');
    }
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($post) {
            if ($post->forceDeleting) { // Xóa vĩnh viễn
                $post->comments()->forceDelete();
            } else { // Xóa mềm
                $post->comments()->delete();
            }
        });
    }
    // Scope lọc các bài viết có trạng thái 'public'
    public function scopePublic($query)
    {
        return $query->where('status', 'public');
    }
    // Scope lọc các bài viết trạng thái 'friend'
    public function scopeFriend($query, $userId)
    {
        return $query->where('status', 'friend')
            ->whereIn('user_id', function ($subQuery) use ($userId) {
                $subQuery->select('friend_id')
                    ->from('friends')
                    ->where('user_id', $userId)
                    ->where('status', 'accepted');
            });
    }
    // Scope lọc các bài viết trạng thái 'private'
    public function scopePrivate($query)
    {
        return $query->where('status', 'private');
    }
    // Scope lọc các bài viết trạng thái public và friend
    public function scopePublicAndFriend($query, $userId)
    {
        return $query->where(function ($query) use ($userId) {
            $query->public() // Gọi scope Public
                ->orWhere(function ($subQuery) use ($userId) {
                    $subQuery->friend($userId); // Gọi scope Friend
                });
        });
    }
    // Scope lọc các bài viết được bình luận
    public function scopeIsComment($query)
    {
        return $query->where('is_comment', true);
    }
    // Scope lọc các bài viết không được bình luận
    public function scopeIsNoComment($query)
    {
        return $query->where('is_comment', false);
    }
    // Scope lọc bài viết theo ngày đăng
    public function scopeCreatedAt($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
