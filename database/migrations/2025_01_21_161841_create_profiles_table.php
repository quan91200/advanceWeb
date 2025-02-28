<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('country_code', 5)->nullable(); // Lưu mã quốc gia như +84, +1
            $table->string('phone_number', 20)->nullable();
            $table->foreignId('location_id')->nullable()->constrained('locations')->onDelete('set null'); 
            $table->date('dob')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('job', 100)->nullable();
            $table->enum('relationship', ['single', 'married', 'divorced', 'complicated'])->nullable();
            $table->text('bio')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
