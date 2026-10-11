import React, { useEffect, useState } from 'react';
import { urlConsts } from '../consts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,

  });

  useEffect(() => {
    fetch(`${urlConsts.API}api/stats`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setStats(data))
      .catch(error => {
        console.error('Error fetching stats:', error);
        setStats({
          totalProducts: 0
          
        });
      });
  }, []);

  return (
    <div>
      <h1>Dashboard  joon </h1>
      <div>
        <h2>Total Products: {stats.totalProducts}</h2>
      </div>
      <div>
        <h2>Recent Products</h2>
    
      </div>
    </div>
  );
};

export default Dashboard;
