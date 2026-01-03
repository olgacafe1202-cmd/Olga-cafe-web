# Cafe Olga Website

Website profil dan sistem booking untuk Cafe Olga.

## Fitur
- Homepage dengan hero section dan galeri
- Katalog menu lengkap dengan kategori
- Keranjang belanja + order via WhatsApp
- Booking meja dengan pilih tanggal/jam
- **Admin Dashboard** untuk kelola menu, booking, dan galeri
- Integrasi Firebase (Firestore, Auth, Storage)
- Responsive design (mobile-friendly)

## Setup

### 1. Install Dependencies
```bash
cd cafe-olga
npm install
```

### 2. Setup Firebase
1. Buka [Firebase Console](https://console.firebase.google.com)
2. Pilih project `web-olga-caffe`

#### Aktifkan Firestore:
- Build → Firestore Database → Create database
- Pilih "Start in test mode" untuk development

#### Aktifkan Authentication:
- Build → Authentication → Get started
- Sign-in method → Email/Password → Enable
- Users → Add user → Masukkan email & password admin

#### Aktifkan Storage:
- Build → Storage → Get started
- Pilih "Start in test mode"

### 3. Buat Akun Admin
Di Firebase Console → Authentication → Users → Add user:
- Email: `admin@cafeolga.com` (atau email lain)
- Password: (buat password yang kuat)

### 4. Jalankan Development Server
```bash
npm run dev
```
- Website: http://localhost:3000
- Admin: http://localhost:3000/admin

## Deploy ke Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy
```

## Struktur Folder
```
cafe-olga/
├── src/
│   ├── app/
│   │   ├── admin/     # Admin dashboard
│   │   ├── menu/      # Halaman menu
│   │   ├── booking/   # Halaman booking
│   │   └── tentang/   # Halaman tentang
│   ├── components/
│   │   └── admin/     # Komponen admin
│   ├── hooks/         # Custom hooks
│   ├── data/          # Data statis
│   └── lib/           # Firebase config
├── public/images/     # Gambar website
└── firebase.json
```

## Admin Dashboard
Akses: `/admin`

Fitur:
- 🍽️ **Menu**: Tambah, edit, hapus menu + upload foto
- 📅 **Booking**: Lihat & konfirmasi reservasi
- 📸 **Galeri**: Upload & hapus foto galeri

## Kontak
- WhatsApp: 085274560663
- Alamat: Jl. Jendral Sudirman, Samping Pecel Lele Barokah
