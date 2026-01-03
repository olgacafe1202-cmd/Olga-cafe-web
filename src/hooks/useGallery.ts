'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isVisible?: boolean;
}

// Default static images
const staticImages: GalleryImage[] = [
  { id: 'static-1', url: '/images/PHOTO-2026-01-02-18-30-27.jpg', alt: 'Suasana Cafe Olga malam hari', isVisible: true },
  { id: 'static-2', url: '/images/PHOTO-2026-01-02-18-30-29.jpg', alt: 'Area outdoor dengan lampu string', isVisible: true },
  { id: 'static-3', url: '/images/PHOTO-2026-01-02-18-30-29 (1).jpg', alt: 'Tempat duduk nyaman', isVisible: true },
  { id: 'static-4', url: '/images/PHOTO-2026-01-02-18-30-30.jpg', alt: 'Suasana nongkrong', isVisible: true },
  { id: 'static-5', url: '/images/PHOTO-2026-01-02-18-30-30 (1).jpg', alt: 'Area cafe', isVisible: true },
  { id: 'static-6', url: '/images/PHOTO-2026-01-02-18-30-30 (2).jpg', alt: 'Pemandangan cafe', isVisible: true },
  { id: 'static-7', url: '/images/PHOTO-2026-01-02-18-30-31.jpg', alt: 'Suasana sore hari', isVisible: true },
  { id: 'static-8', url: '/images/PHOTO-2026-01-02-17-55-19.jpg', alt: 'Es Teler Creamy', isVisible: true },
];

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        const firestoreImages: GalleryImage[] = [];
        const firestoreUrls = new Set<string>();
        const firestoreIds = new Set<string>();
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          firestoreIds.add(doc.id);
          firestoreUrls.add(data.url);
          
          // Only include visible images
          if (data.isVisible !== false) {
            firestoreImages.push({
              id: doc.id,
              url: data.url,
              alt: data.alt,
              caption: data.caption,
              isVisible: true,
            });
          }
        });

        // Combine: Firestore images + static images not in Firestore
        const combinedImages: GalleryImage[] = [...firestoreImages];
        
        for (const staticImg of staticImages) {
          // Check if this static image has been saved to Firestore
          const existsInFirestore = firestoreIds.has(staticImg.id) || firestoreUrls.has(staticImg.url);
          
          if (!existsInFirestore) {
            // Static image not in Firestore, show it
            combinedImages.push(staticImg);
          }
        }

        setImages(combinedImages.length > 0 ? combinedImages : staticImages);
      } catch (error) {
        console.error('Error fetching gallery from Firestore:', error);
        // On error, show static images
        setImages(staticImages);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return { images, loading };
}
