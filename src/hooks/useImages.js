import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiClient from "../services/ApiClient";
import useAuth from './useAuth';

const useImages = () => {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const currentUser = await ApiClient.getCurrentUser(auth, token);
        setUser(currentUser);

        const wallOfFameData = await ApiClient.getWallOfFame(auth, token, currentUser.username);
        setImages(wallOfFameData);
      } catch (error) {
        toast.error("An error occured while fetching images");
        console.log("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { user, images, setImages, isLoading };
};

export default useImages;
