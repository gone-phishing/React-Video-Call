import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDhWdax8wkWGHHA8apeVWhi6wm2e6jaoZ8",
    authDomain: "flinkseed-web.firebaseapp.com",
    databaseURL: "https://flinkseed-web.firebaseio.com",
    projectId: "flinkseed-web",
    storageBucket: "flinkseed-web.appspot.com",
    messagingSenderId: "227536036755"
};
export default firebase.initializeApp(config);