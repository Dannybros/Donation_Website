import firebase from 'firebase/app';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAS01bFSGW--5z2GPDwgMl0ErWYum_JmEA",
    authDomain: "donationimagebucket.firebaseapp.com",
    projectId: "donationimagebucket",
    storageBucket: "donationimagebucket.appspot.com",
    messagingSenderId: "731808584661",
    appId: "1:731808584661:web:6230e56b768edd2485a35c",
    measurementId: "G-YJFERKNDWD"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export {storage, firebase as default};