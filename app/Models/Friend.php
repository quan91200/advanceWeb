<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    use HasFactory;
    protected $table = 'friends';
    protected $fillable = [
        'user_id',
        'friend_id',
        'status',
    ];
    // Quan hệ với User (Người gửi lời kết bạn)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    // Quan hệ với User (Người nhận lời kết bạn)
    public function friend()
    {
        return $this->belongsTo(User::class, 'friend_id');
    }
    // Hook để đảm bảo user_id < friend_id và tránh trùng lặp
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($friend) {
            // Sắp xếp user_id và friend_id theo thứ tự
            if ($friend->user_id > $friend->friend_id) {
                [$friend->user_id, $friend->friend_id] = [$friend->friend_id, $friend->user_id];
            }
            // Kiểm tra xem quan hệ đã tồn tại hay chưa
            if (self::where('user_id', $friend->user_id)
                ->where('friend_id', $friend->friend_id)
                ->exists()){
                    return false; // Không tạo bản ghi nếu tồn tại
            }
        });
    }
    // Chuẩn hóa user_id luôn nhỏ hơn friend_id
    public static function normalizeUsers($userId, $friendId)
    {
        return ($userId > $friendId) ? [$friendId, $userId] : [$userId, $friendId];
    }
    // Lấy quan hệ bạn bè
    public static function getFriendship($userId, $friendId)
    {
        [$userId, $friendId] = self::normalizeUsers($userId, $friendId);

        return self::where('user_id', $userId)
                   ->where('friend_id', $friendId)
                   ->first();
    }
    // Scope kiểm tra trạng thái quan hệ bạn bè
    public function scopeWithStatus($query, $userId, $friendId, $status)
    {
        [$userId, $friendId] = self::normalizeUsers($userId, $friendId);

        return $query->where('user_id', $userId)
                     ->where('friend_id', $friendId)
                     ->where('status', $status);
    }
    public function scopeIsFriendWith($query, $userId, $friendId)
    {
        return $this->scopeWithStatus($query, $userId, $friendId, 'accepted');
    }

    public function scopeIsPending($query, $userId, $friendId)
    {
        return $this->scopeWithStatus($query, $userId, $friendId, 'pending');
    }

    public function scopeIsBlocked($query, $userId, $friendId)
    {
        return $this->scopeWithStatus($query, $userId, $friendId, 'blocked');
    }
}