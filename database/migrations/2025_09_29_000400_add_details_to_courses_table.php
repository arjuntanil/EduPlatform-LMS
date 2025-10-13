<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->text('about')->nullable()->after('description');
            $table->string('instructor_name')->nullable()->after('about');
            $table->text('instructor_description')->nullable()->after('instructor_name');
            $table->text('program_outcomes')->nullable()->after('instructor_description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn(['about', 'instructor_name', 'instructor_description', 'program_outcomes']);
        });
    }
};






