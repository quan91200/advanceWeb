<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->enum('status', ['public', 'private', 'friend'])->default('public')->index();
            $table->string('image_url', 2048)->nullable();
            $table->softDeletes();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->boolean('is_comment')->default(true);
            $table->timestamps();
        });        
    }
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
