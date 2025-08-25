import {useState} from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import AnimeCard from '../components/AnimeCard.jsx';
import {movies} from '../sampleStorage.js';
import {ChevronLeft, ChevronRight, Play} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";


const Home = () => {

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;

    const handleNext = () => {
        if(startIndex + itemsPerPage < movies.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if(startIndex > 0 ) {
            setStartIndex( startIndex - 1 );
        }
    };


    const visibleItems = movies.slice(startIndex, startIndex + itemsPerPage)
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Main content with proper spacing for fixed navbar */}
            <main className="pt-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto py-6">
                    <HeroSlider />
                    
                    {/* Trending Anime Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Trending Anime</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mr-17 transition transition-transform duration-500 ease-in-out ">
                            <AnimatePresence initial={false}>
                                {visibleItems.map((anime) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}     // enter animation
                                    animate={{ opacity: 1, y: 0 }}      // animate to visible
                                    exit={{ opacity: 0, y: -20 }}       // exit animation
                                    transition={{ duration: 0.3 }}>
                                    
                            
                                    <AnimeCard 
                                        key={anime.id} 
                                        title={anime.title} 
                                        img={anime.img}
                                        episodeNumber={anime.id}
                                        id={anime.id}
                                        />
                                </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className='flex flex-col items-end translate-y-[-317px] gap-5'>
                          <button 
                                onClick={handlePrev}
                                disabled={startIndex === 0}
                                className='py-15 px-2 border bg-gray-600 text-white text-bold rounded-xl hover:bg-gray-800'>
                                <ChevronLeft/>
                            </button>  
                            <button
                                className='py-15 px-2 border bg-gray-600 text-white text-bold rounded-xl hover:bg-gray-800'
                                onClick={handleNext}
                                disabled={startIndex + itemsPerPage >= movies.length}>
                                <ChevronRight/>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;
