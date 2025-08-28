import React from 'react';
import {Link } from 'react-router-dom';
import { Play, Plus } from 'lucide-react';

const AnimeCard = ({
    id,
    title,
    img,
    description,
    rating = 9,
    subRatings = { cc: 9, ep: 7 },
    type = 'TV',
    duration = '24m',
    japaneseTitle,
    synonyms,
    aired,
    status,
    genres = [],
}) => {
    return (
        <div className="group relative rounded-xl overflow-visible block cursor-pointer">
            {/* Poster */}
                <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover transition duration-300 group-hover:blur-sm group-hover:scale-105"
                        loading="lazy"
                    />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full cursor-pointer transform scale-75 group-hover:scale-100 transition-all duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                    
                </div>
            <div className="mt-2">
                <h3 className="text-sm text-white font-medium truncate">{title}</h3>
                <p className="text-xs text-white">{type || 'TV'} • {duration || '24m'}</p>
            </div>
            {/* Hover dialog - floating card */}
            <div className="pointer-events-none group-hover:pointer-events-auto hover:pointer-events-auto absolute inset-0 opacity-0 group-hover:opacity-100 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 z-20">
                <div className="absolute ml-4 left-29 top-[25rem] -translate-y-1/1 max-w-md bg-gray-900/80 backdrop-blur-md text-gray-100 shadow-2xl border border-white/10 p-4 md:p-5 translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>

                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">★ N/A</span>
                        <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300">HD</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">cc {subRatings.cc}</span>
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">{subRatings.ep}</span>
                        <span className="ml-auto px-2 py-0.5 rounded bg-gray-700/60 text-gray-200">{type}</span>
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-3 mb-3">{description}</p>

                    <div className="grid grid-cols-1 gap-1 text-xs text-gray-300 mb-4">
                        {japaneseTitle && (
                            <div>
                                <span className="text-gray-400">Japanese: </span>
                                {japaneseTitle}
                            </div>
                        )}
                        {synonyms && (
                            <div>
                                <span className="text-gray-400">Synonyms: </span>
                                {synonyms}
                            </div>
                        )}
                        {aired && (
                            <div>
                                <span className="text-gray-400">Aired: </span>
                                {aired}
                            </div>
                        )}
                        {status && (
                            <div>
                                <span className="text-gray-400">Status: </span>
                                {status}
                            </div>
                        )}
                        {genres.length > 0 && (
                            <div>
                                <span className="text-gray-400">Genres: </span>
                                {genres.join(', ')}
                            </div>
                        )}
                        <div>
                            <span className="text-gray-400">Duration: </span>
                            {duration}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to={`/details/${id}`} className="pointer-events-auto flex  items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-semibold px-20 py-1 shadow">
                            <Play size={16} fill="currentColor" className="-ml-1" />
                            Watch
                        </Link>
                        <button className="pointer-events-auto inline-flex items-center justify-center rounded-full w-9 h-9 bg-gray-700 hover:bg-gray-600 shadow">
                            <Plus size={18} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeCard;


