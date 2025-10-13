<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'description',
        'about',
        'instructor_name',
        'instructor_description',
        'program_outcomes',
        'price',
        'image',
        'duration',
        'level',
        'category_id',
    ];

    // Append the has_videos attribute when converting to array/JSON
    protected $appends = ['has_videos'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    public function activeVideos()
    {
        return $this->hasMany(Video::class)->where('is_active', true)->orderBy('order');
    }

    // Accessor to check if course has videos
    public function getHasVideosAttribute()
    {
        return $this->videos()->where('is_active', true)->exists();
    }
}
