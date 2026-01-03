const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDAT_cqWSyi3OOkuI9YlW9zUoAwDQDq3-E",
  authDomain: "web-olga-caffe.firebaseapp.com",
  projectId: "web-olga-caffe",
  storageBucket: "web-olga-caffe.firebasestorage.app",
  messagingSenderId: "687202526396",
  appId: "1:687202526396:web:1c5876efc6e66879669cb9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const menuItems = [
  // Signature Coffee
  { name: 'Americano', price: 10000, category: 'coffee', isHot: true, isCold: true },
  { name: 'Coffee Latte', price: 12000, category: 'coffee', isHot: true, isCold: true },
  { name: 'Coffee Gula Aren', price: 10000, category: 'coffee', isHot: true, isCold: true, isBestSeller: true },
  { name: 'Oreo Latte', price: 12000, category: 'coffee', isHot: true, isCold: true },

  // Es Teler Sultan Creamy
  { name: 'Es Teler Creamy Original', price: 10000, category: 'es-teler' },
  { name: 'Es Teler Creamy + Toping', price: 13000, category: 'es-teler', isBestSeller: true, description: 'Topping: Keju +3K, Es Krim +3K, Durian +5K' },
  { name: 'Es Teler Creamy Nasdem', price: 12000, category: 'es-teler' },

  // Nasi Goreng
  { name: 'Nasi Goreng Telur, Sosis, Naget', price: 20000, category: 'nasi-goreng' },
  { name: 'Nasi Goreng Petai', price: 17000, category: 'nasi-goreng' },
  { name: 'Nasi Goreng Kampung', price: 20000, category: 'nasi-goreng' },
  { name: 'Nasi Goreng Seafood', price: 25000, category: 'nasi-goreng' },
  { name: 'Nasi Goreng Telor', price: 15000, category: 'nasi-goreng' },
  { name: 'Nasi Goreng Sosis', price: 15000, category: 'nasi-goreng' },
  { name: 'Nasi Goreng Naget', price: 15000, category: 'nasi-goreng' },

  // Mie Goreng/Rebus
  { name: 'Mie Goreng/Rebus Indomie Toping Telur', price: 13000, category: 'mie' },
  { name: 'Mie Goreng/Rebus Indomie Toping Naget', price: 15000, category: 'mie' },
  { name: 'Mie Goreng/Rebus Indomie Toping Sosis', price: 15000, category: 'mie' },
  { name: 'Mie Goreng/Rebus Indomie Spesial', price: 18000, category: 'mie' },
  { name: 'Mie Nyemek', price: 15000, category: 'mie' },

  // Mie Padeh
  { name: 'Mie Padeh Telur', price: 15000, category: 'mie-padeh', isBestSeller: true },
  { name: 'Mie Padeh Sosis', price: 15000, category: 'mie-padeh' },
  { name: 'Mie Padeh Naget', price: 15000, category: 'mie-padeh' },
  { name: 'Mie Padeh Bakso', price: 17000, category: 'mie-padeh' },
  { name: 'Mie Padeh Spesial', price: 20000, category: 'mie-padeh' },
  { name: 'Mie Padeh Mangkok', price: 18000, category: 'mie-padeh', isBestSeller: true },

  // Lauk
  { name: 'Kwetiau Spesial', price: 17000, category: 'lauk' },
  { name: 'Mie Hun Goreng', price: 17000, category: 'lauk' },
  { name: 'Ayam Geprek', price: 17000, category: 'lauk', isBestSeller: true },
  { name: 'Ayam Saus Pedas', price: 20000, category: 'lauk' },
  { name: 'Ayam Geprek Saus Hijau', price: 20000, category: 'lauk' },
  { name: 'Nila Saus Padang', price: 25000, category: 'lauk' },

  // Cemilan
  { name: 'Sosis', price: 10000, category: 'cemilan' },
  { name: 'Naget', price: 10000, category: 'cemilan' },
  { name: 'Risol', price: 10000, category: 'cemilan' },
  { name: 'Kentang', price: 10000, category: 'cemilan' },
  { name: 'Cireng Salju', price: 10000, category: 'cemilan' },
  { name: 'Jamur Crispy', price: 12000, category: 'cemilan' },
  { name: 'Empek-empek Palembang', price: 12000, category: 'cemilan' },
  { name: 'Ceker Mercon', price: 15000, category: 'cemilan' },

  // Minuman
  { name: 'Jus Jeruk', price: 10000, category: 'minuman', description: '+Float 4K' },
  { name: 'Jus Naga', price: 10000, category: 'minuman', description: '+Float 4K' },
  { name: 'Jus Melon', price: 10000, category: 'minuman', description: '+Float 4K' },
  { name: 'Jus Sirsak', price: 10000, category: 'minuman', description: '+Float 4K' },
  { name: 'Jus Jambu', price: 10000, category: 'minuman', description: '+Float 4K' },
  { name: 'Jus Terong Belanda', price: 10000, category: 'minuman', description: '+Float 4K' },
  { name: 'Jus Mangga', price: 12000, category: 'minuman', description: '+Float 4K' },
  { name: 'Jus Pokat', price: 12000, category: 'minuman', description: '+Float 4K' },
  { name: 'Taro', price: 12000, category: 'minuman' },
  { name: 'Milo', price: 12000, category: 'minuman' },
  { name: 'Coklat', price: 12000, category: 'minuman' },
  { name: 'Teh Tarik', price: 12000, category: 'minuman' },
  { name: 'Green Tea', price: 12000, category: 'minuman' },
  { name: 'Lemon Tea', price: 12000, category: 'minuman' },
  { name: 'Cappucino Oreo', price: 10000, category: 'minuman' },
  { name: 'Cappucino Cocochip', price: 10000, category: 'minuman' },
  { name: 'Coffee Latte Panas', price: 12000, category: 'minuman' },
  { name: 'Coffee Latte Float', price: 16000, category: 'minuman' },
  { name: 'Fanta Susu', price: 12000, category: 'minuman', description: '+Float 4K' },
  { name: 'Sirup Marjan Coco Pandan', price: 7000, category: 'minuman' },
  { name: 'Sirup Marjan Melon', price: 7000, category: 'minuman' },
  { name: 'Sirup Orange', price: 7000, category: 'minuman' },
  { name: 'Jasuke', price: 12000, category: 'minuman' },
  { name: 'Sop Buah', price: 12000, category: 'minuman' },
  { name: 'Timun Serut', price: 12000, category: 'minuman' },
  { name: 'Es Teler', price: 15000, category: 'minuman' },
  { name: 'Salad Buah', price: 15000, category: 'minuman' },
  { name: 'Kopi Hitam', price: 7000, category: 'minuman' },
  { name: 'Teh Es', price: 7000, category: 'minuman' },
  { name: 'Teh Telur', price: 12000, category: 'minuman' },
  { name: 'Bandrek Telur', price: 12000, category: 'minuman' },
  { name: 'Telur ½ Matang', price: 12000, category: 'minuman' },

  // New Menu
  { name: 'Sup Kerang', price: 20000, category: 'new-menu', description: 'Lengkap dengan Sambal Nanas - Halal' },
];

async function seedMenu() {
  console.log('🚀 Mulai import menu ke Firestore...\n');
  
  let count = 0;
  for (const item of menuItems) {
    try {
      await addDoc(collection(db, 'menu'), {
        ...item,
        createdAt: new Date(),
      });
      count++;
      console.log(`✅ ${count}. ${item.name}`);
    } catch (error) {
      console.error(`❌ Gagal: ${item.name}`, error.message);
    }
  }
  
  console.log(`\n🎉 Selesai! ${count} menu berhasil diimport.`);
  process.exit(0);
}

seedMenu();
