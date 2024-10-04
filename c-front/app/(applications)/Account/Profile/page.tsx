"use client";
import React, { useState } from 'react';
import Header from 'app/components/Home/Header';
import { useRouter } from 'next/navigation';
import { updateUser } from '../../../services/userService'; // Corrected import path

export default function AccountDetails() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    country: '',
    postalCode: '',
    email: '',
    password: '',
    inspireTrip: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleChange = () => {
    setFormData({ ...formData, inspireTrip: !formData.inspireTrip });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formData); // Call your update user action
      alert('Account details updated successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error updating account details:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">Account Details</h2>
        <form className="bg-white rounded-lg shadow-lg p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
            />
            <p className="text-gray-500 text-xs">Appears when you add comments and/or photos.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your country"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your postal code"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.inspireTrip}
              onChange={handleToggleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Inspire your next trip with recommendations and special offers (via email)</label>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Profile</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}