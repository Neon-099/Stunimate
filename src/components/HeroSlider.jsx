import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronLeft, ChevronRight, Play, CirclePlay, Clock, ClosedCaption} from 'lucide-react';
import {movies} from '../sampleStorage.js';

const HeroSlider = (  ) => {
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
        <div className='relative w-full h-[500px] overflow-hidden bg-[#28242c]'>
            <AnimatePresence mode="wait">
                <motion.div
                    key={movies[index].id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    {/* Full-bleed background image */}
                    <img 
                        className='absolute inset-0 w-full h-full object-cover'
                        src={movies[index].img}
                        alt={movies[index].title}
                    />
                    {/* Soft overlays for readability without visible seams */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#28242c]/20 via-transparent to-[#28242c]/10" />
                    <div className="absolute bottom-55 left-16 right-0 p-8 text-white">
                        <h2 className="text-4xl font-bold mb-2">{movies[index].title}</h2>
                        <p className="text-lg opacity-90 text-sm pr-3">{movies[index].description || 'Amazing anime content'}</p>
                    </div>
                    <div className='absolute bottom-42 left-22 rounded-lg  p-3 flex flex-row text-white px-3 gap-2'>
                        <div className='flex flex-row'>
                            <CirclePlay />
                            <p className='font-bold px-1'>TV</p>
                        </div>
                        <div className='flex flex-row px-1'>
                            <Clock />
                            <p className='font-bold px-1'>{movies[index].duration || '24m'}</p>
                        </div>
                        <div className='flex flex-row'>
                            <ClosedCaption />
                            <p className='font-bold px-1'>{movies[index].episodes || '11'}</p>
                        </div>
                    </div>
                    <div className='absolute bottom-25 left-25 rounded-lg bg-red-600 p-3 flex flex-row text-white px-3 gap-2'>
                        <Play />
                        <button >Watch now</button>
                    </div>
                    <div className='absolute bottom-25 left-67 rounded-lg bg-red-600 p-3 flex flex-row text-white px-3 gap-2'>
                        <button>Details</button>
                        <ChevronRight />
                    </div>
               
                </motion.div>
            </AnimatePresence>
            
            {/* Navigation arrows */}
            <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            >
                <ChevronLeft />
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            >
                <ChevronRight />
            </button>
        </div>
    )
}

export default HeroSlider;