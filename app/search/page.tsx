'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

type Shipment = {
  shipment_id: number;
  carrier: string;
  destination: string;
  status: string;
  volume: number;
  arrival_date: string;
};

const CARRIERS = ['FEDEX', 'DHL', 'USPS', 'UPS', 'AMAZON'];
const DESTINATIONS = ['GUY', 'SVG', 'SLU', 'BIM', 'DOM', 'GRD', 'SKN', 'ANU', 'SXM', 'FSXM'];
const STATUSES = ['received', 'intransit', 'delivered'];
const ITEMS_PER_PAGE = 10;

const SearchPage = () => {
  const [carrier, setCarrier] = useState('');
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState('');
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (carrier) params.append('carrier', carrier);
      if (destination) params.append('destination', destination);
      if (status) params.append('status', status);

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();
      setShipments(data.shipments || []);
      setCurrentPage(1); // Reset to first page on new query
    } catch (error) {
      console.error('Failed to fetch shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchShipments();
  };

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentShipments = shipments.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(shipments.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-6">
      <Navbar pageName="Search Shipments" />

      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-6 space-y-6 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold">Carrier</label>
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">All</option>
                {CARRIERS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">Destination</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">All</option>
                {DESTINATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <label key={s} className="inline-flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={status === s}
                      onChange={(e) => setStatus(e.target.value)}
                      className="accent-gray-800"
                    />
                    {s}
                  </label>
                ))}
                <label className="inline-flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="status"
                    value=""
                    checked={status === ''}
                    onChange={() => setStatus('')}
                    className="accent-gray-800"
                  />
                  All
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Search
          </button>
        </form>

        {loading ? (
          <p className="text-center text-sm text-gray-500">Loading...</p>
        ) : currentShipments.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No shipments found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-xl shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2 border-b">ID</th>
                    <th className="px-4 py-2 border-b">Carrier</th>
                    <th className="px-4 py-2 border-b">Destination</th>
                    <th className="px-4 py-2 border-b">Status</th>
                    <th className="px-4 py-2 border-b">Volume</th>
                    <th className="px-4 py-2 border-b">Arrival Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentShipments.map((s) => (
                    <tr key={s.shipment_id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{s.shipment_id}</td>
                      <td className="px-4 py-2 border-b">{s.carrier}</td>
                      <td className="px-4 py-2 border-b">{s.destination}</td>
                      <td className="px-4 py-2 border-b capitalize">{s.status}</td>
                      <td className="px-4 py-2 border-b">{s.volume.toLocaleString()}</td>
                      <td className="px-4 py-2 border-b">{s.arrival_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6 text-sm">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
