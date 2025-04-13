'use client'
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const BarChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('/api/charts/bar-chart-data');
        const data = await response.json();
        const groupedData = {};

        // Group data by date and carrier
        data.forEach(item => {
          if (!groupedData[item.date]) {
            groupedData[item.date] = {};
          }
          groupedData[item.date][item.carrier] = item.count;
        });

        setChartData(groupedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const dates = Object.keys(chartData);
    const carriers = [...new Set(Object.values(chartData).flatMap(item => Object.keys(item)))]; // Get unique carriers
    const seriesData = carriers.map(carrier => ({
      name: carrier,
      type: 'bar',
      data: dates.map(date => chartData[date][carrier] || 0), // Fill with 0 if no data
    }));

    const option = {
      xAxis: {
        type: 'category',
        data: dates,
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData,
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [chartData]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default BarChart;
