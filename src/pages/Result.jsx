import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import AnimeCard from '../components/AnimeCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const initialQuery = params.get('q') || '';

    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [debouncedTerm, setDebouncedTerm] = useState(initialQuery);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    // keep URL in sync with searchTerm
    useEffect(() => {
        const q = new URLSearchParams(location.search).get('q') || '';
        if (q !== searchTerm) {
            // sync local state if URL changed externally
            setSearchTerm(q);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    // debounce logic
    useEffect(() => {
        const id = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 500);
        return () => clearTimeout(id);
    }, [searchTerm]);

    // write q to URL when local searchTerm changes (debounced write to avoid spam)
    useEffect(() => {
        const id = setTimeout(() => {
            const next = new URLSearchParams(location.search);
            if ((debouncedTerm || '') !== (next.get('q') || '')) {
                if (debouncedTerm) next.set('q', debouncedTerm); else next.delete('q');
                navigate({ pathname: '/results', search: next.toString() }, { replace: true });
            }
        }, 550);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedTerm]);

    // fetch function with basic retry similar to Home
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const fetchWithRetry = async (url, retries = 3, delayMs = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                if (response.status === 429) {
                    const waitTime = Math.pow(2, i) * delayMs;
                    await delay(waitTime);
                    continue;
                }
                return response;
            } catch (e) {
                if (i === retries - 1) throw e;
                await delay(delayMs);
            }
        }
        throw new Error('Max retries exceeded');
    };

    const runSearch = async (term, page = 1) => {
        if (!term) {
            setResults([]);
            setSuggestions([]);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetchWithRetry(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(term)}&limit=24&page=${page}`);
            if (!response.ok) throw new Error(`Search error ${response.status}`);
            const json = await response.json();
            const data = Array.isArray(json.data) ? json.data : [];
            setResults(data);
            setSuggestions(data.slice(0, 5));
        } catch (e) {
            setError(e.message || 'Failed to fetch results');
        } finally {
            setIsLoading(false);
        }
    };

    // trigger search when debouncedTerm changes
    useEffect(() => {
        runSearch(debouncedTerm);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedTerm]);

    return (
        <div className="min-h-screen">
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* suggestions dropdown under header */}
            {searchTerm && suggestions.length > 0 && (
                <div className="fixed top-16 left-0 right-0 z-40 flex justify-center px-4">
                    <div className="w-full max-w-2xl bg-[#2f2c33] border border-white/10 rounded-md shadow-2xl overflow-hidden">
                        {suggestions.map((item, idx) => {
                            const subtitle = item.title_english || item.title_japanese || (Array.isArray(item.title_synonyms) ? item.title_synonyms[0] : '');
                            const airedYear = item.year || (item.aired?.prop?.from?.year ?? '');
                            const airedMonth = item.aired?.prop?.from?.month ? String(item.aired.prop.from.month).padStart(2, '0') : '';
                            const airedDay = item.aired?.prop?.from?.day ? String(item.aired.prop.from.day).padStart(2, '0') : '';
                            const dateText = airedYear ? `${airedMonth && airedDay ? `${airedMonth} ${airedDay}, ` : ''}${airedYear}` : '';
                            return (
                                <div key={item.mal_id}>
                                    <Link
                                        to={`/details/${item.mal_id}`}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5"
                                        onClick={() => setSearchTerm(item.title)}
                                    >
                                        <img
                                            src={item.images?.jpg?.image_url}
                                            alt={item.title}
                                            className="w-12 h-16 object-cover rounded-sm flex-shrink-0"
                                            loading="lazy"
                                        />
                                        <div className="min-w-0">
                                            <div className="text-white text-sm font-semibold truncate">{item.title}</div>
                                            {subtitle && (
                                                <div className="text-gray-300 text-xs truncate">{subtitle}</div>
                                            )}
                                            <div className="text-gray-400 text-xs flex items-center gap-2 mt-1">
                                                {dateText && <span>{dateText}</span>}
                                                {item.type && (
                                                    <>
                                                        <span className="opacity-50">•</span>
                                                        <span>{item.type}</span>
                                                    </>
                                                )}
                                                {item.duration && (
                                                    <>
                                                        <span className="opacity-50">•</span>
                                                        <span>{item.duration}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                    {idx < Math.min(3, suggestions.length) - 1 && (
                                        <div className="h-px bg-white/10 mx-4" />
                                    )}
                                </div>
                            );
                        })}
                        <button
                            className="w-full text-center bg-amber-300/90 hover:bg-amber-300 text-[#1c1920] font-medium px-4 py-3 flex items-center justify-center gap-2"
                            onClick={() => navigate(`/results?q=${encodeURIComponent(searchTerm)}`)}
                        >
                            View all results <span aria-hidden>›</span>
                        </button>
                    </div>
                </div>
            )}

            <main className="pt-24 px-4 md:px-8">
                <div className="max-w-[2300px] mx-auto py-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Search results for "{debouncedTerm}"</h1>

                    {isLoading && (
                        <div className="py-10"><LoadingSpinner /></div>
                    )}
                    {error && !isLoading && (
                        <div className="text-center py-8">
                            <p className='text-red-400 text-lg'>Error: {error}</p>
                        </div>
                    )}

                    {!isLoading && !error && (
                        <div className="mt-8 grid grid-cols-1 2xl:grid-cols-6 xl:grid-cols-6 lg md:grid-cols-4 sm:grid-cols-3 gap-6">
                            {results.map((anime) => (
                                <AnimeCard
                                    key={anime.mal_id}
                                    id={anime.mal_id}
                                    title={anime.title}
                                    img={anime.images?.jpg?.image_url}
                                    description={anime.synopsis}
                                    duration={anime.duration || '24m'}
                                    status={anime.status || 'Unknown'}
                                    genres={anime.genres || []}
                                    subRatings={anime.episodes}
                                />
                            ))}
                            {results.length === 0 && debouncedTerm && (
                                <p className="text-gray-300">No results found.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Result;