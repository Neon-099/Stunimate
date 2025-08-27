import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import TrendingAnimeCard from '../components/TrendingAnimeCard.jsx';
import {movies} from '../sampleStorage.js';
import {ChevronLeft, ChevronRight, Play} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";


const Home = () => {

    const [startIndex, setStartIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);

    //ADJUST ITEMS PER PAGE BASED ON SCREEN SIZE
    useEffect(()=> {
        const updateItemsPerPage = () => {
            if(window.innerWidth < 990) {
                setItemsPerPage(3);
            }
            else if (window.innerWidth < 1436) {
                setItemsPerPage(4);
            }
            else if (window.innerWidth < 2000) {
                setItemsPerPage(6);
            }
            else {
                setItemsPerPage(10);
            }
        }

        updateItemsPerPage()
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage); 
    })

    //TO RESPECT BOTH PAGINATION (RENDERING, SCROLLING/DISPLAYING)
    const limitedMovies = movies.slice(0, 10);
    const visibleItems = limitedMovies.slice(startIndex, startIndex + itemsPerPage);
    
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


    
    return (
        <div className="min-h-screen ">
            <Navbar />
            
            {/* Main content with proper spacing for fixed navbar */}
            <main className="pt-20 px-4 md:px-8">
                <div className="max-w-[2300px] mx-auto py-6">
                    <HeroSlider/>
                    
                    {/* Trending Anime Section */}
                    <div className="mt-12 relative">
                        <h2 className="text-3xl font-bold text-red-600 mb-6">Trending Anime</h2>
                        <div className="grid grid-cols-1 2xl:grid-cols-8 xl:grid-cols-6 lg md:grid-cols-4 sm:grid-cols-3 gap-6 mr-17 transition transition-transform duration-500 ease-in-out ">
                            <AnimatePresence initial={false}>
                                {visibleItems.slice(0, 10).map((anime, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}     // enter animation
                                    animate={{ opacity: 1, y: 0 }}      // animate to visible
                                    exit={{ opacity: 0, y: -20 }}       // exit animation
                                    transition={{ duration: 0.3 }}>
                                    
                            
                                    <TrendingAnimeCard 
                                        key={index} 
                                        title={anime.title} 
                                        img={anime.img}
                                        episodeNumber={anime.id}
                                        id={anime.id}
                                        />
                                </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className='mt-15 hidden sm:flex flex-col gap-5 absolute right-[1rem] top-1/2 h-full -translate-y-1/2'>
                          <button 
                                onClick={handlePrev}
                                disabled={startIndex === 0}
                                className='py-15 px-2 bg-gray-600 text-white text-bold rounded-xl hover:bg-gray-800'>
                                <ChevronLeft/>
                            </button>  
                            <button
                                className='py-15 px-2  bg-gray-600 text-white text-bold rounded-xl hover:bg-gray-800'
                                onClick={handleNext}
                                disabled={startIndex + itemsPerPage >= limitedMovies.length}>
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
