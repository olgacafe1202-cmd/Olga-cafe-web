'use client';

import { useState } from 'react';
import { User } from 'firebase/auth';
import MenuManager from './MenuManager';
import OrderList from './OrderList';
import BookingList from './BookingList';
import GalleryManager from './GalleryManager';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type Tab = 'orders' | 'bookings' | 'menu' | 'gallery';

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('orders');

  const tabs = [
    { id: 'orders' as Tab, label: '🛒 Pesanan', description: 'Lihat pesanan masuk' },
    { id: 'bookings' as Tab, label: '📅 Booking', description: 'Lihat reservasi' },
    { id: 'menu' as Tab, label: '🍽️ Menu', description: 'Kelola menu & harga' },
    { id: 'gallery' as Tab, label: '📸 Galeri', description: 'Kelola foto' },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gold-gradient">🛠️ Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Logged in as {user.email}</p>
          </div>
          <button onClick={onLogout} className="btn-gold text-sm">
            🚪 Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#D4AF37] text-[#1A1A1A]'
                  : 'bg-[#2D2D2D] text-gray-300 hover:bg-[#3D3D3D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card p-6">
          {activeTab === 'orders' && <OrderList />}
          {activeTab === 'bookings' && <BookingList />}
          {activeTab === 'menu' && <MenuManager />}
          {activeTab === 'gallery' && <GalleryManager />}
        </div>
      </div>
    </div>
  );
}
