// import firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_U1QeE3ScOztsTP26YW7uzMghlfDTPLY',
  authDomain: 'fir-crud-f14ce.firebaseapp.com',
  databaseURL: 'https://fir-crud-f14ce-default-rtdb.firebaseio.com',
  projectId: 'fir-crud-f14ce',
  storageBucket: 'fir-crud-f14ce.appspot.com',
  messagingSenderId: '965724833585',
  appId: '1:965724833585:web:eb5c7c2490cc5e94739210',
  measurementId: 'G-39T7TDE2PT',
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
