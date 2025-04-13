'use client';
import React from 'react';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';
import NumericData from '../../components/NumericData';
import Navbar from '../../components/Navbar';

export default function Page() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
        <Navbar pageName="Dashboard"/>
        <NumericData />
        <BarChart />
        <PieChart />
        <LineChart />
    </div>
  );
}
