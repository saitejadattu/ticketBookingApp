
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp } from 'firebase/app';
import {getDatabase} from 'firebase/database';
function StartFirebase()
{
    const firebaseConfig = {
        apiKey: "AIzaSyA_TIIJSL9V8rWsQT8gaUKpTnCS7bt2bx4",
        authDomain: "ticket-booking-system-f2d92.firebaseapp.com",
        databaseURL: "https://ticket-booking-system-f2d92-default-rtdb.firebaseio.com",
        projectId: "ticket-booking-system-f2d92",
        storageBucket: "ticket-booking-system-f2d92.appspot.com",
        messagingSenderId: "237611024688",
        appId: "1:237611024688:web:2c10b7c6d66d10921f48f5",
        measurementId: "G-LZN87P886F"
      };
      const app = initializeApp(firebaseConfig);
      return getDatabase(app);
}

export default StartFirebase;


// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // export const dataRef =firebase.database();
// // export default firebase;
// const db=firebase.firestore();
// const auth=firebase.auth();

// export default db;
// export {auth};