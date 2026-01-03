'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Booking {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: { seconds: number };
}

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Try with orderBy first, fallback to simple query if index not ready
      let querySnapshot;
      try {
        const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
        querySnapshot = await getDocs(q);
      } catch {
        // Fallback without ordering if index doesn't exist
        querySnapshot = await getDocs(collection(db, 'bookings'));
      }
      const items: Booking[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Booking);
      });
      // Sort manually if needed
      items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setBookings(items);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Booking['status']) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
      await fetchBookings();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal update status');
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 rounded text-xs">⏳ Pending</span>;
      case 'confirmed':
        return <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs">✅ Confirmed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-900/50 text-red-300 rounded text-xs">❌ Cancelled</span>;
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">⏳ Loading bookings...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#D4AF37]">📅 Daftar Booking</h2>
        <div className="flex gap-2">
          {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-xs ${
                filter === f
                  ? 'bg-[#D4AF37] text-[#1A1A1A]'
                  : 'bg-[#2D2D2D] text-gray-300'
              }`}
            >
              {f === 'all' ? 'Semua' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>Belum ada booking.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-[#2D2D2D] p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{booking.name}</span>
                    {getStatusBadge(booking.status)}
                  </div>
                  <p className="text-gray-400 text-sm">📞 {booking.phone}</p>
                  <p className="text-gray-400 text-sm">
                    📅 {booking.date} • 🕐 {booking.time} WIB
                  </p>
                  <p className="text-gray-400 text-sm">
                    👥 {booking.guests} orang • 🪑 Meja {booking.tableNumber}
                  </p>
                  {booking.notes && (
                    <p className="text-gray-500 text-sm">📝 {booking.notes}</p>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-500"
                      >
                        ✅ Konfirmasi
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                        className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-500"
                      >
                        ❌ Batalkan
                      </button>
                    </>
                  )}
                  <a
                    href={`https://wa.me/62${booking.phone.replace(/^0/, '')}?text=Halo ${booking.name}, booking Anda di Cafe Olga untuk tanggal ${booking.date} jam ${booking.time} sudah dikonfirmasi. Terima kasih!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-green-700 text-white rounded text-xs hover:bg-green-600 text-center"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
