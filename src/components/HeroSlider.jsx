import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronLeft, ChevronRight, Play} from 'lucide-react';
import {movies} from '../sampleStorage.js';

const HeroSlider = () => {
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
        <div className='relative w-full h-[500px] overflow-hidden rounded-xl shadow-2xl'>
            <AnimatePresence mode="wait">
                <motion.div
                    key={movies[index].id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <img 
                        className='w-full h-full object-cover'
                        src={movies[index].img}
                        alt={movies[index].title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-45 left-16 right-0 p-8 text-white">
                        <h2 className="text-4xl font-bold mb-2">{movies[index].title}</h2>
                        <p className="text-lg opacity-90">{movies[index].description || 'Amazing anime content'}</p>
                    </div>
                    <div className='absolute bottom-30 left-27 rounded-lg bg-red-600 p-3 flex flex-row text-white px-3 gap-2'>
                        <Play />
                        <button >Watch now</button>
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
            
            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {movies.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            i === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default HeroSlider;