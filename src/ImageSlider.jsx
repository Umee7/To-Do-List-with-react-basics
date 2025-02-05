import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./ImageSlider.module.css";

const intervalTime = 3000;

export default function ImageSlider({ images }) {
  const [imageIndex,setImageIndex] = useState(2);

  useEffect(()=>{
    const interval = setInterval(()=> {
      setImageIndex((prev) => (prev + 1) % images.length);
    },intervalTime );
  
    return () => clearInterval(interval);

  },[]);

  return (
    <div className={styles["image-container"]}>
      <img src={images[imageIndex]} alt="Slider Background" />
      <div className={styles["slider-text"]}>To-Do List</div>
    </div>
  );
}

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
