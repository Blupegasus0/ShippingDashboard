'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

interface LineChartData {
  date: string;
  count: number;
}

const LineChart: React.FC = () => {
  const lineChartRef = useRef<HTMLDivElement | null>(null);
  const [lineData, setLineData] = useState<LineChartData[]>([]);

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
    if (!lineChartRef.current || lineData.length === 0) return;

    const chartInstance = echarts.init(lineChartRef.current);

    const option = {
      title: {
        text: 'Amount of Packages Received During the Year',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: lineData.map(item => item.date),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Packages Received',
          type: 'line' as const,
          data: lineData.map(item => item.count),
          smooth: true,
          lineStyle: {
            width: 2,
          },
          symbol: 'circle',
          symbolSize: 6,
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [lineData]);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full h-[400px]">
      <div ref={lineChartRef} className="w-full h-full" />
    </div>
  );
};

export default LineChart;
