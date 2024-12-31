<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reactions extends Model
{
    use HasFactory;

    const TYPE_LIKE = 'like';
    const TYPE_LOVE = 'love';
    const TYPE_WOW = 'wow';
    const TYPE_SAD = 'sad';
    const TYPE_ANGRY = 'angry';
    const TYPE_HAHA = 'haha';
    protected $fillable = [
        'created_by',
        'updated_by',
        'post_id',
        'reaction_type',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function post()
    {
        return $this->belongsTo(Posts::class);
    }
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }
    public static function getTypes(): array
    {
        return [
            self::TYPE_LIKE,
            self::TYPE_LOVE,
            self::TYPE_WOW,
            self::TYPE_SAD,
            self::TYPE_ANGRY,
            self::TYPE_HAHA
        ];
    }
}

