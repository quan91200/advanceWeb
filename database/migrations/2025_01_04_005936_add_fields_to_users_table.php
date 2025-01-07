<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('hobbies')->nullable();
            $table->string('address')->nullable(); 
            $table->string('phoneNumber')->nullable(); 
            $table->date('dob')->nullable(); 
            $table->string('job')->nullable(); 
            $table->string('relationship')->nullable(); 
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('hobbies');
            $table->dropColumn('address');
            $table->dropColumn('phoneNumber');
            $table->dropColumn('dob');
            $table->dropColumn('job');
            $table->dropColumn('relationship');
        });
    }
};
