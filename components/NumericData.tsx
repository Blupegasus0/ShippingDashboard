
'use client'
import React, { useEffect, useRef, useState } from 'react';

function NumericData() {
  const [utilizationRate, setUtilizationRate] = useState(0);
  const [packagesOnTime, setPackagesOnTime] = useState(0);
  const [totalPackages, setTotalPackages] = useState(0);


  useEffect(() => {
    async function fetchNumericData() {
      try {
        const response = await fetch('/api/numericData');
        const data = await response.json();

        setUtilizationRate(data.utilizationRate);
        setPackagesOnTime(data.packagesOnTime);
        setTotalPackages(data.totalPackages);
      } catch (error) {
        console.error('Error fetching numeric data:', error);
      }
    }

    fetchNumericData();
  }, []);

    return (
    <div>
      <h3>Current Warehouse Utilization Rate: {utilizationRate.toFixed(2)}%</h3>
      <h3>Packages On-Time: {packagesOnTime.toFixed(2)}%</h3>
      <h3>Total Packages: {totalPackages}</h3>
    </div>
    )
}

export default NumericData;
