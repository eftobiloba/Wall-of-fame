import React from 'react';
import { Link } from 'react-router-dom';
import { FaShareAlt, FaUsers, FaJournalWhills } from 'react-icons/fa';
import MobileImage from '../../assets/mobile.png'
import './style.css';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4">
          <h1 className="text-xl font-bold">Wall of Fame</h1>
          <div>
            <Link to="/login" className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">
              Login
            </Link>
            <Link to="/register" className="ml-4 bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="min-h-screen flex items-center justify-center bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Share your Achievements, using pictures.</h1>
          <p className="mt-4 text-l">Hang your trophies, awards and memorable moments on your wall of fame.</p>
          <div className="mt-8">
            <Link to="/login" className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">
              Login
            </Link>
            <Link to="/register" className="ml-4 bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">
              Register
            </Link>
          </div>
          <img src={MobileImage} alt="Mobile" className="header-image" />
        </div>
      </header>

      {/* Features */}
      <section className="min-h-screen flex items-center bg-gray-100">
        <div className="container mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature text-center p-6 bg-white rounded shadow-lg">
              <FaShareAlt className="text-6xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Share Professional Achievements</h3>
              <p>Highlight your career milestones and share them with your network.</p>
            </div>
            <div className="feature text-center p-6 bg-white rounded shadow-lg">
              <FaUsers className="text-6xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Family Moments with Loved Ones</h3>
              <p>Preserve and share your precious family moments in a special way.</p>
            </div>
            <div className="feature text-center p-6 bg-white rounded shadow-lg">
              <FaJournalWhills className="text-6xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Track Your Growth</h3>
              <p>Use it as a journal to document and reflect on your personal growth journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="min-h-screen flex items-center bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Want to get started?</h2>
          <Link to="/register" className="mt-4 inline-block bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">
            Register Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>Developed by 
          <span><a href="https://github.com/eftobiloba"> Tobiloba</a></span>, inspired by 
          <span><a href="https://github.com/skeby"> Skeby</a></span>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;