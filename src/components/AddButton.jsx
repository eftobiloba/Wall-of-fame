import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { ToastContainer } from 'react-toastify';

const AddButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="fixed bottom-1 sm:bottom-5 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-full sm:max-w-sm">
            <button
                onClick={handleOpenModal}
                className="w-full bg-blue-600 text-white hover:text-white hover:bg-blue-700 text-l py-2 rounded"
            >
                Add
            </button>
            </div>
            <ImageUpload open={isModalOpen} handleClose={handleCloseModal} />
            <ToastContainer />
        </>
    );
};

export default AddButton;
