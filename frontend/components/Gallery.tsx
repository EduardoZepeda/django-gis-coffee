import React, { useId } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import styles from '@styles/swiperCustom.module.css'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";



// placeholder images since I don't posses lots of images to share here
const placeholderImages = [
    '/placeholder-coffee-shop-1.jpg',
    '/placeholder-coffee-shop-2.jpg',
    '/placeholder-coffee-shop-3.jpg',
    '/placeholder-coffee-shop-4.jpg',
    '/placeholder-coffee-shop-5.jpg'
]

export default function Gallery() {
    const imageId = useId()
    return (
        <>
            <Swiper pagination={true} modules={[Pagination]} className={styles.swiperContainer}>
                {placeholderImages.map((image, index) => <SwiperSlide key={`${imageId} ${index}`}>
                    <img src={image} alt="place holder example image" />
                </SwiperSlide>)}
            </Swiper>
        </>
    );
}
