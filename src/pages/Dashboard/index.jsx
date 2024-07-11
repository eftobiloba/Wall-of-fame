import React from "react";
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
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useParams } from 'react-router-dom';
import PublicNavbar from "../../components/PublicNavbar";
import Loader from "../../components/Loader";
import ImageCard from "../../components/ImageCard";
import PublicImages from "../../hooks/publicImages";
import "./style.css";

const Dashboard = () => {
  const { username } = useParams();
  const { user, images, isLoading } = PublicImages(username);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  console.log(username);

  if (isLoading) {
    return (
      <div className="auth-loader">
        <Loader />
      </div>
    );
  }

  const handleDragError = ({ active, over }) => {
    if (!active || !over || active.id === over.id) {
      return;
    }
    toast.error("Log in to use drag and drop");
  };

  return (
    <div className="relative min-h-screen pb-20">
      <PublicNavbar/>
      <div className="description">
        <h1>{user?.name}</h1>
        <div>{user?.bio === "" ? "View my achievements!" : user?.bio}
        </div>
        <p>@{user?.username}</p>
      </div>
      {images?.length === 0 ? (
        <div className="no-images">
          <p>No hall of fame found for this user</p>
        </div>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragError}
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
      <div className="footer">
        Powered by <span><a href="#">Wall Of Fame</a></span>, inspired by <span>
          <a href="https://github.com/Skeby">Skeby</a>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
