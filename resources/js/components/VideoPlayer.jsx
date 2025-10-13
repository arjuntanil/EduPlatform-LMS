import React, { useRef, useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

export default function VideoPlayer({ video, onProgressUpdate, className = '' }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(video.progress || null);
    const lastUpdateTimeRef = useRef(0);
    const isUpdatingRef = useRef(false);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleLoadedData = () => {
            setDuration(videoElement.duration);
            // Restore previous progress if available
            if (progress && progress.watched_seconds > 0) {
                videoElement.currentTime = Math.min(progress.watched_seconds, videoElement.duration);
            }
        };

        const handleTimeUpdate = () => {
            const current = videoElement.currentTime;
            const total = videoElement.duration;
            setCurrentTime(current);

            // Update progress every 10 seconds or when video ends (increased from 5 to reduce load)
            if (!isUpdatingRef.current && (current - lastUpdateTimeRef.current >= 10 || current >= total - 1)) {
                updateProgress(current, total);
                lastUpdateTimeRef.current = current;
            }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => {
            setIsPlaying(false);
            // Save progress when pausing
            const current = videoElement.currentTime;
            const total = videoElement.duration;
            if (current > 0) {
                updateProgress(current, total);
            }
        };
        const handleEnded = () => {
            setIsPlaying(false);
            updateProgress(videoElement.duration, videoElement.duration);
        };

        videoElement.addEventListener('loadeddata', handleLoadedData);
        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);
        videoElement.addEventListener('ended', handleEnded);

        return () => {
            // Save progress before unmounting
            if (videoElement.currentTime > 0) {
                updateProgress(videoElement.currentTime, videoElement.duration);
            }
            
            videoElement.removeEventListener('loadeddata', handleLoadedData);
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
            videoElement.removeEventListener('ended', handleEnded);
        };
    }, []); // Empty dependency array - only run once on mount

    const updateProgress = async (watchedSeconds, totalSeconds) => {
        // Prevent multiple simultaneous updates
        if (isUpdatingRef.current) return;
        
        isUpdatingRef.current = true;
        
        try {
            console.log('📊 Updating progress:', {
                videoId: video.id,
                watched: Math.floor(watchedSeconds),
                total: Math.floor(totalSeconds),
                percentage: ((watchedSeconds / totalSeconds) * 100).toFixed(1) + '%'
            });
            
            const response = await axios.post(route('videos.progress', video.id), {
                watched_seconds: Math.floor(watchedSeconds),
                total_seconds: Math.floor(totalSeconds),
            });

            if (response.data.success) {
                console.log('✅ Progress saved:', response.data.progress);
                setProgress(response.data.progress);
                if (onProgressUpdate) {
                    onProgressUpdate(video.id, response.data.progress);
                }
            }
        } catch (error) {
            console.error('❌ Failed to update video progress:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
        } finally {
            isUpdatingRef.current = false;
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgressPercentage = () => {
        if (duration === 0) return 0;
        return (currentTime / duration) * 100;
    };

    return (
        <div className={`bg-black rounded-lg overflow-hidden ${className}`}>
            {/* Video Element */}
            <video
                ref={videoRef}
                src={video.video_url}
                controls
                className="w-full h-full"
                style={{ maxHeight: '500px' }}
            >
                Your browser does not support the video tag.
            </video>

            {/* Progress Info */}
            <div className="bg-gray-900 text-white p-3 text-sm">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <span>{video.title}</span>
                        {progress && progress.completed && (
                            <CheckCircleIcon className="h-5 w-5 text-green-400" title="Completed" />
                        )}
                    </div>
                    <div className="text-gray-300">
                        {formatTime(currentTime)} / {formatTime(duration || video.duration_minutes * 60)}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                </div>

                {/* Progress Stats */}
                {progress && (
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>
                            Progress: {Number(progress.completion_percentage || 0).toFixed(1)}%
                        </span>
                        {progress.completed && (
                            <span className="text-green-400">✓ Completed</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}