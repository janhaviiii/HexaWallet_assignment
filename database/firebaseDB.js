import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: "AIzaSyCH2VBHNwtflxpRxmOL4wtfhG5uAf-5KoQ",
  authDomain: "hexawallet-bfbba.firebaseapp.com",
  projectId: "hexawallet-bfbba",
  storageBucket: "hexawallet-bfbba.appspot.com",
  messagingSenderId: "885970658990",
  appId: "1:885970658990:web:5ad8fd121ff851dabeaf3f",
  measurementId: "G-N1YBJNL870"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(db);
