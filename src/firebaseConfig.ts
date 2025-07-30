// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC193Px-r8neCsa9g2WD8QkPJiDkiuUq-g",
  authDomain: "portfolio-549c8.firebaseapp.com",
  projectId: "portfolio-549c8",
  storageBucket: "portfolio-549c8.firebasestorage.app",
  messagingSenderId: "353560951885",
  appId: "1:353560951885:web:90fa7c994c00ea7a053004",
  measurementId: "G-Y8VK5JHN37"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
