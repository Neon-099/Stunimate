import React from 'react';
import Navbar from '../components/Navbar.jsx';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen  text-gray-800 p-6">
				<div className="max-w-[2100px] mx-auto pt-20">
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
					</div>
				</div>
			</div>
  );
};

export default LoadingSpinner;