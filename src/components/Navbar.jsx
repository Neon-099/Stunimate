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
            if(scrollTop > 60) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`p-4 shadow-md w-full fixed top-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-[#1f1b22]/80 backdrop-blur-md border-b border-white/10' : 'bg-[#1f1b22] border-b border-transparent'
        }`}>
            <div className="max-w-[1800px] mx-auto w-full flex items-center gap-10">
                {/* Left: Brand */}
                <Link to="/home" className="flex items-center gap-10">
                    <h1 className="text-2xl font-bold text-white">Stu<span className="text-red-500">nimate</span></h1>
                </Link>

                {/* Center: Search + Watch2gether */}
                <div className="flex items-center gap-6 flex-1 justify-center">
                    <SearchBar />
                    <Link className='flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors'>
                        <Radio size={20} />
                        <span className="text-sm">Watch2gether</span>
                    </Link>
                </div>

                {/* Right: Auth button */}
                <div className="ml-auto">
                    <button className='px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium'>
                        Login
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;