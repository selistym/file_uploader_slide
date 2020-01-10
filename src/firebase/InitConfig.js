import firebase from 'firebase'
import 'firebase/storage'
// firebase configuration from our store 
const firebaseConfig = {
    apiKey: "AIzaSyCS-4NLwIRrhg6_w7nB65_577Yk58bjQac",
    authDomain: "images-1e832.firebaseapp.com",
    databaseURL: "https://images-1e832.firebaseio.com",
    projectId: "images-1e832",
    storageBucket: "images-1e832.appspot.com",
    messagingSenderId: "144466372736",
    appId: "1:144466372736:web:97df39a5c0006fa8365e65",
    measurementId: "G-WECEY6F89J"
};

const firebaseapp = firebase.initializeApp(firebaseConfig)
//firebaseapp.firestore().settings({ timestampsInSnapshots: true })
const firebaseStore = firebase.firestore()

const analytics = firebaseapp.analytics()

export { firebaseapp, firebaseStore, analytics }