import { Search } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {

    const [search, setSearch] = useState('');

    return (
        <div className='flex items-center relative'>
            <div className='absolute left-3 z-10 text-gray-400'>
                <Search size={20}/>
            </div>
            <input 
                className='border border-gray-300 rounded-md px-10 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent'
                type="text"
                placeholder='Search anime...'
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}

export default SearchBar;