import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyABW-8ANzP30y_20I3URKysVcCdrW-qklA",
    authDomain: "elective-management-system.firebaseapp.com",
    databaseURL: "https://elective-management-system.firebaseio.com",
    projectId: "elective-management-system",
    storageBucket: "elective-management-system.appspot.com",
    messagingSenderId: "353824148929",
    appId: "1:353824148929:web:e4610978b0452833a9b340",
    measurementId: "G-B16KBNM6JH"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;