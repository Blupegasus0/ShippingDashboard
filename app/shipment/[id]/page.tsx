'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface Shipment {
  shipment_id: number;
  customer_id: number;
  origin: string;
  destination: string;
  weight: number;
  volume: number;
  carrier: string;
  mode: string;
  status: string;
  arrival_date: string;
  departure_date?: string;
  delivered_date?: string;
}

export default function ShipmentPage() {
  const { id } = useParams();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const res = await fetch(`/api/shipment/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch shipment');
        setShipment(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, [id]);

  return (
    <div className="p-6">
      <Navbar pageName={`Shipment ${id}`} />
      <h1 className="text-2xl font-bold mb-4">Shipment Details</h1>

      {loading && <p>Loading shipment data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {shipment && (
        <div className="bg-white p-4 rounded shadow space-y-2">
          {Object.entries(shipment).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b py-1">
              <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
              <span>{value || '—'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
