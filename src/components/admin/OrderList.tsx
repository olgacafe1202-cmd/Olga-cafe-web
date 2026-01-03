'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: { seconds: number };
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Try with orderBy first, fallback to simple query if index not ready
      let querySnapshot;
      try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        querySnapshot = await getDocs(q);
      } catch {
        // Fallback without ordering if index doesn't exist
        querySnapshot = await getDocs(collection(db, 'orders'));
      }
      const items: Order[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Order);
      });
      // Sort manually if needed
      items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setOrders(items);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status });
      await fetchOrders();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal update status');
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 rounded text-xs">⏳ Pending</span>;
      case 'confirmed':
        return <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs">✅ Dikonfirmasi</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs">🎉 Selesai</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-900/50 text-red-300 rounded text-xs">❌ Dibatalkan</span>;
    }
  };

  const formatDate = (timestamp: { seconds: number }) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">⏳ Loading orders...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#D4AF37]">🛒 Daftar Pesanan</h2>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((f) => (
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

      {filteredOrders.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>Belum ada pesanan.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-[#2D2D2D] p-4 rounded-lg">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-white">{order.customerName}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-gray-400 text-sm">📞 {order.customerPhone}</p>
                  <p className="text-gray-500 text-xs">🕐 {formatDate(order.createdAt)}</p>
                  {order.notes && (
                    <p className="text-gray-500 text-sm mt-1">📝 {order.notes}</p>
                  )}
                  
                  {/* Order Items */}
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-gray-400 text-xs mb-2">Pesanan:</p>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.name} x{item.quantity}</span>
                        <span className="text-[#D4AF37]">Rp {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm mt-2 pt-2 border-t border-gray-700">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-[#D4AF37] font-bold">Rp {order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 min-w-[120px]">
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(order.id, 'confirmed')}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-500"
                      >
                        ✅ Konfirmasi
                      </button>
                      <button
                        onClick={() => updateStatus(order.id, 'cancelled')}
                        className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-500"
                      >
                        ❌ Batalkan
                      </button>
                    </>
                  )}
                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(order.id, 'completed')}
                      className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-500"
                    >
                      🎉 Selesai
                    </button>
                  )}
                  <a
                    href={`https://wa.me/62${order.customerPhone.replace(/^0/, '')}?text=Halo ${order.customerName}, pesanan Anda di Cafe Olga sudah kami terima. Total: Rp ${order.total.toLocaleString()}. Terima kasih!`}
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
