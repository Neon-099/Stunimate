import { FastForward, Radio } from 'lucide-react';
import SearchBar from './SearchBar.jsx';
import {Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if(scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`p-4 flex justify-between items-center shadow-md w-full fixed top-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-white'
        }`}> 
            <div className="flex items-center gap-6">
                <h1 className="text-2xl font-bold text-red-600">Stunimate</h1>
                <SearchBar />
            </div> 
            <Link className='flex flex-col items-center gap-1 hover:text-red-600 transition-colors'>
                <Radio size={20} />
                <span className="text-sm">Watch2gether</span>
            </Link>
                
            <button className='px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium'>Login</button>
        </nav>
    )
}

export default Navbar;