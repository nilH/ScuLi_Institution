import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBwuuYn5qexDHf-QZ0LXztU_mYJXQP3cCI',
  authDomain: 'jetlink-dev.firebaseapp.com',
  projectId: 'jetlink-dev',
  storageBucket: 'jetlink-dev.appspot.com',
  messagingSenderId: '1038061766891',
  appId: '1:1038061766891:web:7f9829b930041ae79616ae',
  measurementId: 'G-8CDW6YTSPK',
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider().setCustomParameters(
  {
    prompt: 'select_account',
  }
);
export default firebase;
