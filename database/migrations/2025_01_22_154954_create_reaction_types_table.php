<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reaction_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 20)->unique(); // like, love, sad, wow, angry
            $table->string('icon')->nullable();
            $table->timestamps();
        });
        
    }
    public function down(): void
    {
        Schema::dropIfExists('reaction_types');
    }
};
