import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCLCcl3v6e5-KgI2nTS-RRinfbF_Rl3s4A',
  authDomain: 'hybrid-scheduler.firebaseapp.com',
  projectId: 'hybrid-scheduler',
  storageBucket: 'hybrid-scheduler.appspot.com',
  messagingSenderId: '944779206123',
  appId: '1:944779206123:web:1d0e3ce18d702f4a4a4dae',
  measurementId: 'G-1P6MSTHJ3T',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
