import React from 'react';
import { Link } from 'react-router-dom';

const TrendingAnimeCard = ({ anime, episodeNumber = "01", title, img, id }) => {
    return (
        <div className="block cursor-pointer">
        <div className="relative w-full h-80  overflow-hidden ">
            {/* Left Section - Dark Grey Strip */}
            <div className="absolute left-0 top-0 w-10 bg-[#28242c] h-full flex flex-col items-center justify-between py-4 z-10">
                {/* Vertical Title */}
                <div className="transform -rotate-90 origin-center whitespace-nowrap mt-50">
                    <h3 className="text-white text-sm font-semibold tracking-wider">
                        {title}
                    </h3>
                </div>
                
                {/* Episode Number */}
                <div className="text-white text-xs font-medium">
                    {episodeNumber.toString().padStart(2, '0')}
                </div>
            </div>
            <Link to={`/details/${id}`} className='group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' >
            {/* Right Section - Main Poster Image */}
            <div className=" h-full">
                <img 
                    src={img} 
                    alt={title}
                    className="w-full h-full object-cover flex justify-center items-center group-hover:scale-105 transition-transform duration-300 "
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full cursor-pointer transform scale-75 group-hover:scale-100 transition-all duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
            </Link> 
        
        </div>
        </div>
    );
};

export default TrendingAnimeCard;
