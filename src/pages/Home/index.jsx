import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import axios from 'axios';
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import ImageCard from "../../components/ImageCard";
import useImages from "../../hooks/useImages";
import AddButton from '../../components/AddButton';
import BioPopup from '../../components/BioPopup';
import PublishLink from '../../components/PublishButton';
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [isBioPopupOpen, setIsBioPopupOpen] = useState(false);
  const [isShareLinkOpen, setIsShareLinkOpen] = useState(false);
  const { user, images, setImages, isLoading } = useImages();
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  if (isLoading) {
    return (
      <div className="auth-loader">
        <Loader />
      </div>
    );
  }

  const onDragEnd = ({ active, over }) => {
    if (!active || !over || active.id === over.id) {
      return;
    }
    setImages((displayImages) => {
      const oldIndex = displayImages.findIndex(
        (image) => image.id === active.id
      );
      const newIndex = displayImages.findIndex(
        (image) => image.id === over.id
      );
      return arrayMove(displayImages, oldIndex, newIndex);
    });
  };

  const handlePublish = async () => {
    const updatedImages = images.map((image, index) => ({
      ...image,
      order: index + 1,
    }));

    try {
      await axios.post(`${API_URL}/wall-of-fame/update-image-order`, updatedImages);
      toast.success('Image order updated successfully');
      handleShareLinkOpen();
    } catch (error) {
      toast.error('Failed to update image order');
    }
  };

  const handleBioOpen = () => {
    setIsBioPopupOpen(true);
  };

  const handleBioClose = () => {
    setIsBioPopupOpen(false);
  };

  const handleShareLinkOpen = () => {
    setIsShareLinkOpen(true);
  };

  const handleShareLinkClose = () => {
    setIsShareLinkOpen(false);
  };

  return (
    <div className="relative min-h-screen pb-20">
      <Navbar handlePublish={handlePublish}/>
      <div className="description">
        <h1>{user?.name}</h1>
        <div>{user?.bio === "" ? "View my achievements!" : user?.bio}
          <span onClick={handleBioOpen} style={{ cursor: 'pointer' }}>
            <i className='bx bxs-pencil'></i>
          </span>
          <p>@{user?.username}</p>
        </div>
      </div>
      {images?.length === 0 ? (
        <div className="no-images">
          <p>You don't have any images</p>
          <p>Click the plus button below to add</p>
        </div>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          sensors={sensors}
        >
          <div className="image-cards">
            <SortableContext items={images} strategy={rectSortingStrategy}>
              {images?.map((image) => (
                <ImageCard key={image.order} image={image} />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      )}
      <AddButton />
      <BioPopup
        user={user}
        isOpen={isBioPopupOpen}
        handleClose={handleBioClose}
      />
      <PublishLink
        publicLink={`https://wall-of-fame-pi.vercel.app/fame/${user?.username}`}
        isOpen={isShareLinkOpen}
        handleClose={handleShareLinkClose}
      />
      <ToastContainer />
    </div>
  );
};

export default Home;
