import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import VideoPlayer from '@/Components/VideoPlayer';
import { PlayIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Videos({ course, videos }) {
    const [currentVideo, setCurrentVideo] = useState(videos.length > 0 ? videos[0] : null);
    const [videoProgress, setVideoProgress] = useState(() => {
        const progressMap = {};
        videos.forEach(video => {
            if (video.progress) {
                progressMap[video.id] = video.progress;
            }
        });
        return progressMap;
    });

    const handleProgressUpdate = (videoId, progress) => {
        setVideoProgress(prev => ({
            ...prev,
            [videoId]: progress
        }));
    };

    const getVideoStatus = (video) => {
        const progress = videoProgress[video.id];
        if (!progress) return 'not-started';
        if (progress.completed) return 'completed';
        if (progress.completion_percentage > 0) return 'in-progress';
        return 'not-started';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
            case 'in-progress':
                return <ClockIcon className="h-5 w-5 text-yellow-500" />;
            default:
                return <PlayIcon className="h-5 w-5 text-gray-400" />;
        }
    };

    const getStatusText = (status, progress) => {
        switch (status) {
            case 'completed':
                return 'Completed';
            case 'in-progress':
                const percentage = progress?.completion_percentage || 0;
                return `${Math.round(Number(percentage))}% watched`;
            default:
                return 'Not started';
        }
    };

    const completedCount = videos.filter(video => getVideoStatus(video) === 'completed').length;
    const progressPercentage = videos.length > 0 ? (completedCount / videos.length) * 100 : 0;

    return (
        <AuthenticatedLayout>
            <Head title={`${course.title} - Videos`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={route('courses.show', course.id)}
                        className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 mb-4"
                    >
                        ← Back to Course
                    </Link>
                    
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                            <p className="text-gray-600 mb-4">Course Videos</p>
                        </div>
                        
                        {/* Progress Summary */}
                        <div className="bg-white rounded-lg shadow-sm border p-4 min-w-[200px]">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Progress</h3>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">
                                    {completedCount} of {videos.length} completed
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                    {Math.round(progressPercentage)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {videos.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <PlayIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No videos available</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Videos for this course haven't been uploaded yet. Check back later!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Video Player */}
                        <div className="lg:col-span-2">
                            {currentVideo && (
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <VideoPlayer
                                        video={currentVideo}
                                        onProgressUpdate={handleProgressUpdate}
                                        className="w-full"
                                    />
                                    
                                    {/* Video Details */}
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                                            {currentVideo.title}
                                        </h2>
                                        {currentVideo.description && (
                                            <p className="text-gray-600 mb-4">
                                                {currentVideo.description}
                                            </p>
                                        )}
                                        <div className="flex items-center text-sm text-gray-500">
                                            <ClockIcon className="h-4 w-4 mr-1" />
                                            <span>{currentVideo.duration_minutes} minutes</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Video List */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Course Content
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {videos.length} video{videos.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                
                                <div className="divide-y divide-gray-200">
                                    {videos.map((video, index) => {
                                        const status = getVideoStatus(video);
                                        const progress = videoProgress[video.id];
                                        const isActive = currentVideo && currentVideo.id === video.id;
                                        
                                        return (
                                            <button
                                                key={video.id}
                                                onClick={() => setCurrentVideo(video)}
                                                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                                                    isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                                                }`}
                                            >
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0 mr-3">
                                                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                                                {video.title}
                                                            </h4>
                                                            {getStatusIcon(status)}
                                                        </div>
                                                        
                                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                                            <span>{video.duration_minutes} min</span>
                                                            <span>{getStatusText(status, progress)}</span>
                                                        </div>
                                                        
                                                        {/* Progress bar for individual video */}
                                                        {progress && progress.completion_percentage > 0 && (
                                                            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                                                                <div
                                                                    className={`h-1 rounded-full transition-all duration-300 ${
                                                                        progress.completed ? 'bg-green-500' : 'bg-blue-500'
                                                                    }`}
                                                                    style={{ width: `${progress.completion_percentage}%` }}
                                                                ></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}