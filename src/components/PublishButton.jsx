import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

const PublishLink = ({ isOpen, publicLink, handleClose }) => {

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(publicLink);
        toast.success('Link copied to clipboard!');
    };

    if (!isOpen) return null;

    return (
        <div>
            {/* Share popup */}
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Share your Wall of Fame</h2>
                    <p className="mb-4">Share this link with your friends:</p>
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="text"
                            value={publicLink}
                            readOnly
                            className="flex-1 border p-2 rounded"
                        />
                        <button
                            onClick={copyLinkToClipboard}
                            className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
                        >
                            <i className="h-5 w-5 bx-clipboard"></i>
                        </button>
                    </div>
                    <div className='flex justify-end space-x-2'>
                      <button
                        onClick={handleClose}
                        className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700'
                      >
                        Cancel
                      </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublishLink;
