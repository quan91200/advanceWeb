<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sessions extends Model
{
    use HasFactory;
    protected $table = 'sessions';

    protected $fillable = [
        'user_id',
        'ip_address',
        'user_agent',
        'payload',
        'last_activity',
    ];

    // Quan hệ: Session thuộc về một người dùng
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
