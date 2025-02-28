<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /*
         * nullableMorphs tạo ra 2 cột:
         * 1.reactable_type (Xác định mô hình: posts hoặc comments)
         * 2.reactable_id (Xác định id của post hoặc comment liên quan)
         */
        Schema::create('reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('reaction_type_id')->constrained('reaction_types')->onDelete('cascade');
            $table->nullableMorphs('reactable'); // Hỗ trợ post và comment
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('reactions');
    }
};
