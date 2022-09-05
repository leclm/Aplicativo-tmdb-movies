import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyBfNNPujFyQmH_iOGHS098sI6nPv9hQ44E",
    authDomain: "trabalhomobile-2b17f.firebaseapp.com",
    projectId: "trabalhomobile-2b17f",
    storageBucket: "trabalhomobile-2b17f.appspot.com",
    messagingSenderId: "619346254062",
    appId: "1:619346254062:web:7f7f47ce5ddb66b5d87bff"
  };

if(!firebase.apps.length){
  //Abrir minha conexao
  firebase.initializeApp(firebaseConfig);
}

export default firebase;