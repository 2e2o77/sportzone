import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAovECnuXuJtFVTxN8vhqeuxQI2WIPzgsc",
  authDomain: "sportzone-c8b53.firebaseapp.com",
  projectId: "sportzone-c8b53",
  storageBucket: "sportzone-c8b53.firebasestorage.app",
  messagingSenderId: "271924473162",
  appId: "1:271924473162:web:1fbd9f3d11701f463d65b3"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)