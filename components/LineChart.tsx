'use client'
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const LineChart = () => {
  const chartRef = useRef(null);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const fetchLineChartData = async () => {
      try {
        const response = await fetch('/api/charts/line-chart-data');
        const data = await response.json();
        setLineData(data);
      } catch (error) {
        console.error('Error fetching line chart data:', error);
      }
    };

    fetchLineChartData();
  }, []);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: 'Warehouse Capacity Over the Year',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: lineData.map(item => item.date), // Dates on the x-axis
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Packages Received',
          type: 'line',
          data: lineData.map(item => item.count), // Counts on the y-axis
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [lineData]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default LineChart;
