'use client'
import React, { useEffect, useState } from 'react';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';

export default function Page() {
    const [shipmentCount, setShipmentCount] = useState(0);

    useEffect(() => {
        const fetchShipmentCount = async () => {
            try {
                const response = await fetch('/api/count');
                const data = await response.json();
                setShipmentCount(data.count);
            } catch (error) {
                console.error('Error fetching shipment count:', error);
            }
        };

        fetchShipmentCount();
    }, []);

    return (
        <div>
            <h1>This is the dashboard</h1>
            <h2>Number of Shipments: {shipmentCount}</h2>
            <BarChart />
            <PieChart />
            <LineChart />
        </div>
    );
}


