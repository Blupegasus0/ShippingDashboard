'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

interface ChartItem {
  date: string;
  carrier: string;
  count: number;
}

type GroupedData = Record<string, Record<string, number>>;

const BarChart: React.FC = () => {
  const barChartRef = useRef<HTMLDivElement | null>(null);
  const [chartData, setChartData] = useState<GroupedData>({});

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('/api/charts/bar-chart-data');
        const data: ChartItem[] = await response.json();

        const grouped: GroupedData = {};

        data.forEach(({ date, carrier, count }) => {
          if (!grouped[date]) {
            grouped[date] = {};
          }
          grouped[date][carrier] = count;
        });

        setChartData(grouped);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    if (!barChartRef.current || Object.keys(chartData).length === 0) return;

    const chartInstance = echarts.init(barChartRef.current);

    const dates = Object.keys(chartData);
    const carriers = [...new Set(dates.flatMap(date => Object.keys(chartData[date])))];

    const series = carriers.map(carrier => ({
      name: carrier,
      type: 'bar',
      data: dates.map(date => chartData[date][carrier] ?? 0),
    }));

    chartInstance.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: carriers },
      xAxis: { type: 'category', data: dates },
      yAxis: { type: 'value' },
      series,
    });

    return () => {
      chartInstance.dispose();
    };
  }, [chartData]);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full h-[400px]">
      <div ref={barChartRef} className="w-full h-full" />
    </div>
  );
};

export default BarChart;
