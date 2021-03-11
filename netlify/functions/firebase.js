const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {    
  apiKey: "AIzaSyDB8oa6_J3vs2TmB8Bryuaymo4LCStHxLk",
  authDomain: "kiei-451-a3489.firebaseapp.com",
  projectId: "kiei-451-a3489",
  storageBucket: "kiei-451-a3489.appspot.com",
  messagingSenderId: "405088608576",
  appId: "1:405088608576:web:756a8bf8cf98e676381aa5"} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase