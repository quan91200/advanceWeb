<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->text('content')->nullable();
            $table->string('image_url', 255)->nullable();
            $table->foreignId('post_id')->constrained('posts')->onDelete('cascade')->index()
                ->name('comments_post_id_foreign'); 
            $table->foreignId('parent_id')->nullable()->constrained('comments')
                ->onDelete('cascade')->index()
                ->name('comments_parent_id_foreign');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign(['post_id']);
            $table->dropForeign(['parent_id']);
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
        });
    }
};
