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
        Schema::table('videos', function (Blueprint $table) {
            // Add fields for file storage
            $table->string('file_path')->nullable()->after('video_url');
            $table->string('original_filename')->nullable()->after('file_path');
            $table->integer('file_size')->nullable()->after('original_filename'); // in bytes
            $table->string('mime_type')->nullable()->after('file_size');
            
            // Make video_url nullable since we'll support both URL and file upload
            $table->string('video_url')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->dropColumn(['file_path', 'original_filename', 'file_size', 'mime_type']);
            $table->string('video_url')->nullable(false)->change();
        });
    }
};
