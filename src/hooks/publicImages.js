import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PublicClient from "../services/PublicClient";

const PublicImages = (username) => {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const currentUser = await PublicClient.getCurrentUser(username);
        setUser(currentUser);

        const wallOfFameData = await PublicClient.getWallOfFame(username);
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

export default PublicImages;
