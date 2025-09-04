import { Search } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {

    const [search, setSearch] = useState('');

    return (
        <div className='flex items-center relative'>
            <label htmlFor="global-search" className='sr-only'>Search anime</label>
            <div className='absolute left-3 z-10 text-gray-400'>
                <Search size={18}/>
            </div>
            <input 
                id="global-search"
                className='border border-white/10 bg-[#1c1920] text-white placeholder-gray-400 rounded-md px-10 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:border-transparent shadow-inner'
                type="text"
                placeholder='Search anime...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search anime"
            />
        </div>
    )
}

export default SearchBar;