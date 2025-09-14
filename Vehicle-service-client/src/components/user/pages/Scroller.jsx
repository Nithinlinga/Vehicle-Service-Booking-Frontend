import React, { useEffect, useRef } from 'react';
import './UserDashboard.css';
import img1 from '../../../assets/logos/1.png';
import img2 from '../../../assets/logos/2.avif';
import img3 from '../../../assets/logos/3.webp';
import img4 from '../../../assets/logos/4.jpg';
import img5 from '../../../assets/logos/5.png';
import img6 from '../../../assets/logos/6.png';
import img7 from '../../../assets/logos/7.jpg';
import img8 from '../../../assets/logos/8.png';
import img9 from '../../../assets/logos/9.png';
import img10 from '../../../assets/logos/10.png';
import img11 from '../../../assets/logos/11.png';
import img12 from '../../../assets/logos/12.png';
import img13 from '../../../assets/logos/13.png';
import img14 from '../../../assets/logos/14.png';
import img15 from '../../../assets/logos/15.png';
import img16 from '../../../assets/logos/16.png';
import img17 from '../../../assets/logos/17.jpg';
import img18 from '../../../assets/logos/18.png';
import img19 from '../../../assets/logos/19.jpg';
import img20 from '../../../assets/logos/20.png';

// The array of images
const images = [
  [img1],
  [img2, img3],
  [img4, img5, img6],
  [img7, img8, img9],
  [img10, img11, img12],
  [img13, img14, img15],
  [img16, img17, img18],
  [img19, img20]
];

const Scroller = ({ direction = 'left', speed = 'normal' }) => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addAnimation(scroller);
    }
  }, []);

  const addAnimation = (scroller) => {
    scroller.setAttribute('data-animated', true);
    const scrollerInner = scroller.querySelector('.scroller__inner');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute('aria-hidden', true);
      scrollerInner.appendChild(duplicatedItem);
    });
  };

  // Flatten the array of arrays into a single array
  const flatImages = images.flat();

  return (
    <div
      ref={scrollerRef}
      className="max-w-[600px] scroller"
      data-direction={direction}
      data-speed={speed}
    >
      <div
        className="py-4 flex flex-wrap gap-4 scroller__inner"
      >
        {flatImages.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt="error" className='scroller-img'/>
        ))}
      </div>
    </div>
  );
};

export default Scroller;