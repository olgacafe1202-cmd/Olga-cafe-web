'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { menuItems as staticMenuItems, MenuItem } from '@/data/menu';

export function useMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(staticMenuItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'menu'));
        if (!querySnapshot.empty) {
          const items: MenuItem[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            items.push({
              id: doc.id,
              name: data.name,
              price: data.price,
              category: data.category,
              description: data.description,
              image: data.image,
              isBestSeller: data.isBestSeller,
              isHot: data.isHot,
              isCold: data.isCold,
            });
          });
          setMenuItems(items);
        }
        // If Firestore is empty, keep using static data
      } catch (error) {
        console.error('Error fetching menu from Firestore:', error);
        // Keep using static data on error
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { menuItems, loading };
}
