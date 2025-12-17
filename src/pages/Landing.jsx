
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen bg-[#28242c] text-white">
            {/* Simple top nav for landing only */}
            <header className='fixed top-0 left-0 right-0 z-40 bg-[#1f1b22]/70 backdrop-blur-md border-b border-white/10'>
                <div className='max-w-[1800px] mx-auto flex items-center justify-between px-6 py-4'>
                    <Link to="/home" className='text-2xl font-extrabold'>Stu<span className='text-red-500'>nimate</span></Link>
                    <nav className='hidden sm:flex items-center gap-6 text-sm text-gray-300'>
                        <Link to="/home" className='hover:text-white'>Home</Link>
                        <a className='hover:text-white'>Movies</a>
                        <a className='hover:text-white'>TV Series</a>
                    </nav>
                    <Link to="/home" className='px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-semibold'>Get Started</Link>
                </div>
            </header>

            {/* Hero Section */}
            <main className='pt-24'>
                <section className='relative overflow-hidden'>
                    <div className='absolute inset-0'>
                        <img
                            className='w-full h-full object-cover opacity-30'
                            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2070&auto=format&fit=crop"
                            alt="Anime collage background"
                        />
                        <div className='absolute inset-0 bg-gradient-to-b from-[#28242c]/40 via-[#28242c]/70 to-[#28242c]'></div>
                    </div>

                    <div className='relative max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                        <div>
                            <h1 className='text-4xl sm:text-5xl font-extrabold leading-tight'>
                                Stream the Best <span className='text-red-500'>Anime</span> — Anytime, Anywhere
                            </h1>
                            <p className='mt-4 text-gray-300 text-lg'>
                                Discover trending shows, latest episodes, and in-depth details. Fast, clean, and made for fans.
                            </p>
                            <div className='mt-8 flex flex-wrap items-center gap-4'>
                                <Link to="/home" className='px-6 py-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold'>Start Watching</Link>
                                <a href="#features" className='px-6 py-3 rounded-md border border-white/20 hover:border-white/40 text-white font-semibold'>Explore Features</a>
                            </div>

                            <div className='mt-8 flex items-center gap-6 text-sm text-gray-400'>
                                <div>
                                    <span className='text-white font-semibold'>Top Anime</span> refreshed every 10 min
                                </div>
                                <div>
                                    Latest episodes curated for you
                                </div>
                            </div>
                        </div>

                        <div className='relative'>
                            <div className='rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl'>
                                <img
                                    className='w-full h-full object-cover'
                                    src="./stunimates.png"
                                    alt="Showcase"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id='features' className='max-w-[1200px] mx-auto px-6 py-16'>
                    <h2 className='text-3xl font-bold mb-8'>Why Stunimate?</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='rounded-lg bg-[#1f1b22] p-6 border border-white/10 hover:border-white/20 transition-colors'>
                            <h3 className='text-xl font-semibold mb-2'>Beautiful UI</h3>
                            <p className='text-gray-300 text-sm'>A clean, modern interface with smooth animations and smart layouts.</p>
                        </div>
                        <div className='rounded-lg bg-[#1f1b22] p-6 border border-white/10 hover:border-white/20 transition-colors'>
                            <h3 className='text-xl font-semibold mb-2'>Fast Search</h3>
                            <p className='text-gray-300 text-sm'>Find your favorite titles instantly with an optimized search experience.</p>
                        </div>
                        <div className='rounded-lg bg-[#1f1b22] p-6 border border-white/10 hover:border-white/20 transition-colors'>
                            <h3 className='text-xl font-semibold mb-2'>Up-to-date</h3>
                            <p className='text-gray-300 text-sm'>Top anime and latest episodes are refreshed regularly for you.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className='max-w-[1200px] mx-auto px-6 pb-20'>
                    <div className='rounded-xl bg-gradient-to-r from-red-600 to-red-500 p-[1px]'>
                        <div className='rounded-[11px] bg-[#1f1b22] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6'>
                            <div>
                                <h3 className='text-2xl font-bold'>Ready to dive in?</h3>
                                <p className='text-gray-300 mt-1'>Jump to the homepage and start exploring.</p>
                            </div>
                            <Link to="/home" className='px-6 py-3 rounded-md bg-white text-black font-semibold hover:opacity-90'>Go to Home</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Landing;