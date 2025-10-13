<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('course_id');
            $table->string('course_title');
            $table->string('course_category');
            $table->text('course_description');
            $table->string('course_price');
            $table->string('course_duration');
            $table->string('course_level');
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('job_role');
            $table->text('reason');
            $table->timestamps();
            $table->unique(['user_id', 'course_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};



