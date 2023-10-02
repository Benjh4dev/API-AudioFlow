import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtJ_S_BztvzCx7lM8E8Nc5VrsgtBXnGgU",
  authDomain: "audioflow-8f509.firebaseapp.com",
  projectId: "audioflow-8f509",
  storageBucket: "audioflow-8f509.appspot.com",
  messagingSenderId: "384924534660",
  appId: "1:384924534660:web:8a1a9108ee92bfd88fffd1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;