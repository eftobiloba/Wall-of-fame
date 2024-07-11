import axios from 'axios';
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;

const authService = {
    login: async (form_data) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`,
                form_data, {headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                }}
            ).then((response) => {
                Cookies.set("login_credentials", response.data.access_token);
                return response;
            }).catch((error) => {
                throw error;
            })
            return response;
        } catch (error) {
            toast.error("An error occured while trying to log you in");
            console.error('Error logging in', error);
            throw error;
        }
    },
};

export default authService;
