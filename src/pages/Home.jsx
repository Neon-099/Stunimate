import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import TrendingAnimeCard from '../components/TrendingAnimeCard.jsx';
import AnimeCard from '../components/AnimeCard.jsx';
import {movies} from '../sampleStorage.js';
import {ChevronLeft, ChevronRight, Play} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Footer from '../components/Footer.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Home = () => {

    const [startIndex, setStartIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [topAnime, setTopAnime] = useState([]);
    const [latestEpisode, setLatestEpisode] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState(null);  


    //ADJUST ITEMS PER PAGE BASED ON SCREEN SIZE
    useEffect(()=> {
        const updateItemsPerPage = () => {
            if(window.innerWidth <= 990) {
                setItemsPerPage(3);
            }
            else if (window.innerWidth <= 1200) {
                setItemsPerPage(3);
            }
            else if (window.innerWidth <= 1436) {
                setItemsPerPage(4);
            }
            else if (window.innerWidth <= 2000) {
                setItemsPerPage(6);
            }
            else {
                setItemsPerPage(10);
            }
        }
        updateItemsPerPage()
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage); 
    }, [])

    //CACHE KEY AND TTL(MS) - Extended cache time due to rate limiting
    const CACHE_KEY = 'top-anime-cache-v1';
    const TTL = 1000 * 60 * 30; // 30 minutes cache

    // Rate limiting helper
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Fetch with retry and rate limiting
    const fetchWithRetry = async (url, retries = 3, delayMs = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                if (response.status === 429) {
                    // Rate limited, wait longer
                    const waitTime = Math.pow(2, i) * delayMs; // Exponential backoff
                    console.warn(`Rate limited, waiting ${waitTime}ms before retry ${i + 1}/${retries}`);
                    await delay(waitTime);
                    continue;
                }
                return response;
            } catch (error) {
                if (i === retries - 1) throw error;
                await delay(delayMs);
            }
        }
        throw new Error('Max retries exceeded');
    };

    useEffect(() =>  {
        let ignored = false;

        async function load () {
            setError(null);
            setIsLoading(true);

            //CHECK CACHE FIRST
            const raw = localStorage.getItem(CACHE_KEY);
            if(raw) {
                try {
                    const parsed = JSON.parse(raw);
                    if(Date.now() - parsed.ts < TTL) {
                        setTopAnime(parsed.top);
                        setLatestEpisode(parsed.latest);
                        setGenres(parsed.genres);
                        setIsLoading(false);
                        return;
                    }
                } catch (cacheError) {
                    console.warn('Cache parsing error:', cacheError);
                    localStorage.removeItem(CACHE_KEY);
                }
            }

            try {
                // Fetch data sequentially with delays to respect rate limits
                console.log('Fetching top anime...');
                const res1 = await fetchWithRetry("https://api.jikan.moe/v4/top/anime");
                
                // Wait between requests to avoid rate limiting
                await delay(1000);
                
                console.log('Fetching latest episodes...');
                const res2 = await fetchWithRetry("https://api.jikan.moe/v4/watch/episodes");
                
                await delay(1000);
                
                console.log('Fetching genres...');
                const res3 = await fetchWithRetry("https://api.jikan.moe/v4/genres/anime");

                // Check if responses are ok
                if (!res1.ok) throw new Error(`Top anime API error: ${res1.status}`);
                if (!res2.ok) throw new Error(`Episodes API error: ${res2.status}`);
                if (!res3.ok) throw new Error(`Genres API error: ${res3.status}`);

                const json1 = await res1.json();
                const json2 = await res2.json();
                const json3 = await res3.json();

                //TO HAVE A FALLBACK
                const top = Array.isArray(json1.data) ? json1.data : []; 
                const latest = Array.isArray(json2.data) ? json2.data : []; 
                const genres = Array.isArray(json3.data) ? json3.data : [];

                //STORE CACHE 
                localStorage.setItem(
                    CACHE_KEY ,
                    JSON.stringify({
                        ts: Date.now(), 
                        top,
                        latest,
                        genres
                    })
                );

                if (!ignored) {
                    setTopAnime(top);
                    setLatestEpisode(latest);
                    setGenres(genres);
                }
            } catch (err) {
                console.error('Fetch error:', err);
                
                // Try to use fallback data from sample storage if available
                if (!ignored) {
                    if (err.message.includes('429') || err.message.includes('Rate limited')) {
                        setError("API rate limit exceeded. Using cached data if available, or try again later.");
                        
                        // Use sample data as fallback
                        if (movies && movies.length > 0) {
                            setTopAnime(movies.slice(0, 25));
                            setLatestEpisode(movies.slice(0, 20));
                            
                            // Set some default genres
                            setGenres([
                                { mal_id: 1, name: 'Action' },
                                { mal_id: 2, name: 'Adventure' },
                                { mal_id: 4, name: 'Comedy' },
                                { mal_id: 8, name: 'Drama' },
                                { mal_id: 10, name: 'Fantasy' },
                                { mal_id: 14, name: 'Horror' },
                                { mal_id: 22, name: 'Romance' },
                                { mal_id: 24, name: 'Sci-Fi' },
                                { mal_id: 27, name: 'Shounen' },
                                { mal_id: 36, name: 'Slice of Life' }
                            ]);
                        }
                    } else {
                        setError(err.message || "Failed to load data");
                    }
                }
            } finally {
                if (!ignored) setIsLoading(false);
            }
        }

        load();
        return() => {
            ignored = true;
        }
    }, [])  

    //TO RESPECT BOTH PAGINATION (RENDERING, SCROLLING/DISPLAYING)
    const limitedMovies = topAnime.slice(0, 10);
    const visibleItems = limitedMovies.slice(startIndex, startIndex + itemsPerPage);
    
    const handleNext = () => {
        if(startIndex + itemsPerPage < topAnime.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if(startIndex > 0 ) {
            setStartIndex( startIndex - 1 );
        }
    };
    
    const [heroIndex, setHeroIndex] = useState(0);
    const nextSlide = () => {
        if (limitedMovies.length > 0) {
            setHeroIndex((prevIndex) => (prevIndex + 1) % limitedMovies.length);
        }
    };
    
    const prevSlide = () => {
        if (limitedMovies.length > 0) {
            setHeroIndex((prevIndex) => (prevIndex - 1 + limitedMovies.length) % limitedMovies.length);
        }
    };

    const genreColors = (name) => {
        let hash = 0;
        for(let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = hash % 360;
        return `hsl${hue}, 60%, 50%`;
    }

    const latestEpisodeShowMore = isActive ? latestEpisode.slice(0, 20) : latestEpisode;
    const genresShowMore = isActive ? genres.slice(0, 20) : genres;
    

    return (
        <div className="min-h-screen ">
            <Navbar />

            {isLoading && <LoadingSpinner />}
            {error && !isLoading && (
                <div className="text-center py-8">
                    <p className='text-red-400 text-lg'>Error: {error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Main content with proper spacing for fixed navbar */}
            <main className="pt-20 px-4 md:px-8">
                <div className="max-w-[2300px] mx-auto py-6">
                    {/*Hero Slider Section*/}
                    <div className='relative w-full h-[1200px] bg-[#28242c]'>
                        <AnimatePresence mode="wait">
                            {limitedMovies.length > 0 && (
                                <motion.div
                                    key={limitedMovies[heroIndex]?.mal_id}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <HeroSlider
                                        id={limitedMovies[heroIndex]?.mal_id}
                                        title={limitedMovies[heroIndex]?.title}
                                        img={limitedMovies[heroIndex]?.images?.jpg?.image_url}
                                        description={limitedMovies[heroIndex]?.synopsis}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation arrows */}
                        <button 
                            onClick={prevSlide}
                            disabled={limitedMovies.length === 0}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft />
                        </button>
                        
                        <button 
                            onClick={nextSlide}
                            disabled={limitedMovies.length === 0}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight />
                        </button>
                    </div>

                    {/* Trending Anime Section */}
                    <div className="mt-12 relative">
                        <h2 className="text-3xl font-bold text-red-600 mb-6">Trending Anime</h2>
                        <div className="grid grid-cols-1 1xl:grid-cols-8 xl:grid-cols-6 lg md:grid-cols-4 sm:grid-cols-3 gap-6 mr-17 transition transition-transform duration-500 ease-in-out ">
                            <AnimatePresence initial={false}>
                                {visibleItems.slice(0, 10).map((anime, index) => (
                                <motion.div
                                    key={anime.mal_id}
                                    initial={{ opacity: 0, y: 20 }}     // enter animation
                                    animate={{ opacity: 1, y: 0 }}      // animate to visible
                                    exit={{ opacity: 0, y: -20 }}       // exit animation
                                    transition={{ duration: 0.3 }}>
                                    
                                    <TrendingAnimeCard 
                                        title={anime.title} 
                                        img={anime.images?.jpg?.image_url}
                                        episodeNumber={anime.episode}
                                        id={anime.mal_id}
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
                                <h2 className="text-3xl font-bold text-red-600 mb-6">Latest Episode</h2>
                                <button className='text-white' 
                                    onClick={() => setIsActive(!isActive)}>
                                    {!isActive ? 'Show less' : 'Show more'}
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 2xl:grid-cols-6 xl:grid-cols-6 lg md:grid-cols-4 sm:grid-cols-3 gap-6">
                                <AnimatePresence initial={false}>
                                    {latestEpisodeShowMore.map((anime, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            key={`latest-${index}`}>
                                            <AnimeCard 
                                                id={anime.entry.mal_id}
                                                title={anime.entry.title} 
                                                img={anime.entry.images?.jpg?.image_url}
                                                description={anime.entry.synopsis}
                                                duration={anime.entry.duration || '24m'}
                                                status={anime.entry.status || 'Currently Airing'}
                                                genres={anime.entry.genres || []}
                                                subRatings={anime.entry.episodes}
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
                                {genresShowMore.map((g) => (
                                    <button
                                        key={g.mal_id || g.name}
                                         style={{
                                                backgroundColor: genreColors[g.name] || "#95a5a6", // fallback gray
                                                color: "white",
                                                borderRadius: "8px",
                                                padding: "4px 10px",
                                                margin: "4px",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                            >
                                        {g.name}
                                    </button>
                                ))}
                            </div>
                            <button className="mt-6 w-full bg-gray-700/80 hover:bg-gray-600 text-white font-semibold py-3 rounded-md"
                                onClick={() => setIsActive(!isActive)}>
                                {isActive ? 'Show less' : 'Show more'}
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
