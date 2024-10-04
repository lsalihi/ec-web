"use client";
import { RootState } from "../redux/store/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Home/Header";
import { FaGooglePlay, FaApple, FaChargingStation, FaMapMarkedAlt, FaStar } from 'react-icons/fa';

export default function Home() {
  const data = useSelector((state: RootState) => state.home.DataInfo);
  const dataFR = useSelector((state: RootState) => state.fr.DatafrenchInfo);
  const [language, setLanguage] = useState("English");

  const getData = () => {
    return language === "French" ? dataFR : data;
  };

  const currentData = getData();

  return (
    <div className="font-sans">
      <Header />
      
      {/* Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('home1.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center text-white relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{currentData.TitleText}</h1>
          <p className="text-xl md:text-2xl mb-8">{currentData.ContentText}</p>
          <Link href="/map">
            <span className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
              Explore Charging Stations
            </span>
          </Link>
        </div>
      </div>

      {/* App Download Section */}
      <div className="py-20 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8">Download Our App</h2>
          <p className="text-xl mb-10">Get real-time updates and find charging stations on the go!</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300"
            >
              <FaGooglePlay size={24} />
              <span>Get it on Google Play</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300"
            >
              <FaApple size={24} />
              <span>Download on the App Store</span>
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FaChargingStation className="mx-auto text-5xl text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Find Charging Stations</h3>
              <p>Locate the nearest charging stations with ease.</p>
            </div>
            <div className="text-center">
              <FaMapMarkedAlt className="mx-auto text-5xl text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Real-time Availability</h3>
              <p>Check the real-time availability of charging points.</p>
            </div>
            <div className="text-center">
              <FaStar className="mx-auto text-5xl text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Rate and Review</h3>
              <p>Share your experience and help other EV drivers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: "url('mapsection.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Find Charging Stations</h2>
            <p className="mb-6">{currentData.MapDescription}</p>
            <Link href="/map">
              <span className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
                {currentData.ChargePoint}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"Great service! Always find a charging spot when I need one."</p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold">John D.</h3>
                  <div className="flex text-yellow-400">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"The app is user-friendly and the map feature is incredibly helpful."</p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold">Sarah M.</h3>
                  <div className="flex text-yellow-400">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"Reliable information and great community of EV drivers!"</p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold">Michael R.</h3>
                  <div className="flex text-yellow-400">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p>We're dedicated to making EV charging accessible and convenient for everyone.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/map">Find Stations</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p>Email: info@evcharge.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex flex-col space-y-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:text-blue-400 transition duration-300">
                  <i className="fab fa-facebook text-2xl"></i>
                  <span>Facebook</span>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition duration-300">
                  <i className="fab fa-twitter text-2xl"></i>
                  <span>Twitter</span>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-pink-600 hover:text-pink-400 transition duration-300">
                  <i className="fab fa-instagram text-2xl"></i>
                  <span>Instagram</span>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-700 hover:text-blue-500 transition duration-300">
                  <i className="fab fa-linkedin text-2xl"></i>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2025 EV Charge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}