"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const [username, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");

  const validateEmail = (input: any) => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(input));
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const validatePassword = (input: any) => {
    setIsValidPassword(passwordRegex.test(input));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if all fields are not empty
    if (!email || !password || !confirmPassword || !username) {
      alert("All fields are required.");
      return;
    }

    // Validate email format
    validateEmail(email);
    if (!isValidEmail) {
      alert("Invalid email format.");
      return;
    }

    // Validate password format
    validatePassword(password);
    if (!isValidPassword) {
      alert("Password does not meet the required criteria.");
      return;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      alert("Passwords do not match.");
      return;
    } else {
      setIsPasswordMatch(true);
    }

    const user = {
      email,
      password,
      username,
    };

    // fetch('http://localhost:8087/keycloak/register')
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
    try {
      const response = await fetch('http://localhost:8080/KEYCLOAK-AUTH-SERVICE/keycloak/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PostmanRuntime/7.40.0',
          'Accept' : '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',

        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Handle successful registration
        alert('Registration successful!');
        window.location.href = '/';
      } else {
        // Handle errors
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }

  };
  return (
    <div className="grid place-items-center h-screen">
      <form
        className="bg-[#6E7AAE] w-full sm:w-96 md:w-120 lg:w-2/3 xl:w-[56%] p-8 border border-gray-300 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="mx-auto mb-2">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={100} height={100} />
            </Link>
          </div>
          <h2 className="text-[#C9C9C9] font-serif text-3xl mt-6">
            salah Account
          </h2>
        </div>

        <div className="grid md:gap-5">
          <div className="self-center col-span-2 md:col-span-1 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] w-full mb-4">
            <input
              type="text"
              id="firstname"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={username}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label
              htmlFor="firstname"
              className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#6E7AAE] px-2 peer-focus:px-2 peer-focus:text-[#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              User Name
            </label>
          </div>
          {/* <div className="self-center col-span-2 md:col-span-1 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] w-full mb-4">
            <input
              type="text"
              id="lastname"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label
              htmlFor="lastname"
              className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#6E7AAE] px-2 peer-focus:px-2 peer-focus:text-[#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Last Name
            </label>
          </div> */}
        </div>

        <div className="self-center col-span-2 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] w-full mb-4">
          <input
            type="email"
            id="email"
            className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-field ${
              !isValidEmail && email !== "" ? "border-red-500" : ""
            }`}
            placeholder=" "
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              validateEmail(event.target.value);
            }}
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#6E7AAE] px-2 peer-focus:px-2 peer-focus:text-[#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Email
          </label>
        </div>
        {!isValidEmail && email !== "" && (
          <p className="text-red-300 text-xs">Invalid email format!!</p>
        )}

        <div>
          <p className="text-xs text-[#d8d1a5] mb-[3px]">
            Password rules: at least 8 characters - One uppercase - One special
            character - One number
          </p>
          <div className="self-center col-span-2 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] w-full mb-4">
            <input
              type="password"
              id="password"
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-field input-field ${
                !isValidPassword && password !== "" ? "border-red-500" : ""
              }`}
              placeholder=" "
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                validatePassword(event.target.value);
              }}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#6E7AAE] px-2 peer-focus:px-2 peer-focus:text-[#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Password
            </label>
          </div>
        </div>
        {!isValidPassword && password !== "" && (
          <p className="text-red-300 text-xs mb-3">Invalid password</p>
        )}

        <div className="self-center col-span-2 relative bg-inherit border-[1px] border-[#c9c9c9] rounded-[10px] w-full mb-4">
          <input
            type="password"
            id="cPassword"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label
            htmlFor="cPassword"
            className="absolute text-sm text-[#c9c9c9] dark:text-[#c9c9c9] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#6E7AAE] px-2 peer-focus:px-2 peer-focus:text-[#c9c9c9] peer-focus:dark:text-[#c9c9c9] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[5px] peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Confirm Password
          </label>
        </div>
        {!isPasswordMatch && confirmPassword !== "" && (
          <p className="text-red-300 text-xs mb-3">Passwords do not match</p>
        )}

        <div className="mt-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#DFB97F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Account
          </button>
        </div>

        <p className="text-gray-600 mt-4 text-center md:text-left">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            <Link href="./../SignIn">Click Here</Link>
          </span>
        </p>

        <div className="text-center border-b-[1px] leading-[0.1em] border-b-[#c9c9c9] mt-4">
          <span className="bg-[#6E7AAE] px-4 text-[#c9c9c9]">or</span>
        </div>

        <Link href="/">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4">
            <button className="flex-grow md:w-1/2 border border-gray-300 text-gray-900 py-2 px-4 rounded hover:bg-indigo-500 flex items-center">
              <img
                src="./google_logo.png"
                className="w-6 h-6 mr-2"
                alt="Google Logo"
              />
              Sign up with Google
            </button>
          </div>
        </Link>
      </form>
    </div>
  );
}

export default Signup;
