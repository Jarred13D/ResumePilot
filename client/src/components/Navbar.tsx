import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Resume Builder
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-gray-300 focus:outline-none"
            >
              AI Tools ▼
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link to="/build-resume" className="block px-4 py-2 hover:bg-gray-200">
                  Build New Resume
                </Link>
                <Link to="/build-cover-letter" className="block px-4 py-2 hover:bg-gray-200">
                  Build Cover Letter
                </Link>
                <Link to="/ask-ai" className="block px-4 py-2 hover:bg-gray-200">
                  Ask AI
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
