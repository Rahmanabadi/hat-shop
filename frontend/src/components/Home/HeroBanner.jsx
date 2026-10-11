import React from 'react';
import '../../pages/CSSs/HomePage.css';

const HeroBanner = () => {
  return (
    <div className="relative">
      <img src={`https://i.pinimg.com/736x/41/1f/26/411f261894dee576238f879b0a125bc6.jpg`} alt="Hero Banner" className="w-full max-h-[50rem]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
        <h1 className="text-black text-4xl md:text-6xl font-bold">Welcome to Our Hat Shop!</h1>
        <p className="text-black mt-4 text-lg md:text-xl">Discover the best hats for every occasion.</p>
      </div>
    </div>
  );
};

export default HeroBanner;
