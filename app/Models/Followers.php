<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Followers extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id_1',
        'user_id_2',
        'status',
    ];

    // Người dùng gửi lời mời kết bạn
    public function requester()
    {
        return $this->belongsTo(User::class, 'user_id_1');
    }

    // Người dùng nhận lời mời kết bạn
    public function receiver()
    {
        return $this->belongsTo(User::class, 'user_id_2');
    }
}

