export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  isHot?: boolean;
  isCold?: boolean;
  isBestSeller?: boolean;
  toppings?: { name: string; price: number }[];
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
}

export const formatPriceShort = (price: number): string => {
  return `${price / 1000}K`;
};

export const categories: MenuCategory[] = [
  { id: 'coffee', name: 'Signature Coffee', icon: '☕' },
  { id: 'es-teler', name: 'Es Teler Sultan Creamy', icon: '🍹' },
  { id: 'nasi-goreng', name: 'Nasi Goreng', icon: '🍳' },
  { id: 'mie', name: 'Mie Goreng/Rebus', icon: '🍜' },
  { id: 'mie-padeh', name: 'Mie Padeh', icon: '🌶️' },
  { id: 'lauk', name: 'Lauk', icon: '🍗' },
  { id: 'cemilan', name: 'Cemilan', icon: '🍟' },
  { id: 'minuman', name: 'Minuman', icon: '🥤' },
  { id: 'new-menu', name: 'New Menu', icon: '✨' },
];

export const menuItems: MenuItem[] = [
  // Signature Coffee
  { id: 'americano', name: 'Americano', price: 10000, category: 'coffee', isHot: true, isCold: true },
  { id: 'coffee-latte', name: 'Coffee Latte', price: 12000, category: 'coffee', isHot: true, isCold: true },
  { id: 'coffee-gula-aren', name: 'Coffee Gula Aren', price: 10000, category: 'coffee', isHot: true, isCold: true, isBestSeller: true, image: '/images/menu/coffee-gula-aren.jpg' },
  { id: 'oreo-latte', name: 'Oreo Latte', price: 12000, category: 'coffee', isHot: true, isCold: true },

  // Es Teler Sultan Creamy
  { id: 'es-teler-original', name: 'Es Teler Creamy Original', price: 10000, category: 'es-teler' },
  { id: 'es-teler-toping', name: 'Es Teler Creamy + Toping', price: 13000, category: 'es-teler', isBestSeller: true, image: '/images/menu/es-teler-toping.jpg', toppings: [
    { name: 'Keju', price: 3000 },
    { name: 'Es Krim', price: 3000 },
    { name: 'Durian', price: 5000 },
  ]},
  { id: 'es-teler-nasdem', name: 'Es Teler Creamy Nasdem', price: 12000, category: 'es-teler' },

  // Nasi Goreng
  { id: 'nasgor-telur-sosis-naget', name: 'Nasi Goreng Telur, Sosis, Naget', price: 20000, category: 'nasi-goreng' },
  { id: 'nasgor-petai', name: 'Nasi Goreng Petai', price: 17000, category: 'nasi-goreng' },
  { id: 'nasgor-kampung', name: 'Nasi Goreng Kampung', price: 20000, category: 'nasi-goreng' },
  { id: 'nasgor-seafood', name: 'Nasi Goreng Seafood', price: 25000, category: 'nasi-goreng' },
  { id: 'nasgor-telor', name: 'Nasi Goreng Telor', price: 15000, category: 'nasi-goreng' },
  { id: 'nasgor-sosis', name: 'Nasi Goreng Sosis', price: 15000, category: 'nasi-goreng' },
  { id: 'nasgor-naget', name: 'Nasi Goreng Naget', price: 15000, category: 'nasi-goreng' },

  // Mie Goreng/Rebus
  { id: 'mie-indomie-telur', name: 'Mie Goreng/Rebus Indomie Toping Telur', price: 13000, category: 'mie' },
  { id: 'mie-indomie-naget', name: 'Mie Goreng/Rebus Indomie Toping Naget', price: 15000, category: 'mie' },
  { id: 'mie-indomie-sosis', name: 'Mie Goreng/Rebus Indomie Toping Sosis', price: 15000, category: 'mie' },
  { id: 'mie-indomie-spesial', name: 'Mie Goreng/Rebus Indomie Spesial', price: 18000, category: 'mie' },
  { id: 'mie-nyemek', name: 'Mie Nyemek', price: 15000, category: 'mie' },

  // Mie Padeh
  { id: 'mie-padeh-telur', name: 'Mie Padeh Telur', price: 15000, category: 'mie-padeh', isBestSeller: true, image: '/images/menu/mie-padeh-telur.jpg' },
  { id: 'mie-padeh-sosis', name: 'Mie Padeh Sosis', price: 15000, category: 'mie-padeh' },
  { id: 'mie-padeh-naget', name: 'Mie Padeh Naget', price: 15000, category: 'mie-padeh' },
  { id: 'mie-padeh-bakso', name: 'Mie Padeh Bakso', price: 17000, category: 'mie-padeh' },
  { id: 'mie-padeh-spesial', name: 'Mie Padeh Spesial', price: 20000, category: 'mie-padeh' },
  { id: 'mie-padeh-mangkok', name: 'Mie Padeh Mangkok', price: 18000, category: 'mie-padeh', isBestSeller: true, image: '/images/menu/mie-padeh-mangkok.jpg' },

  // Lauk
  { id: 'kwetiau-spesial', name: 'Kwetiau Spesial', price: 17000, category: 'lauk' },
  { id: 'mie-hun-goreng', name: 'Mie Hun Goreng', price: 17000, category: 'lauk' },
  { id: 'ayam-geprek', name: 'Ayam Geprek', price: 17000, category: 'lauk', isBestSeller: true, image: '/images/menu/ayam-geprek.jpg' },
  { id: 'ayam-saus-pedas', name: 'Ayam Saus Pedas', price: 20000, category: 'lauk' },
  { id: 'ayam-geprek-saus-hijau', name: 'Ayam Geprek Saus Hijau', price: 20000, category: 'lauk' },
  { id: 'nila-saus-padang', name: 'Nila Saus Padang', price: 25000, category: 'lauk' },

  // Cemilan
  { id: 'sosis', name: 'Sosis', price: 10000, category: 'cemilan' },
  { id: 'naget', name: 'Naget', price: 10000, category: 'cemilan' },
  { id: 'risol', name: 'Risol', price: 10000, category: 'cemilan' },
  { id: 'kentang', name: 'Kentang', price: 10000, category: 'cemilan' },
  { id: 'cireng-salju', name: 'Cireng Salju', price: 10000, category: 'cemilan' },
  { id: 'jamur-crispy', name: 'Jamur Crispy', price: 12000, category: 'cemilan' },
  { id: 'empek-empek', name: 'Empek-empek Palembang', price: 12000, category: 'cemilan' },
  { id: 'ceker-mercon', name: 'Ceker Mercon', price: 15000, category: 'cemilan' },

  // Minuman
  { id: 'jus-jeruk', name: 'Jus Jeruk', price: 10000, category: 'minuman', description: '+Float 4K' },
  { id: 'jus-naga', name: 'Jus Naga', price: 10000, category: 'minuman', description: '+Float 4K' },
  { id: 'jus-melon', name: 'Jus Melon', price: 10000, category: 'minuman', description: '+Float 4K' },
  { id: 'jus-sirsak', name: 'Jus Sirsak', price: 10000, category: 'minuman', description: '+Float 4K' },
  { id: 'jus-jambu', name: 'Jus Jambu', price: 10000, category: 'minuman', description: '+Float 4K' },
  { id: 'jus-terong-belanda', name: 'Jus Terong Belanda', price: 10000, category: 'minuman', description: '+Float 4K' },
  { id: 'jus-mangga', name: 'Jus Mangga', price: 12000, category: 'minuman', description: '+Float 4K' },
  { id: 'jus-pokat', name: 'Jus Pokat', price: 12000, category: 'minuman', description: '+Float 4K' },
  { id: 'taro', name: 'Taro', price: 12000, category: 'minuman' },
  { id: 'milo', name: 'Milo', price: 12000, category: 'minuman' },
  { id: 'coklat', name: 'Coklat', price: 12000, category: 'minuman' },
  { id: 'teh-tarik', name: 'Teh Tarik', price: 12000, category: 'minuman' },
  { id: 'green-tea', name: 'Green Tea', price: 12000, category: 'minuman' },
  { id: 'lemon-tea', name: 'Lemon Tea', price: 12000, category: 'minuman' },
  { id: 'cappucino-oreo', name: 'Cappucino Oreo', price: 10000, category: 'minuman' },
  { id: 'cappucino-cocochip', name: 'Cappucino Cocochip', price: 10000, category: 'minuman' },
  { id: 'coffee-latte-panas', name: 'Coffee Latte Panas', price: 12000, category: 'minuman' },
  { id: 'coffee-latte-float', name: 'Coffee Latte Float', price: 16000, category: 'minuman' },
  { id: 'fanta-susu', name: 'Fanta Susu', price: 12000, category: 'minuman', description: '+Float 4K' },
  { id: 'sirup-marjan-coco-pandan', name: 'Sirup Marjan Coco Pandan', price: 7000, category: 'minuman' },
  { id: 'sirup-marjan-melon', name: 'Sirup Marjan Melon', price: 7000, category: 'minuman' },
  { id: 'sirup-orange', name: 'Sirup Orange', price: 7000, category: 'minuman' },
  { id: 'jasuke', name: 'Jasuke', price: 12000, category: 'minuman' },
  { id: 'sop-buah', name: 'Sop Buah', price: 12000, category: 'minuman' },
  { id: 'timun-serut', name: 'Timun Serut', price: 12000, category: 'minuman' },
  { id: 'es-teler-minuman', name: 'Es Teler', price: 15000, category: 'minuman' },
  { id: 'salad-buah', name: 'Salad Buah', price: 15000, category: 'minuman' },
  { id: 'kopi-hitam', name: 'Kopi Hitam', price: 7000, category: 'minuman' },
  { id: 'teh-es', name: 'Teh Es', price: 7000, category: 'minuman' },
  { id: 'teh-telur', name: 'Teh Telur', price: 12000, category: 'minuman' },
  { id: 'bandrek-telur', name: 'Bandrek Telur', price: 12000, category: 'minuman' },
  { id: 'telur-setengah-matang', name: 'Telur ½ Matang', price: 12000, category: 'minuman' },

  // New Menu
  { id: 'sup-kerang', name: 'Sup Kerang', price: 20000, category: 'new-menu', description: 'Lengkap dengan Sambal Nanas - Halal' },
];
