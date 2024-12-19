<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

     // Một bình luận thuộc về một bài viết (Many-to-One)
     public function post()
     {
         return $this->belongsTo(Post::class, 'post_id'); // 'post_id' là khóa ngoại trong bảng 'comments'
     }
 
     // Một bình luận thuộc về một người dùng (Many-to-One)
     public function user()
     {
         return $this->belongsTo(User::class, 'created_by'); // 'created_by' là khóa ngoại trong bảng 'comments'
     }
}
