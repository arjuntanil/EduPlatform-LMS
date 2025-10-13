<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'description',
        'video_url',
        'file_path',
        'original_filename',
        'file_size',
        'mime_type',
        'duration_minutes',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Relationship to Course
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    // Relationship to VideoProgress
    public function progress()
    {
        return $this->hasMany(VideoProgress::class);
    }

    // Get user's progress for this video
    public function getUserProgress($userId)
    {
        return $this->progress()->where('user_id', $userId)->first();
    }

    // Scope for active videos
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for ordered videos
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    // Get the video source URL (file or external URL)
    public function getVideoSource()
    {
        if ($this->file_path) {
            return route('videos.serve', $this->id);
        }
        return $this->video_url;
    }

    // Check if video is uploaded file
    public function isUploadedFile()
    {
        return !empty($this->file_path);
    }

    // Get human readable file size
    public function getFormattedFileSize()
    {
        if (!$this->file_size) return 'Unknown';
        
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }
}
