import React, { useState } from 'react';
import uploadFiles from '../../services/uploadService';
import useImages from "../../hooks/useImages";

const ImageUpload = ({ open, handleClose }) => {
    const { user } = useImages();
    const [files, setFiles] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [isUploading, setIsUploading] = useState(false);

    const handleFilesChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles(selectedFiles);
        // Reset descriptions array to match the number of selected files
        setDescriptions(Array.from({ length: selectedFiles.length }, () => ''));
    };

    const handleDescriptionChange = (index, value) => {
        const updatedDescriptions = [...descriptions];
        updatedDescriptions[index] = value;
        setDescriptions(updatedDescriptions);
    };

    const handleUpload = async () => {
        setIsUploading(true);
        try {
            await uploadFiles(files, user.username, descriptions, setUploadProgress);
            setFiles([]);
            setUploadProgress({});
        } catch (error) {
            // Handle error if necessary
        } finally {
            setIsUploading(false);
            handleClose();
            window.location.reload();
        }
    };

    return (
        <div className={`${open ? 'fixed' : 'hidden'} inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center`}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
                <input type="file" multiple onChange={handleFilesChange} className="mb-4 w-full" />
                <div className="space-y-2">
                    {Array.from(files).map((file, index) => (
                        <div key={file.name}>
                            <input
                                type="text"
                                value={descriptions[index]}
                                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                placeholder={`Description for ${file.name}`}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                            <div className="flex justify-between items-center">
                                <span className="text-sm">{file.name}</span>
                                <span className="text-sm">{uploadProgress[file.name] || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${uploadProgress[file.name] || 0}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={handleClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:text-white hover:bg-blue-700 ${isUploading ? 'opacity-50' : ''}`}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;