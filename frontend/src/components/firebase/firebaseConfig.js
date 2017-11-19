import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD2iNNuLK9ZeZ5qxzlQ5K2LvUFDp4NWvOo",
    authDomain: "facebookapp-c9258.firebaseapp.com",
    databaseURL: "https://facebookapp-c9258.firebaseio.com",
    projectId: "facebookapp-c9258",
    storageBucket: "facebookapp-c9258.appspot.com",
    messagingSenderId: "841018303091"
  };
  firebase.initializeApp(config);


export const firebaseStorage =  firebase.storage();
