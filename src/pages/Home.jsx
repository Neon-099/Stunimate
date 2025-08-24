import {useState} from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import AnimeCard from '../components/AnimeCard.jsx';
import {movies} from '../sampleStorage.js';


const Home = () => {

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;

    const handleNext = () => {
        if(startIndex + itemsPerPage < items.length) {
            setStartIndex(startIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if(startIndex - itemsPerPage >= 0 ) {
            setStartIndex(startIndex - itemsPerPage);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Main content with proper spacing for fixed navbar */}
            <main className="pt-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <HeroSlider />
                    
                    {/* Trending Anime Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Trending Anime</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {movies.map((anime) => (
                                <AnimeCard 
                                    key={anime.id} 
                                    title={anime.title} 
                                    img={anime.img}
                                    episodeNumber={anime.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;
