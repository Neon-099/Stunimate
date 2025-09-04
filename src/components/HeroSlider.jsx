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
                className='absolute inset-0 w-full h-full object-cover'
                src={img}
                alt={title}
            />
            {/* Gradient overlays for readability */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#28242c] via-transparent to-[#28242c]/40'></div>
            <div className='absolute inset-0 bg-gradient-to-r from-[#28242c]/80 via-[#28242c]/20 to-transparent'></div>

            {/* Text block */}
            <div className="absolute bottom-40 left-16 right-16 sm:right-24 text-white max-w-3xl">
                <h2 className="text-3xl sm:text-5xl font-extrabold mb-3 drop-shadow">{title}</h2>
                <p className="text-sm sm:text-base text-gray-200 max-w-2xl line-clamp-4">{description || 'Amazing anime content'}</p>
            </div>

            {/* Meta row */}
            <div className='absolute bottom-28 left-16 flex flex-row gap-4 text-white'>
                <div className='flex items-center gap-1 bg-black/40 px-2 py-1 rounded'>
                    <CirclePlay size={18} />
                    <p className='font-semibold text-sm'>{types || 'TV'}</p>
                </div>
                <div className='flex items-center gap-1 bg-black/40 px-2 py-1 rounded'>
                    <Clock size={18} />
                    <p className='font-semibold text-sm'>{'24m'}</p>
                </div>
                <div className='flex items-center gap-1 bg-black/40 px-2 py-1 rounded'>
                    <ClosedCaption size={18} />
                    <p className='font-semibold text-sm'>{episodes || '11'}</p>
                </div>
            </div>

            {/* Actions */}
            <div className='absolute bottom-16 left-16 flex items-center gap-3'>
                <Link to={`/streaming/${id}`} className='rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 flex items-center gap-2'>
                    <Play size={18} />
                    Watch now
                </Link>
                <Link to={`/details/${id}`} className='rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2 flex items-center gap-2 backdrop-blur-sm'>
                    Details
                    <ChevronRight size={18} />
                </Link>
            </div>
        </div>
    )
}

export default HeroSlider;