import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import data from '../../data.json'
import { useSelector } from 'react-redux';
// import { RootState } from '@reduxjs/toolkit/query';
import { RootState } from "../../../redux/store/store";
import nookies from "nookies";
import axios from 'axios';
import { fetchUserData } from '../../services/getUserService';

export default function Header() {
  
  const data = useSelector((state: RootState) => state.home.DataInfo);
  const dataFR = useSelector((state: RootState) => state.fr.DatafrenchInfo);
  const [language, setLanguage] = useState("English");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");
  const dropdownRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
      setDropdownOpen(false);
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

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  const getData = () => {
    return language === "French" ? dataFR : data;
  };  

  const currentData = getData();
  return (
  <div className="w-full h-[10%] px-[10%] flex items-center justify-between relative bg-gray-800 text-white z-40">
    <div className="flex items-center space-x-4">
      <div>
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </div>
      <div className="text-2xl font-bold">{currentData.title}</div>
    </div>
    <div className="flex space-x-4"> 
      <Link href="/map">
      <div className="px-4 py-2 bg-white text-gray-800 flex items-center justify-center rounded-xl hover:bg-gray-200 transition duration-300">
       {currentData.newPoint}
      </div>
      </Link>
      <Link href="/map">
        <div className="px-4 py-2 bg-white text-gray-800 flex items-center justify-center rounded-xl hover:bg-gray-200 transition duration-300">
          {currentData.addPoint}
        </div>
      </Link>
      <Link href="/map">
      <div className="px-4 py-2 bg-white text-gray-800 flex items-center justify-center rounded-xl hover:bg-gray-200 transition duration-300">
        {currentData.MapPage}
      </div>
      </Link>
      <div className="relative">
        <button
          className="px-4 py-2 bg-white text-gray-800 flex items-center justify-center rounded-xl hover:bg-gray-200 transition duration-300"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {language}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
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
      <div className="px-4 py-2 bg-white text-gray-800 flex items-center justify-center rounded-xl hover:bg-gray-200 transition duration-300">
        {!loading && userData ? (
          <button >Hello, {userData}</button>
        ) : (
        <Link href="/SignIn">{currentData.SigninPoint}</Link>
        )}
        
      </div>
    </div>
  </div>
  )
}
