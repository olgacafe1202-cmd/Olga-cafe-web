import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDAT_cqWSyi3OOkuI9YlW9zUoAwDQDq3-E",
  authDomain: "web-olga-caffe.firebaseapp.com",
  projectId: "web-olga-caffe",
  storageBucket: "web-olga-caffe.firebasestorage.app",
  messagingSenderId: "687202526396",
  appId: "1:687202526396:web:1c5876efc6e66879669cb9",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
