import React from 'react';

const letters = ['All', '#', '0-9', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const Footer = () => {
	const handleBackToTop = () => {
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<footer className="mt-16 bg-[#1f1f1f] text-gray-300">
			<div className="max-w-[1800px] mx-auto px-4 py-8">
				{/* Top brand + social */}
				<div className="flex items-center justify-between border-b border-white/10 pb-6">
					<div className="flex items-center gap-3">
						<div className="font-extrabold text-xl">Stu<span className="text-red-500">nimate</span></div>
						<span className="hidden sm:inline text-sm text-gray-400">Join now</span>
					</div>
					<div className="flex items-center gap-3">
						<a href="#" className="w-8 h-8 rounded-full bg-blue-600 grid place-items-center text-white text-sm">in</a>
						<a href="#" className="w-8 h-8 rounded-full bg-sky-500 grid place-items-center text-white text-sm">t</a>
						<a href="#" className="w-8 h-8 rounded-full bg-red-500 grid place-items-center text-white text-sm">yt</a>
						<a href="#" className="w-8 h-8 rounded-full bg-blue-400 grid place-items-center text-white text-sm">tg</a>
					</div>
				</div>

				{/* A-Z list */}
				<div className="py-6">
					<h3 className="text-lg font-semibold mb-3">A-Z LIST</h3>
					<p className="text-sm text-gray-400 mb-4">Searching anime order by alphabet name A to Z.</p>
					<div className="flex flex-wrap gap-2">
						{letters.map((item) => (
							<button key={item} className="px-3 py-2 rounded-md bg-[#2a2a2a] hover:bg-[#323232] text-sm">
								{item}
							</button>
						))}
					</div>
				</div>

				{/* Links */}
				<div className="flex flex-wrap items-center gap-6 text-sm border-t border-white/10 pt-6">
					<a href="#" className="hover:text-white">Terms of service</a>
					<a href="#" className="hover:text-white">DMCA</a>
					<a href="#" className="hover:text-white">Contact</a>
					<a href="#" className="hover:text-white">Stunimate App</a>
				</div>

				{/* Disclaimer */}
				<p className="mt-4 text-sm text-gray-400">
					Stunimate does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
				</p>

				<p className="mt-4 text-sm">
					© Stunimate.to. All rights reserved.
				</p>
			</div>

			{/* Back to top */}
			<button
				onClick={handleBackToTop}
				className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white grid place-items-center shadow-lg"
				aria-label="Back to top"
			>
				↑
			</button>
		</footer>
	);
};

export default Footer;


