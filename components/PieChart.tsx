'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

interface VolumeByMode {
  mode: string;
  volume: number;
}

const PieChart: React.FC = () => {
  const pieChartRef = useRef<HTMLDivElement | null>(null);
  const [volumeData, setVolumeData] = useState<VolumeByMode[]>([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await fetch('/api/charts/pie-chart-data');
        const data = await response.json();
        setVolumeData(data.volumeByMode);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchPieChartData();
  }, []);

  useEffect(() => {
    if (!pieChartRef.current || volumeData.length === 0) return;

    const chartInstance = echarts.init(pieChartRef.current);

    const option = {
      title: {
        text: 'Number of Packages by Mode',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Packages',
          type: 'pie' as const,
          radius: '50%',
          data: volumeData.map(({ mode, volume }) => ({
            name: mode,
            value: volume,
          })),
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

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [volumeData]);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full h-[400px]">
      <div ref={pieChartRef} className="w-full h-full" />
    </div>
  );
};

export default PieChart;
