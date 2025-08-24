import { Radio } from 'lucide-react';
import SearchBar from './SearchBar.jsx';
import {Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="p-4 flex justify-between items-center shadow-md"> 
            <div className="justify-start flex items-center gap-9">
                <h1>Stunimate</h1>
                <SearchBar />
            </div> 
            <Link className='flex flex-col items-center '>
                <Radio />
                Watch2gether
            </Link>
                
            <button className='px-5 bg-red-300 rounded-md '>Login</button>
        </div>
    )
}

export default Navbar;