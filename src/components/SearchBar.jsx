import { Search } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {

    const [search, setSearch] = useState('');

    return (
        <div className='flex items-center '>
            <div className='relative left-19'>
                <Search/>
            </div>
            <input 
                className='border rounded-md absolute px-11 '
                type="text"
                placeholder='Search anime...'
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}

export default SearchBar;