import React, {useState, useEffect, useRef} from 'react';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Settings,
    SkipForward,
    SkipBack,
    Rewind,
    FastForward,
    Type,
    PictureInPicture,
} from 'lucide-react';


const StreamingPlatforms = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(24 * 60 + 7);
    const [volume, setVolume] = useState(1);
    const [quality, setQuality] = useState('1080p')
    const [isMuted, setIsMuted] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [playBackSpeed, setPlayBackSpeed] = useState(1);
    const [showQuality, setShowQuality] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showSpeed, setShowSpeed] = useState(false);
    const [captionsEnabled, setCaptionsEnabled] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);


    //IT GIVE MUTABLE OBJ THAT REACT WILL NOT REST ON RE-RENDER
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    //FORMAT TIME HELPER
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')};
        }`;
    }

    const progressPercentage = (currentTime / duration) * 100;

    const resetControlsTimeout = () => {
        if(controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if(isPlaying) setShowControls(false);
        }, 3000);
    };

    useEffect(() => {
        resetControlsTimeout();
        return () => {
            if(controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        }; 
    }, [isPlaying]);

    //SIMULATE VIDEO PLAYBACK
    useEffect(() => {
        let interval = null;
        if(isPlaying && !isBuffering) {
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    if(prev >= duration) {
                    setIsPlaying(false);
                    return duration;
                }
                return prev + playBackSpeed;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isBuffering, duration, playBackSpeed]);

    const togglePlay = ()=> {
        setIsPlaying(!isPlaying);
        resetControlsTimeout();
    }

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    }

    const handleProgressChange = (e ) => {
        if(progressRef.current) {
            const rect = progressRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * duration;
            setCurrentTime(Math.max(0, Math.min(newTime, duration)));
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    }

    const skipTime = (seconds) => {
        setCurrentTime(prev => Math.max(0, Math.min(prev + seconds, duration)));
    }

    const changePlayBackSpeed = (speed) => {
        setPlayBackSpeed(speed);
        setShowSpeed(false);
    }

    const changeQuality = (qual) => {
        setQuality(qual);
        setShowQuality(false);  
        setIsBuffering(true);
        setTimeout(() => setIsBuffering(false), 1500);
    }

    return (
        <div
            ref={containerRef}
            className={`relative bg-black ${isFullscreen ? 'fixed inset-0 z-50' : 'w-full max-w-6xl mx-auto'} overflow-hidden rounded-lg shadow-2xl`}
            onMouseMove={resetControlsTimeout}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            >
            
            {/*VIDEO CONTENT AREA*/}
            <div className="relative w-full" style={{aspectRatio: '16/9'}}>
                {/*SIMULATED VIDEO CONTENT*/}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center">
                    {/*LOGO CONTENT*/}
                    <div className="text-center">
                        <div className="mb-8">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-16 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-lg mr-3 flex items-center justify-center">
                                    <div className="w-12 h-1 bg-white rounded-full transform rotate-12"></div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-6xl font-bold text-white tracking-wider mb-2">MES</h1>
                        <p className="text-2xl text-gray-400 tracking-[0 5rem] uppercase">Animation</p>
                    </div> 
                </div>
            </div>

            {/*BUFFERING INDICATOR*/}
            {isBuffering  && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            )}
            
            {/*VIDEO CONTROLS*/}
            {!isPlaying && !isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-6 transition-all duration-200 transform hover:scale-110"
                        onClick={togglePlay}>
                        <Play className='w-12 h-12 text-white ml-1' />
                    </button>
                </div>
            )}

            {/*CLICK TO PLAY PAUSE*/}
            <div className="absolute inset-0 cursor-pointer"
                onClick={togglePlay}
                >
            </div>

            {/*CONTROLS*/}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 transition-all duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                {/*PROGRESS BAR*/}
                <div className="mb-4">
                    <div className="relative h-2 bg-gray-600 rounded-full cursor-pointer group"
                        ref={progressRef}
                        onClick={handleProgressChange}
                        >
                        <div className="absolute top-0 left-0 h-full bg-red-600 rounded-full transition-full duration-600"
                            style={{width: `${progressPercentage}%`}}
                            />
                        <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab"
                            style={{left: `${progressPercentage}%`, marginLeft: '8px' }}
                            />
                    </div>
                </div>
            </div>

            {/*CONTROL BARS*/}
            <div className="flex items-center justify-between">
                {/*LEFT CONTROLS*/}
                <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-gray-300 transition-colors duration-200"
                        onClick={togglePlay}
                        >
                            {isPlaying ? <Pause className='w-8 h-8 '/> : <Play className='w-8 h-8'/>}
                    </button>

                    <button className="text-white hover:text-gray-300 transition-colors duration-200"
                        onClick={() => skipTime(-10)}
                        >
                            <SkipBack className='w-6 h-6' />
                    </button>

                    <button className='text-white hover:text-gray-300 transition-colors duration-200'
                        onClick={() => skipTime(10)}
                        >
                            <SkipForward className='w-6 h-6' />
                    </button>

                    {/*VOLUME CONTROLS*/}
                    <div className="flex items-center space-x-2 group">
                        <button className="text-white hover:text-gray-300 transition-colors duration-200"
                            onClick={toggleMute}
                            >
                            {isMuted || volume === 0 ? <VolumeX className='w-6 h-6' /> : <Volume2 className='w-6 h-6' />}
                        </button> 
                        <input type="range" 
                            min='0'
                            max='1' 
                            step='0.05'
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className='w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200' 
                            style={{
                                background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(!isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, $4b5563 100%)`
                            }}
                            />
                    </div>
                   
                    {/*TIME DISPLAY*/}
                    <div className="text-white text-sm font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/*RIGHT CONTROLS*/}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setCaptionsEnabled(!captionsEnabled)}
                            className={`transition-colors duration-200 ${captionsEnabled ? 'text-red-500' : 'text-white hover:text-gray-300'}`}
                            >
                            <Type className='w-6 h-6'/>
                        </button>

                        <button className="text-white hover:text-gray-300 transition-colors duration-200"
                            >
                                <PictureInPicture className='w-6 h-6'/>
                        </button>

                        {/*SETTINGS MENU*/}
                        <div className="relative">
                            <button className="text-white hover:text-gray-300 transition-colors duration"
                                onClick={() => setShowSettings(!showSettings)}
                            >
                                <Settings className='w-6 h-6'/>
                            </button>

                            {showSettings && (
                                <div className="absolute bottom-12 right-0 bg-black bg-opacity-90 rounded-lg p-4 min-w-48">
                                        <div className="relative">
                                            <button className='flex justify-between items-center w-full text-white hover:text-gray-300 transition-colors duration-200'
                                                onClick={() => setShowSpeed(!showSpeed)}
                                                >
                                                    <span>Speed</span>
                                                    <span className='text-gray-400'>{playBackSpeed}x</span>
                                            </button>

                                            {showSpeed && (
                                                <div className="absolute left-0 bottom-0 bg-gray-800 rounded p-2 space-y-1">
                                                    {(0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2).map(speed => (
                                                        <button 
                                                            className={`block w-full text-left px-3 py-1 rounded transition-colors duration-200 ${
                                                                playBackSpeed === speed ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                                                            }`}
                                                            key={speed}
                                                            >
                                                            {speed}x
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        <div/>

                                            <div className="relative">
                                                <button 
                                                    className='flex justify-center items-center w-full text-white hover:text-gray-300 transition-colors duration-200'
                                                    onClick={() => setShowQuality(!showQuality)}
                                                    > 
                                                    <span>Quality</span>
                                                    <span className='text-gray-400'>{quality}</span>
                                                </button>

                                                {showQuality && (
                                                    <div className="absolute left-0 bottom-8 bg-gray-800 rounded p-2 space-y-1">
                                                        {['Auto', '1080p', '720p', '480p', '360p'].map(qual => (
                                                            <button 
                                                                className={`block w-full text-left px-3 py-1 rounded transition-colors duration=200 ${
                                                                    quality === qual ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                                                                }`}
                                                                key={qual}
                                                                onClick={() => changeQuality(qual)}
                                                                >
                                                                    {qual}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                            )}
                        </div>

                        <button className="text-white hover:text-gray-300 transition-colors duration-200"
                            onClick={toggleFullScreen}
                            >
                                <Maximize className='w-6 h-6'/>
                        </button>
                    </div>
                </div>
            </div>

            {/*CAPTIONS*/}
            {captionsEnabled && (
                <div className="absolute bottom-24 left-1/2 transform -translate-colors duration-200">
                    <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded text-center">
                        Welcome to the captions
                    </div>
                </div>
            )}

            <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black bg-opacity-70 text-white text-xs p-3 rounded-lg">
                    <div className="space-y-1">
                        <div>Space: Play/Pause</div>
                        <div>←/→: Seek 10s</div>
                        <div>↑/↓: Volume</div>
                        <div>F: Fullscreen</div>
                        <div>M: Mute</div>
                        <div>C: Captions</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StreamingPlatforms;

