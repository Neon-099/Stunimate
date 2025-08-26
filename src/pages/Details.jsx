import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useParams, Link } from 'react-router-dom';
import { movies } from '../sampleStorage.js';

const Details = () => {
	const { id } = useParams();
	const anime = movies.find((m) => String(m.id) === String(id));

	if (!anime) {
		return (
			<div className="min-h-screen bg-gray-50 text-gray-800 p-6">
				<div className="max-w-[1800px] mx-auto">
					<Link to="/home" className="text-blue-600 hover:underline">Back</Link>
					<div className="mt-8">Anime not found.</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 text-gray-800">
            <Navbar />
			<div className="max-w-[1800px] mx-auto px-4 py-26">
				{/* Main content area */}
				<div className="grid grid-cols-2 gap-4 items-start md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_360px]">
					{/* Poster column */}
					<div>
						<img 
							src={anime.img} 
							alt={anime.title} 
							className="w-[220px] h-[320px] object-cover rounded shadow-lg" 
						/>
					</div>

					{/* Main content column */}
					<div>
						{/* Header breadcrumbs */}
						<div className="text-sm text-gray-500 mb-3">
							<Link to="/home" className="hover:underline">Home</Link>
							<span className="mx-2">/</span>
							<span className="text-gray-700">{anime.title}</span>
						</div>

						{/* Title */}
						<h1 className="text-3xl md:text-4xl font-bold mb-2">{anime.title}</h1>

						{/* Meta row */}
						<div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
							<span className="px-2 py-0.5 border rounded">TV</span>
							<span>{anime.duration || '24m'}</span>
						</div>

						{/* Action buttons */}
						<div className="flex flex-wrap gap-3 mb-5">
							<button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow">
								Watch now
							</button>
							<button className="border px-4 py-2 rounded-full hover:bg-gray-100">
								+ Add to List
							</button>
						</div>

						{/* Description */}
						<p className="leading-7 text-gray-700 mb-5 pr-27">
							{anime.description}
						</p>

						{/* Share row */}
						<div className="flex items-center gap-3 text-sm text-gray-600">
							<span>Share</span>
							<a href="#" className="px-2 py-1 rounded bg-blue-600 text-white">Fb</a>
							<a href="#" className="px-2 py-1 rounded bg-sky-500 text-white">X</a>
							<a href="#" className="px-2 py-1 rounded bg-green-600 text-white">Wa</a>
						</div>
					</div>

					{/* Right side - Details sidebar */}
					<div>
						<div className="bg-white rounded-lg shadow p-6 top-8">
							<h3 className="font-semibold mb-4 text-lg">Details</h3>
							<div className="text-sm text-gray-700 space-y-3 mb-6">
								<div><span className="text-gray-500">Episodes:</span> {anime.episodes ?? '—'}</div>
								<div><span className="text-gray-500">Status:</span> {anime.status ?? 'Currently Airing'}</div>
								<div><span className="text-gray-500">Duration:</span> {anime.duration ?? '24m'}</div>
							</div>
							
							<h3 className="font-semibold mb-4 text-lg">Genres</h3>
							<div className="flex flex-wrap gap-2 text-xs">
								{anime.genre.map((genres) => (
									<button key={genres} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">{genres}</button>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Bottom sections - Recommended and Most Popular */}
				<div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Recommended for you */}
					<div className="lg:col-span-3">
						<h2 className="text-2xl font-bold text-orange-500 mb-6">Recommended for you</h2>
						<div className="grid grid-cols-2 md:grid-cols-6 gap-4">
							{movies.slice(0, 20).map((movie) => (
								<div key={movie.id} className="relative group">
									<img 
										src={movie.img} 
										alt={movie.title} 
										className="w-full h-70 object-cover rounded shadow-md group-hover:blur-2  duration-200" 
									/>
									<div className="absolute top-1 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
										{movie.id}
									</div>
									<div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
										{movie.id}
									</div>
									<div className="mt-2">
										<h3 className="text-sm font-medium truncate">{movie.title}</h3>
										<p className="text-xs text-gray-500">{movie.type || 'TV'} • {movie.duration || '24m'}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Most Popular */}
					<div className="lg:col-span-1">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-orange-500">Most Popular</h2>
							<button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded text-sm">
								Show more
							</button>
						</div>
						<div className="space-y-2">
							{[
								{ title: 'One Piece', type: 'TV', img: anime.img, badges: ['1141', '1133'] },
								{ title: 'Naruto: Shippuden', type: 'TV', img: anime.img, badges: ['500', '500', '500'] },
								{ title: 'Bleach', type: 'TV', img: anime.img, badges: ['366', '366', '366'] },
								{ title: 'Black Clover', type: 'TV', img: anime.img, badges: ['170', '170', '170'] },
								{ title: 'Solo Leveling Season 2: Arise...', type: 'TV', img: anime.img, badges: ['13', '13', '13'] },
								{ title: 'Jujutsu Kaisen 2nd', type: 'TV', img: anime.img, badges: ['12', '12', '12'] }
							].map((item, index) => (
								<div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors">
									<img 
										src={item.img} 
										alt={item.title} 
										className="w-16 h-16 object-cover rounded shadow-sm" 
									/>
									<div className="flex-1">
										<h3 className="font-medium text-xs">{item.title}</h3>
										<p className="text-sm text-gray-500">{item.type}</p>
										<div className="flex gap-1 ">
											{item.badges.map((badge, badgeIndex) => (
												<span key={badgeIndex} className="bg-green-500 text-white text-xs px-1 rounded">
													{badge}
												</span>
											))}
										</div>
									</div>
									
									<button className="text-gray-400 hover:text-gray-600 text-xl">+</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Details;
