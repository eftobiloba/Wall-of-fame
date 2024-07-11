import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

const uploadFiles = async (files, userId, tags, setUploadProgress) => {
    const progress = {};
    const promises = Array.from(files).map((file, index) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', userId);
        formData.append('tags', tags[index]);

        return axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (event) => {
                progress[file.name] = Math.round((event.loaded * 100) / event.total);
                setUploadProgress({ ...progress });
            },
        });
    });

    try {
        await Promise.all(promises);
        toast.success('Files uploaded successfully');
    } catch (error) {
        toast.error('Error uploading files');
        console.error('Upload failed', error);
        throw error;
    }
};

export default uploadFiles;
