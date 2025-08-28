import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import TrendingAnimeCard from '../components/TrendingAnimeCard.jsx';
import AnimeCard from '../components/AnimeCard.jsx';
import {movies} from '../sampleStorage.js';
import {ChevronLeft, ChevronRight, Play} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Footer from '../components/Footer.jsx';


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
    const latestEpisodes = movies.slice(0, 12);
    const genres = [
        { name: 'Action', colorClass: 'text-emerald-300' },
        { name: 'Adventure', colorClass: 'text-amber-300' },
        { name: 'Cars', colorClass: 'text-rose-300' },
        { name: 'Comedy', colorClass: 'text-indigo-300' },
        { name: 'Dementia', colorClass: 'text-sky-300' },
        { name: 'Demons', colorClass: 'text-rose-300' },
        { name: 'Drama', colorClass: 'text-emerald-300' },
        { name: 'Ecchi', colorClass: 'text-lime-300' },
        { name: 'Fantasy', colorClass: 'text-amber-300' },
        { name: 'Game', colorClass: 'text-rose-300' },
        { name: 'Harem', colorClass: 'text-purple-300' },
        { name: 'Historical', colorClass: 'text-sky-300' },
        { name: 'Horror', colorClass: 'text-rose-300' },
        { name: 'Isekai', colorClass: 'text-emerald-300' },
        { name: 'Josei', colorClass: 'text-lime-300' },
        { name: 'Kids', colorClass: 'text-amber-300' },
        { name: 'Magic', colorClass: 'text-rose-300' },
        { name: 'Martial Arts', colorClass: 'text-violet-300' },
        { name: 'Mecha', colorClass: 'text-sky-300' },
        { name: 'Military', colorClass: 'text-amber-300' },
        { name: 'Music', colorClass: 'text-emerald-300' },
        { name: 'Mystery', colorClass: 'text-lime-300' },
        { name: 'Parody', colorClass: 'text-amber-300' },
        { name: 'Police', colorClass: 'text-rose-300' },
    ];
    
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
                    <HeroSlider 
                        />
                    
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

                    {/* Latest Episode with Genres Sidebar */}
                    <div className="mt-12 xl:grid  xl:grid-cols-4 gap-8 items-start">
                        <div className="xl:col-span-3">
                            <div className='flex justify-between items-center'>
                                <h2 className="text-3xl font-bold text-white mb-6">Latest Episode</h2>
                                <button className='text-white'>Show more</button>
                            </div>
                            
                            <div className="grid grid-cols-1 2xl:grid-cols-6 xl:grid-cols-6 lg md:grid-cols-4 sm:grid-cols-3 gap-6">
                                <AnimatePresence initial={false}>
                                    {latestEpisodes.map((anime, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            key={`latest-${index}`}>
                                            <AnimeCard 
                                                id={anime.id}
                                                title={anime.title} 
                                                img={anime.img}
                                                description={anime.description}
                                                duration={anime.duration || '24m'}
                                                status={anime.status || 'Currently Airing'}
                                                genres={anime.genre || []}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        {/* Sidebar: Genres */}
                        <aside className="hidden xl:block bg-gray-800/60 rounded-lg p-5 border border-gray-700">
                            <h3 className="text-2xl font-bold text-white mb-4">Genres</h3>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                {genres.map((g) => (
                                    <button
                                        key={g.name}
                                        className={`text-left text-base font-medium ${g.colorClass} hover:underline`}
                                    >
                                        {g.name}
                                    </button>
                                ))}
                            </div>
                            <button className="mt-6 w-full bg-gray-700/80 hover:bg-gray-600 text-white font-semibold py-3 rounded-md">
                                Show more
                            </button>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home;
