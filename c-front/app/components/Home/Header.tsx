import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from "../../../redux/store/store";
import { fetchUserData } from '../../services/getUserService';
import { FaGlobe, FaBars, FaTimes, FaCaretDown } from 'react-icons/fa';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAP_BOX_KEY; // Ensure this is a valid and unrestricted key

interface HeaderProps {
  setCoordinates: (coords: { lat: number; lng: number }) => void;
}

export default function Header({ setCoordinates }: HeaderProps) {
  const data = useSelector((state: RootState) => state.home.DataInfo);
  const dataFR = useSelector((state: RootState) => state.fr.DatafrenchInfo);
  const [language, setLanguage] = useState("English");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");
  const [address, setAddress] = useState<string | null>(null);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
      setDropdownOpen(false);
      setUserDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchUserData(setUserData, setError, setLoading);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation success:", position);
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setCoordinates]);

  const fetchAddress = async (lat: number, lon: number) => {
    try {
      console.log(`Fetching address for lat: ${lat}, lon: ${lon}`);
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`);
      const data = await response.json();
      console.log("Geocoding API response:", data);
      if (data.features && data.features.length > 0) {
        const place = data.features[0];
        const city = place.context.find((c: any) => c.id.includes('place'))?.text;
        const country = place.context.find((c: any) => c.id.includes('country'))?.text;
        setAddress(`${city}, ${country}`);
      } else {
        console.error('Error fetching address:', data.message);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  const getData = () => {
    return language === "French" ? dataFR : data;
  };  

  const currentData = getData();

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={40} height={40} className="mr-2" />
            </Link>
            <div className="text-xl font-bold hidden sm:block">{currentData.title}</div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/map" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300">
                {currentData.newPoint}
              </Link>
              <Link href="/ListChargingPoint" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300">
                {currentData.addPoint}
              </Link>
              <div className="px-3 py-2 rounded-md text-sm font-medium">
                {address ? (
                  language === "French" ? `${address}` : `${address}`
                ) : (
                  language === "French" ? "Localisation en cours..." : "Fetching location..."
                )}
              </div>
              <div className="relative">
                <button
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300 flex items-center"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaGlobe className="mr-2" />
                  {language}
                </button>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 flex items-center"
                        onClick={() => handleLanguageChange('French')}
                      >
                        {language === 'French' && (
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                        French
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 flex items-center"
                        onClick={() => handleLanguageChange('English')}
                      >
                        {language === 'English' && (
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                        English
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {!loading && userData ? (
                <div className="relative">
                  <button
                    className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition duration-300 flex items-center"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  >
                    Hello, {userData} <FaCaretDown className="ml-1" />
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <ul className="py-1">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                          <Link href="/Account/Profile">Account details</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                          <Link href="/promotional-balance">Promotional balance</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                          <Link href="/plans-offers">Plans & Offers</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                          <Link href="/payment-methods">Payment Methods</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                          <Link href="/rfid-card">RFID card</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                          <Link href="/favourite-stations">Favourite stations</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                          <Link href="/my-charges">My charges</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                          <Link href="/billing">Billing</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                          <Link href="/help-support">Help & Support</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                          <Link href="/logout">Log out</Link>
                        </li>
                      </ul>
                      <div className="px-4 py-2 border-t">
                        <Link href="/download-app" className="block text-center text-blue-600 font-medium">
                          Download the app
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/SignIn" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition duration-300">
                  {currentData.SigninPoint}
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/map" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
              {currentData.newPoint}
            </Link>
            <Link href="/ListChargingPoint" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
              {currentData.addPoint}
            </Link>
            <div className="block px-3 py-2 rounded-md text-base font-medium text-white">
              {address ? (
                language === "French" ? `Adresse: ${address}` : `Address: ${address}`
              ) : (
                language === "French" ? "Localisation en cours..." : "Fetching location..."
              )}
            </div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
            >
              {language}
            </button>
            {dropdownOpen && (
              <div className="pl-4">
                <button
                  onClick={() => handleLanguageChange('French')}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                >
                  French
                </button>
                <button
                  onClick={() => handleLanguageChange('English')}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                >
                  English
                </button>
              </div>
            )}
            {!loading && userData ? (
              <div className="relative">
                <button
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  Hello, {userData} <FaCaretDown className="ml-1" />
                </button>
                {userDropdownOpen && (
                  <div className="pl-4">
                    <Link href="/Account/Profile" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Account details</Link>
                    <Link href="/promotional-balance" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Promotional balance</Link>
                    <Link href="/plans-offers" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Plans & Offers</Link>
                    <Link href="/payment-methods" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Payment Methods</Link>
                    <Link href="/rfid-card" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">RFID card</Link>
                    <Link href="/favourite-stations" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Favourite stations</Link>
                    <Link href="/my-charges" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">My charges</Link>
                    <Link href="/billing" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Billing</Link>
                    <Link href="/help-support" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Help & Support</Link>
                    <Link href="/logout" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Log out</Link>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/SignIn" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                {currentData.SigninPoint}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}