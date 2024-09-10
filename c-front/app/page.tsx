"use client";
import { RootState } from "../redux/store/store";
// import { AppDispatch } from "../redux/store/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Home/Header";
import nookies from "nookies";
import axios from "axios";

import { FaGooglePlay, FaApple } from 'react-icons/fa';
// import setUserData from "../redux/features/userSlice";

export default function Home() {
  const data = useSelector((state: RootState) => state.home.DataInfo);
  const dataFR = useSelector((state: RootState) => state.fr.DatafrenchInfo);
  // const userData = useSelector((state: RootState) => state.user.userData); // Access user data from the store
  const [language, setLanguage] = useState("English");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const dispatch = useDispatch<AppDispatch>();

  // const [userData, setUserData] = useState("");


  // const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
      setDropdownOpen(false);
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


  // if (loading) {
  //   return (
  //     <div className="w-full h-screen flex items-center justify-center">
  //       <div className="loader">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div
        className="w-full h-screen bg-cover flex flex-col font-popin text-sm relative"
        style={{ backgroundImage: "url('home1.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <Header />
        <div className="w-full h-[50%] px-[10%] flex flex-col gap-20 justify-center text-white relative z-10">
          <div className="text-5xl text-[#D6D6D6] font-bold">{currentData.TitleText}</div>
          <div className="text-xl font-semibold">{currentData.ContentText}</div>
        </div>
      </div>

      <div className="relative flex items-center justify-center h-screen bg-gray-900"
        style={{ backgroundImage: "url('secondp.webp')" }}>

        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 text-center text-white flex flex-col items-center space-y-4">
          <h1 className="text-5xl font-bold">DOWNLOAD</h1>
          <h1 className="text-5xl font-bold">THE</h1>
          <h1 className="text-5xl font-bold">FUTURE</h1>

          <div className="flex space-x-4 mt-8">
            <a
              href="#"
              className="flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg"
            >
              <FaGooglePlay size={24} />
              <span>Get it on Google Play</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg"
            >
              <FaApple size={24} />
              <span>Download on the App Store</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className="w-full h-screen bg-cover relative"
        style={{ backgroundImage: "url('mapsection.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex h-full items-center justify-center relative z-10">
          <div className="bg-white h-[30%] w-[40%] flex flex-col ">
            <p>{currentData.MapDescription}</p>
            <div className="w-maxcontent px-[10px] h-11 bg-white flex items-center justify-center rounded-xl">
              <Link rel="stylesheet" href="/map">
                {currentData.ChargePoint}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full h-screen bg-cover relative"
        style={{ backgroundImage: "url('addstation.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">seconde section</div>
      </div>
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Clients Say About Us</h2>
        <div className="flex flex-col md:flex-row justify-center md:space-x-8 space-y-8 md:space-y-0">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="italic mb-4">"Great service!"</p>
            <h3 className="font-bold">Ahmed H.</h3>
            <span>5 stars</span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="italic mb-4">"Highly recommend!"</p>
            <h3 className="font-bold">Ahmed H.</h3>
            <span>5 stars</span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="italic mb-4">"Amazing experience!"</p>
            <h3 className="font-bold">Ahmed H.</h3>
            <span>5 stars</span>
          </div>
        </div>
      </section>
      <footer className="bg-teal-900 text-white py-10">
        <div className="container mx-auto px-4 md:flex md:justify-between">
          {/* Left Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Ready to get started?</h3>
            <button className="bg-white text-teal-900 font-bold py-2 px-4 rounded">Get started</button>
          </div>

          {/* Middle Section */}
          <div className="flex justify-between w-full md:w-auto md:space-x-20">
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul>
                <li>Email Marketing</li>
                <li>Campaigns</li>
                <li>Branding</li>
                <li>Offline</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul>
                <li>Our Story</li>
                <li>Benefits</li>
                <li>Team</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Help</h4>
              <ul>
                <li>FAQs</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="container mx-auto px-4 mt-8 text-center md:text-left md:flex md:justify-between">
          <div className="mb-4 md:mb-0">
            <a href="#" className="mr-4">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="flex justify-center space-x-4 md:justify-start">
            <a href="#" aria-label="Facebook">
              <img src="/icons/facebook-icon.svg" alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src="/icons/twitter-icon.svg" alt="Twitter" className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src="/icons/instagram-icon.svg" alt="Instagram" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}