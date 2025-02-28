<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    use HasFactory;
    protected $table = 'reactions';
    protected $fillable = [
        'user_id',
        'reaction_type_id',
        'reactable_type',
        'reactable_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function reactionType()
    {
        return $this->belongsTo(ReactionType::class);
    }
    public function reactable()
    {
        return $this->morphTo();
    }
}
