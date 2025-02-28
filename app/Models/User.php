<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Friend;
use App\Models\Reaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $table = 'users';
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_pic',
        'language',
        'dark_mode'
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function isCurrentUser()
    {
        return Auth::check() && Auth::id() === $this->id;
    }
    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function friends()
    {
        return $this->hasMany(Friend::class, 'user_id');
    }
    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }
    // Quan hệ n-n giữa User và Hobby thông qua bảng trung gian UserHobby
    public function hobbies()
    {
        return $this->belongsToMany(Hobby::class, 'user_hobbies', 'user_id', 'hobby_id');
    }

    // Truy cập đến `UserHobby` (bảng trung gian)
    public function userHobbies()
    {
        return $this->hasMany(UserHobby::class);
    }
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }
    public function scopeFriendsList(Builder $query, $userId)
    {
        return $query->whereIn('id', function ($subQuery) use ($userId) {
            $subQuery->select('friend_id')
                ->from('friends')
                ->where('user_id', $userId)
                ->where('status', 'accepted');
        });
    }
    // Scope lọc những người không phải là bạn bè của người dùng hiện tại
    public function scopeNotFriends(Builder $query, $id)
    {
        return $query->where('id', '!=', $id) // Loại bỏ chính người dùng hiện tại
            ->whereNotIn('id', function ($subQuery) use ($id) {
                $subQuery->select('friend_id')
                    ->from('friends')
                    ->where('user_id', $id)
                    ->union(
                        $subQuery->newQuery()
                            ->select('user_id')
                            ->from('friends')
                            ->where('friend_id', $id)
                    );
            });
    }
    // Kiểm tra 2 người có phải bạn bè không
    public function isFriendWith($userId)
    {
        return $this->friends()->where('id', $userId)->exists();
    }
}
