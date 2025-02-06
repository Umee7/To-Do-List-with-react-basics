import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import  { useQuery } from '@tanstack/react-query'
import Axios from 'axios'
import styles from "./ImageSlider.module.css";

const intervalTime = 12000;
const intervalTimeFacts = 6000;


export default function ImageSlider({ images }) {
  const [imageIndex,setImageIndex] = useState(2);

  const { data, refetch } = useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      const response = await Axios.get("https://catfact.ninja/fact");
      return response.data;
      
    },
    
  } );
  console.log(data?.fact);


  useEffect(()=>{
    const interval = setInterval(()=> {
      refetch()
    },intervalTimeFacts );
  
    return () => clearInterval(interval);

  },[]);

  useEffect(()=>{
    const interval = setInterval(()=> {
      setImageIndex((prev) => (prev + 1) % images.length);
    },intervalTime );
  
    return () => clearInterval(interval);

  },[]);

  return (
    <div className={styles["image-container"]}>
      <img src={images[imageIndex]} alt="Slider Background" />
      <div className={styles["slider-text"]}><h6 style={{fontSize: "24px"}}> {data?.fact}</h6> </div>
      <div style={{height: "100px" }}>
      
      </div>
    </div>
  );
}

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
