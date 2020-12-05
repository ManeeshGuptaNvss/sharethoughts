import 'firebase/firestore'
import firebase from  'firebase/app'
import 'firebase/auth'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyClrmLL8Wg334yIyIplTO0UERoRrDYwEVU",
    authDomain: "app-sharethoughts-demo.firebaseapp.com",
    databaseURL: "https://app-sharethoughts-demo.firebaseio.com",
    projectId: "app-sharethoughts-demo",
    storageBucket: "app-sharethoughts-demo.appspot.com",
    messagingSenderId: "947615113067",
    appId: "1:947615113067:web:5d426024e8dcc463aa762e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default{
    firestore: firebase.firestore(),
    auth:firebase.auth()


  }