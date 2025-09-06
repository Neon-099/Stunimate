import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useParams, Link } from 'react-router-dom';
import { movies } from '../sampleStorage.js';
import AnimeCard from '../components/AnimeCard.jsx';

const Details = () => {
	const { id } = useParams();
	const [anime, setAnime] = useState(null);
	const [loading, setLoading] = useState(true);
	const [recommended, setRecommended] = useState(null);
	const [mostPopular, setMostPopular] = useState([]);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const fetchAnimeDetails = async () => {
			
			let ignored = false;
			setLoading(true);

			try {
			//FETCH DATA for recommended anime
	        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);			
			if(!res.ok) throw new Error(`HTTP ${res.status}`)
				const json = await res.json();
				const list = Array.isArray(json.data) ? json.data : [];

				// First try to find in local movies data
				let foundAnime = movies.find((m) => String(m.id) === String(id));

			// If not found locally, try to fetch from API using the mal_id
			if (!foundAnime) {
				try {
					const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
					if (response.ok) {
						const data = await response.json();
						foundAnime = {
							id: data.data.mal_id,
							title: data.data.title,
							img: data.data.images?.jpg?.image_url,
							description: data.data.synopsis,
							episodes: data.data.episodes,
							status: data.data.status,
							duration: data.data.duration,
							genre: data.data.genres?.map(g => g.name) || [],
							aired: data.data.aired?.string,
							type: data.data.type,
							score: data.data.score
						};
					}
				} catch (error) {
					console.error('Error fetching anime details:', error);
				}
			}
			

			//GETTING POPULAR ANIME
			const response2 = await fetch('https://api.jikan.moe/v4/top/anime'); //endpoint (for top anime)
			if(!response2.ok) throw new Error(`HTTP ${response2.status}`);
				const json2 = await response2.json();
				const list2 = Array.isArray(json2.data) ? json2.data : [];

			
		

			if(!ignored) {
				setAnime(foundAnime);
				setRecommended(list);
				setMostPopular(list2);
				setLoading(false);
			}
		} 
		catch (err) {
				
		}
	}
		fetchAnimeDetails();
	}, [id]);

	const mostPopularShowMore = isActive ? mostPopular.slice(0, 12)  : mostPopular.slice(0, 5);

	if (loading) {
		return (
			<div className="max-h-screen text-gray-800 p-6">
				<Navbar />
				<div className="max-w-[1800px] mx-auto pt-20">
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
					</div>
				</div>
			</div>
		);
	}

	if (!anime) {
		return (
			<div className="min-h-screen text-gray-800 p-6">
				<Navbar />
				<div className="max-w-[1800px] mx-auto pt-20">
					<Link to="/home" className="text-blue-600 hover:underline">Back</Link>
					<div className="mt-8 text-white">Anime not found.</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen  text-gray-800">
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
					<div className='text-white'>
						{/* Header breadcrumbs */}
						<div className="text-sm  mb-3">
							<Link to="/home" className="hover:underline">Home</Link>
							<span className="mx-2">/</span>
							<span>{anime.title}</span>
						</div>

						{/* Title */}
						<h1 className="text-3xl md:text-4xl font-bold mb-2">{anime.title}</h1>

						{/* Meta row */}
						<div className="flex items-center gap-2 mb-4 text-sm ">
							<span className="px-2 py-0.5 border rounded">TV</span>
							<span>{anime.duration || '24m'}</span>
						</div>

						{/* Action buttons */}
						<div className="flex flex-wrap gap-3 mb-5">
							<Link to={`/streaming/${anime.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow inline-block">
								Watch now
							</Link>
							<button className="border px-4 py-2 rounded-full hover:bg-gray-100 hover:text-black ">
								+ Add to List
							</button>
						</div>

						{/* Description */}
						<p className="text-lg text-white mb-5 pr-27">
							{anime.description}
						</p>

						{/* Share row */}
						<div className="flex items-center gap-3 text-sm ">
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
							{recommended.slice(0, 20).map((anime, index) => (
								<div key={anime.entry.mal_id} className="">
									<AnimeCard 
										id={anime.entry.mal_id}
										title={anime.entry.title} 
										img={anime.entry.images?.jpg?.image_url}
										description={anime.entry.description}
										duration={anime.entry.duration || '24m'}
										status={anime.entry.status || 'Currently Airing'}
										genres={anime.entry.genre || []}
										/>
								</div>
							))}
						</div>
					</div>

					{/* Most Popular */}
					<div className="lg:col-span-1">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-orange-500">Most Popular</h2>
							<button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded text-sm"
								onClick={() => setIsActive(!isActive)} >
								{isActive ? 'Show less' : 'Show more'}
							</button>
						</div>
						<div className="space-y-2">
							{ mostPopularShowMore.map((item, index) => (
								<div key={index} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg transition-colors">
									<img 
										src={item.images?.jpg?.image_url}
										alt={item.title} 
										className="w-16 h-16 object-cover rounded shadow-sm" 
									/>
									<div className="flex-1">
										<h3 className="font-medium text-xs">{item.title}</h3>
										<p className="text-sm text-gray-500">{item.type}</p>
										<div className="flex gap-1 ">
											
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
