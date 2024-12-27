<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            $table->foreignId('post_id')->nullable()->constrained('posts')->onDelete('cascade'); 
            $table->foreignId('comment_id')->nullable()->constrained('comments')->onDelete('cascade');
            $table->enum('reaction_type', ['like', 'love', 'haha', 'wow', 'sad', 'angry']);
            $table->timestamps();
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('reactions');
    }
};
