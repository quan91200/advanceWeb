<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Sessions extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $incrementing = false;
    protected $keyType = "string";
    protected $table = 'sessions';

    protected $fillable = [
        'user_id',
        'ip_address',
        'user_agent',
        'payload',
        'last_activity',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($session) {
            if (!$session->id) {
                $session->id = (string) Str::uuid();
            }
        });
    }

    // Quan hệ: Session thuộc về một người dùng
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function cleanOldSessions($days = 30)
    {
        self::where('last_activity', '<', now()->subDays($days)->timestamp)->delete();
    }

}
