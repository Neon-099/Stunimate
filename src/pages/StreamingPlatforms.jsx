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
    ClosedCaption,
    ThumbsUpIcon,
    ThumbsDownIcon,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    //FORMAT TIME HELPER
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
    <div className=''>
    <Navbar />
    <div
        ref={containerRef}
        className={`relative py-24 ${isFullScreen ? 'fixed inset-0 z-50' : 'w-full max-w-6xl mx-auto'} overflow-hidden rounded-lg shadow-2xl`}
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
                    <p className="text-2xl text-gray-400 tracking-[0.5rem] uppercase">Animation</p>
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
                    <button className="bg-opacity-20 hover:bg-opacity-30 rounded-full p-6 transition-all duration-200 transform hover:scale-110"
                        onClick={togglePlay}>
                        <Play className='w-12 h-12 text-white ml-1' />
                    </button>
                </div>
            )}

            {/*CLICK TO PLAY PAUSE*/}
            <div className="absolute inset-0 cursor-pointer"
                onClick={togglePlay}
                />

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
                    </div>
                    {/*RIGHT CONTROLS*/}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setCaptionsEnabled(!captionsEnabled)}
                            className={`transition-colors duration-200 ${captionsEnabled ? 'text-red-500' : 'text-white hover:text-gray-300'}`}
                            >
                            <ClosedCaption className='w-6 h-6'/>
                        </button>

                        <button className="text-white hover:text-gray-300 transition-colors duration-200"
                            >
                            <PictureInPicture className='w-6 h-6'/>
                        </button>

                        {/*SETTINGS MENU*/}
                        <div className="relative">
                            <button className="text-white hover:text-gray-300 transition-colors duration-200"
                                onClick={() => setShowSettings(!showSettings)}
                            >
                                <Settings className='w-6 h-6'/>
                            </button>

                        {showSettings && (
                        <div className="absolute bottom-12 right-0 bg-black bg-opacity-90 rounded-lg p-4 min-w-48">
                            <div className="space-y-3">
                            <div className="relative">
                            <button
                                onClick={() => setShowSpeed(!showSpeed)}
                                className="flex justify-between items-center w-full text-white hover:text-gray-300 transition-colors duration-200"
                            >
                                <span>Speed</span>
                                <span className="text-gray-400">{playBackSpeed}x</span>
                            </button>
                            
                            {showSpeed && (
                                <div className="absolute left-0 bottom-8 bg-gray-800 rounded p-2 space-y-1">
                                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(speed => (
                                    <button
                                    key={speed}
                                    onClick={() => changePlayBackSpeed(speed)}
                                    className={`block w-full text-left px-3 py-1 rounded transition-colors duration-200 ${
                                        playBackSpeed === speed ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                                    }`}
                                    >
                                    {speed}x
                                    </button>
                                ))}
                                </div>
                            )}
                            </div>

                            <div className="relative">
                            <button
                                onClick={() => setShowQuality(!showQuality)}
                                className="flex justify-between items-center w-full text-white hover:text-gray-300 transition-colors duration-200"
                            >
                                <span>Quality</span>
                                <span className="text-gray-400">{quality}</span>
                            </button>
                            
                            {showQuality && (
                                <div className="absolute left-0 bottom-8 bg-gray-800 rounded p-2 space-y-1">
                                {['Auto', '1080p', '720p', '480p', '360p'].map(qual => (
                                    <button
                                    key={qual}
                                    onClick={() => changeQuality(qual)}
                                    className={`block w-full text-left px-3 py-1 rounded transition-colors duration-200 ${
                                        quality === qual ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                                    }`}
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
                    

            <button
              onClick={toggleFullScreen}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              <Maximize className="w-6 h-6" />
            </button>
          </div>
        </div>
            </div>

        {/* Captions */}
        {captionsEnabled && (
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
            <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded text-center">
                Welcome to MES Animation streaming platform
            </div>
            </div>
        )}

      {/* Keyboard Shortcuts Info */}
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

    {/* Episode Information Section */}
      <div className="text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Current Episode Info */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-red-500 text-sm font-semibold mb-2">The Water Magician</h2>
                <h1 className="text-2xl font-bold mb-3">E1 - The Slow, But Dangerous, Life</h1>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <span className="bg-gray-700 px-2 py-1 rounded">16+</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Sub</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Dub</span>
                  <span>Released on Jul 4, 2025</span>
                </div>

                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-white hover:text-red-500 transition-colors duration-200 ">
                      <ThumbsUpIcon className='w-5 h-5 active:bg-white'/>
                    </button>
                    <span className="text-gray-400">59.5K</span>
                  </div>
                  
                  {/*DISLIKED*/}
                  <div className="flex items-center space-x-2">
                    <button className="text-white hover:text-red-500 transition-colors duration-200">
                      <ThumbsDownIcon className='w-5 h-5'/>
                    </button>
                    <span className="text-gray-400">470</span>
                  </div>
                    {/*SHARE BUTTON*/}        
                    <button className="text-white hover:text-red-500 transition-colors duration-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                    </button>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                    After dying, Ryo Mihara finds himself reincarnated in a fantasy world with the ability to cast water magic.
                    </p>

                    <button className="text-red-500 hover:text-red-400 text-sm font-semibold transition-colors duration-200">
                    SHOW MORE
                    </button>
                    </div>
                </div>
           </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StreamingPlatforms;

