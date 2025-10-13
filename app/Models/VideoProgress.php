<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoProgress extends Model
{
    use HasFactory;

    protected $table = 'video_progress';

    protected $fillable = [
        'user_id',
        'video_id',
        'watched_seconds',
        'completed',
        'completion_percentage',
        'last_watched_at',
        'completed_at',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'completion_percentage' => 'decimal:2',
        'last_watched_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    // Relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship to Video
    public function video()
    {
        return $this->belongsTo(Video::class);
    }

    // Mark video as completed
    public function markAsCompleted()
    {
        $this->update([
            'completed' => true,
            'completion_percentage' => 100.00,
            'completed_at' => now(),
        ]);
    }

    // Update progress
    public function updateProgress($watchedSeconds, $totalSeconds)
    {
        $percentage = $totalSeconds > 0 ? min(100, ($watchedSeconds / $totalSeconds) * 100) : 0;
        
        $this->update([
            'watched_seconds' => $watchedSeconds,
            'completion_percentage' => round($percentage, 2),
            'last_watched_at' => now(),
            'completed' => $percentage >= 90, // Consider 90% as completed
            'completed_at' => $percentage >= 90 ? now() : null,
        ]);
    }
}
