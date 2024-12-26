<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Password_Reset_Token extends Model
{
    protected $table = 'password_reset_tokens';

    protected $fillable = [
        'email',
        'token',
        'created_at',
    ];

    public $timestamps = false; // Bảng không sử dụng cột `updated_at`

    // Lấy user dựa trên email
    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }
}

