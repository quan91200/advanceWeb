<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null'); 
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable(); 
            $table->longText('payload')->nullable(); 
            $table->integer('last_activity')->index(); 
            $table->timestamps(); 
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};