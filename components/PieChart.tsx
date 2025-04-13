'use client'
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const PieChart = () => {
  const chartRef = useRef(null);
  const [volumeData, setVolumeData] = useState([]);
  const [utilizationRate, setUtilizationRate] = useState(0);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await fetch('/api/charts/pie-chart-data');
        const data = await response.json();
        setVolumeData(data.volumeByMode);
        setUtilizationRate(data.utilizationRate);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchPieChartData();
  }, []);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const pieData = volumeData.map(item => ({
      value: item.volume,
      name: item.mode,
    }));

    const option = {
      title: {
        text: 'Shipment Volume by Mode',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Modes',
          type: 'pie',
          radius: '50%',
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [volumeData]);

  return (
    <div>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
      <h3>Current Warehouse Utilization Rate: {utilizationRate.toFixed(2)}%</h3>
    </div>
  );
};

export default PieChart;
