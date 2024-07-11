import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const BioPopup = ({ isOpen, user, handleClose }) => {
    const [ bio, setBio ] = useState("");

    const handleBioSave = async () => {
        const data = {
            username: user.username,
            bio: bio,
        }
        try {
          // Assuming you have an endpoint to update the user's bio
          await axios.put(`${API_URL}/users/update-bio`, data);
          toast.success('Bio updated successfully');
          handleClose();
          window.location.reload();
        } catch (error) {
          toast.error('Failed to update bio');
        }
    };

    if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md mx-auto'>
        <h2 className='text-xl font-semibold mb-4'>Edit Bio</h2>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full mb-4'
        />
        <div className='flex justify-end space-x-2'>
          <button
            onClick={handleClose}
            className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 hover:text-white'
          >
            Cancel
          </button>
          <button
            onClick={handleBioSave}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BioPopup;