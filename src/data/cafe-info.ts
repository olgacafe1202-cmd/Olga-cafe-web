export const cafeInfo = {
  name: 'Cafe Olga',
  tagline: 'Tempat Nongkrong Asik & Nyaman',
  description: 'Nikmati suasana outdoor yang cozy dengan lampu-lampu cantik, tanaman hijau, dan menu makanan & minuman yang lezat. Cocok untuk nongkrong bareng teman, keluarga, atau me-time.',
  address: 'Jl. Jendral Sudirman, Samping Pecel Lele Barokah',
  whatsapp: '085274560663',
  whatsappFormatted: '6285274560663',
  googleMapsUrl: 'https://maps.app.goo.gl/FJVz5q1ZgKynuesr9',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6789!2d101.1929!3d1.2029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTInMTAuNCJOIDEwMcKwMTEnMzQuNSJF!5e0!3m2!1sen!2sid!4v1234567890',
  operatingHours: {
    open: '11:00',
    close: '23:00',
    timezone: 'WIB',
  },
  tables: 10,
  socialMedia: {
    instagram: '',
    facebook: '',
  },
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatPriceShort = (price: number): string => {
  return `${price / 1000}K`;
};
