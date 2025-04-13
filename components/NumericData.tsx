'use client';
import React, { useEffect, useState } from 'react';

interface NumericDataResponse {
  utilizationRate: number;
  packagesOnTime: number;
  totalPackages: number;
}

const NumericData: React.FC = () => {
  const [utilizationRate, setUtilizationRate] = useState<number>(0);
  const [packagesOnTime, setPackagesOnTime] = useState<number>(0);
  const [totalPackages, setTotalPackages] = useState<number>(0);

  useEffect(() => {
    const fetchNumericData = async () => {
      try {
        const response = await fetch('/api/numericData');
        const data: NumericDataResponse = await response.json();

        setUtilizationRate(data.utilizationRate);
        setPackagesOnTime(data.packagesOnTime);
        setTotalPackages(data.totalPackages);
      } catch (error) {
        console.error('Error fetching numeric data:', error);
      }
    };

    fetchNumericData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-around gap-6 text-center">
        <div>
          <h3 className="text-gray-600 text-sm">Warehouse Utilization Rate</h3>
          <p className="text-xl font-semibold text-blue-600">
            {utilizationRate.toFixed(2)}%
          </p>
        </div>
        <div>
          <h3 className="text-gray-600 text-sm">Packages On-Time</h3>
          <p className="text-xl font-semibold text-green-600">
            {packagesOnTime.toFixed(2)}%
          </p>
        </div>
        <div>
          <h3 className="text-gray-600 text-sm">Total Packages</h3>
          <p className="text-xl font-semibold text-gray-800">
            {totalPackages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NumericData;
