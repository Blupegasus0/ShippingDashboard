'use client'
import React, { useEffect, useState } from 'react';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';
import NumericData from '../../components/NumericData';

export default function Page() {
    return (
        <div>
            <h1>This is the dashboard</h1>
            <NumericData />
            <BarChart />
            <PieChart />
            <LineChart />
        </div>
    );
}


