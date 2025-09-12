import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import vid from '../../assets/video.mp4';
import './UserDashboard.css';
import serviceimg from '../../assets/service.jpg';
import img1 from '../../assets/vehicleservicelist/1.jpg';
import img2 from '../../assets/vehicleservicelist/2.jpg';
import img3 from '../../assets/vehicleservicelist/3.jpg';
import img4 from '../../assets/vehicleservicelist/4.jpg';
import img5 from '../../assets/vehicleservicelist/5.jpg';
import img6 from '../../assets/vehicleservicelist/6.jpg';
import img7 from '../../assets/vehicleservicelist/7.jpg';
import img8 from '../../assets/vehicleservicelist/8.jpg';
import img9 from '../../assets/vehicleservicelist/9.jpg';
import img10 from '../../assets/vehicleservicelist/10.jpg';
import img11 from '../../assets/vehicleservicelist/11.jpg';
import img12 from '../../assets/vehicleservicelist/12.jpg';
import Scroller from './Scroller';

const images = [
  [img1, img2, img3],
  [img4, img5, img6],
  [img7, img8, img9],
  [img10, img11, img12]
];

const UserDashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <>
      <div className="relative max-w-full h-[800px]">
        <video autoPlay muted loop className="absolute w-full h-full object-cover z-0">
          <source src={vid} />
        </video>
        <div className="relative z-10 text-center text-white p-2.5">
          <h2 className="text-[2.5rem] relative top-[270px] font-extrabold">
            Imagine the possibilities <br />with Xcelerate Auto
          </h2>
          <NavLink to="/appointment">
            <button className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 relative top-[300px] w-[280px] m-[14px]">
            Book Your Appointment Now
            </button>
          </NavLink>
        </div>
      </div>
      <div className="w-full h-[800px] pt-5 text-right text-[2.5rem] text-white bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${serviceimg})`}}>
        <h2 className="mt-4 font-semibold text-5xl">Trust build for forever</h2>
        <NavLink to="/services">
          <button className="mt-[60px] w-[280px] m-3 inline-flex items-center justify-center rounded-md bg-cyan-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400">
          Look For Services
          </button>
        </NavLink>
        <h1 className=''>
            <span class="text_1">Transparent pricings and <span className='text-indigo-700 font-bold text-5xl'>Zero</span> hastle</span>
            <span class="text_2"> Trusted by <span className='text-red-600 font-bold text-5xl'>100k</span> + vehicle owners</span>
        </h1>
      </div>
      <div className="secondone h-[550px] bg-gray-100 dark:bg-slate-900 flex flex-col items-center justify-center">
        <h2 className="text-center bg-white dark:bg-slate-800 dark:text-white text-xl font-semibold mb-6 px-4 py-2 rounded-md shadow-lg ">
          Look Upon Some Services ...
        </h2>

      <div className="relative w-full max-w-5xl overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((group, index) => (
            <div key={index} className="flex-shrink-0 w-full flex justify-center gap-4 px-4">
              {group.map((src, i) => (
                <img key={i} src={src} alt={`Slide ${index}-${i}`} className="w-[285px] h-[250px] rounded shadow-lg" loading="lazy" />
              ))}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-2xl dark:bg-slate-700 text-black dark:text-white px-3 py-10 rounded-full shadow hover:bg-gray-300 hover:text-black dark:hover:bg-slate-600">
          ‹
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-2xl dark:bg-slate-700 text-black dark:text-white px-3 py-10 rounded-full shadow hover:bg-gray-300 hover:text-black dark:hover:bg-slate-600">
          ›
        </button>
      </div>
    </div>

    <div className="flex items-center justify-center bg-gray dark:bg-gray-900 text-gray-100">
      {/* <Scroller speed="fast" /> */}
      {/* <Scroller direction="left" speed="slow" /> */}
      <Scroller />
    </div>
    </>
  )
}

export default UserDashboard