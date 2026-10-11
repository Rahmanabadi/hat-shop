import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import BestSellers from '../components/Home/BestSellers';
import Discounts from '../components/Home/Discounts';

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroBanner />
      <BestSellers />
      <Discounts />
    </div>
  );
};

export default HomePage;
