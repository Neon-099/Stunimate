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
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [playBackSpeed, setPlayBackSpeed] = useState(1);
    const [quality, setQuality] = useState('720p');
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

    const handleProgressChange = (e ) => {
        if(progressRef.current) {
            
        }
    }
}


