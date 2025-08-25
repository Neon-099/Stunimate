import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { useParams, Link } from 'react-router-dom';
import { movies } from '../sampleStorage.js';

const Details = () => {
	const { id } = useParams();
	const anime = movies.find((m) => String(m.id) === String(id));

	if (!anime) {
		return (
			<div className="min-h-screen bg-gray-50 text-gray-800 p-6">
				<div className="max-w-6xl mx-auto">
					<Link to="/home" className="text-blue-600 hover:underline">Back</Link>
					<div className="mt-8">Anime not found.</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 text-gray-800">
            <Navbar />
			<div className="max-w-6xl mx-auto px-4 py-21 bg-gray-500 w-full ">
				<div className="mt-8  gap-8 flex justify-between items-center">
					{/* Poster */}
					<div>
						<img src={anime.img} alt={anime.title} className="w-[220px] h-[320px] object-cover rounded shadow left-12" />
					</div>
					{/* Main actions and description */}
					<div className="pr-70 pb-12" >
                        {/* Header breadcrumbs */}
                        <div className="text-sm text-gray-500">
                            <Link to="/home" className="hover:underline">Home</Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-700">{anime.title}</span>
                        </div>
                        {/* Title */}
				        <h1 className="text-4xl font-bold mt-3">{anime.title}</h1>
                                {/* Meta row */}
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 py-2">
                            <span className="px-2 py-0.5 border rounded">TV</span>
                            <span>{anime.duration || '24m'}</span>
                        </div>

                        <div className="flex gap-3">
							<button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow">Watch now</button>
							<button className="border px-4 py-2 rounded-full hover:bg-gray-100">+ Add to List</button>
						</div>

						{/* Description */}
						<p className="mt-6 leading-7 text-gray-700">
							{anime.description}
						</p>

						{/* Share row */}
						<div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
							<span>Share</span>
							<a href="#" className="px-2 py-1 rounded bg-blue-600 text-white">Fb</a>
							<a href="#" className="px-2 py-1 rounded bg-sky-500 text-white">X</a>
							<a href="#" className="px-2 py-1 rounded bg-green-600 text-white">Wa</a>
						</div>
					
                    
					</div>
                    {/* Sidebar info */}
					<aside className="md:col-span-2 grid grid-cols-1 md:grid-row-3 gap-6 mt-6">
						<div className="bg-white rounded shadow p-4 md:col-span-2">
							<h3 className="font-semibold mb-2">Details</h3>
							<div className="text-sm text-gray-700 space-y-1">
								<div><span className="text-gray-500">Episodes:</span> {anime.episodes ?? '—'}</div>
								<div><span className="text-gray-500">Status:</span> {anime.status ?? 'Currently Airing'}</div>
								<div><span className="text-gray-500">Duration:</span> {anime.duration ?? '24m'}</div>
							</div>
							<h3 className="font-semibold mb-2">Genres</h3>
							<div className="flex flex-wrap gap-2 text-xs">
								<span className="px-2 py-1 bg-gray-100 rounded">Comedy</span>
								<span className="px-2 py-1 bg-gray-100 rounded">Romance</span>
								<span className="px-2 py-1 bg-gray-100 rounded">School</span>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
};

export default Details;
