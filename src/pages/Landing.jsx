
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <header className='flex justify-start items-center py-10 px-10 bg-gray-200 gap-17 '>
                <Link to="/home">Home</Link>
                <Link>Movies</Link>
                <Link>Tv Series</Link>
            </header>

            <main className='bg-gray-200 flex items-center gap-5  '>
                <div className='flex flex-col items-center px-20'>
                    <h1 className='pb-20 text-5xl font-bold'>Welcome to Stunimate</h1>
                    <p>Stunimate is a website that provides you with a list of your favorite anime and manga.</p>
                </div>
                    
                <div>
                    <img 
                    className='max-w-190 min-w-90 ' 
                    src="https://aniwatchtv.to/images/anw-min.webp" alt="" />
                </div>
                
               
            </main>
             <button className='bg-yellow-200 rounded-b-3xl px-150 py-4 text-2xl cursor-pointer font-semibold'>
                Get Started
            </button>

        </div>
    )
}

export default Landing;