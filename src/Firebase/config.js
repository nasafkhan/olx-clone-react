import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAV8leUcS1hKPjFMG3iL2qXJN7aQIlR9Pw",
    authDomain: "olx-clone-nsfdev2.firebaseapp.com",
    projectId: "olx-clone-nsfdev2",
    storageBucket: "olx-clone-nsfdev2.appspot.com",
    messagingSenderId: "194795769388",
    appId: "1:194795769388:web:98f68d74474fd9bd7a0b89",
    measurementId: "G-X3JF5GMBHR"
  };

 export default firebase.initializeApp(firebaseConfig)