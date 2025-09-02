import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { Link } from 'react-router-dom';
import {ChevronLeft, ChevronRight, Play, CirclePlay, Clock, ClosedCaption} from 'lucide-react';
import {movies} from '../sampleStorage.js';

const HeroSlider = ( {id, title, img, description, types, episodes} ) => {
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 10000);
        
        return () => clearInterval(timer);
    }, [index]);
    
    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };
    
    const prevSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    };
    
    return (
        <div className=''>
            
            {/* Full-bleed background image */}
            <img 
                className='absolute inset-0 w-full h-full object-contains'
                src={img}
                alt={title}
            />
            {/* Soft overlays for readability without visible seams */}
            <div className="absolute bottom-55 left-16 right-0 p-8 text-white">
                <h2 className="text-4xl font-bold mb-2">{title}</h2>
                <p className="text-lg opacity-90 text-sm pr-3">{description || 'Amazing anime content'}</p>
            </div>
            <div className='absolute bottom-42 left-22 rounded-lg  p-3 flex flex-row text-white px-3 gap-2'>
                <div className='flex flex-row'>
                    <CirclePlay />
                    <p className='font-bold px-1'>TV</p>
                </div>
                <div className='flex flex-row px-1'>
                    <Clock />
                    <p className='font-bold px-1'>{'24m'}</p>
                </div>
                <div className='flex flex-row'>
                    <ClosedCaption />
                    <p className='font-bold px-1'>{episodes || '11'}</p>
                </div>
            </div>
            <div className='absolute bottom-25 left-25 rounded-lg bg-red-600 p-3 flex flex-row text-white px-3 gap-2'>
                <Play />
                <Link to={`/streaming/${id}`} >Watch now</Link>
            </div>
            <Link to={`/details/${id}`} className='absolute bottom-25 left-67 rounded-lg bg-red-600 p-3 flex flex-row text-white px-3 gap-2'>
                <button >Details</button>
                <ChevronRight />
            </Link >
            
        </div>
    )
}

export default HeroSlider;