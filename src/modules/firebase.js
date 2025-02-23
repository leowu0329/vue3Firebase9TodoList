import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDr_rF1Cp3WB876hvP8VZoRN36vzfjbJzA',
  authDomain: 'muso-ninjas-57aea.firebaseapp.com',
  databaseURL: 'https://muso-ninjas-57aea-default-rtdb.firebaseio.com',
  projectId: 'muso-ninjas-57aea',
  storageBucket: 'muso-ninjas-57aea.appspot.com',
  messagingSenderId: '258361771721',
  appId: '1:258361771721:web:b88f027a2f91274a366f18',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
