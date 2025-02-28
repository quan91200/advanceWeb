<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('friends', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); 
            $table->unsignedBigInteger('friend_id'); 
            $table->enum('status', ['none','pending', 'accepted', 'blocked'])->default('none');
            $table->boolean('is_favorite')->default(false);
            $table->text('note')->nullable();
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('friend_id')->references('id')->on('users')->onDelete('cascade');
            
            // Đảm bảo rằng mỗi cặp user_id và friend_id chỉ xuất hiện một lần, bất kể thứ tự
            $table->unique(['user_id', 'friend_id'], 'unique_friendship');
        }); 
    }

    public function down(): void
    {
        Schema::dropIfExists('friends');
    }
};
