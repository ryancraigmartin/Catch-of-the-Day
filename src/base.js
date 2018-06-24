import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDRnuxPDmD7dW9iY0K73gX6FPxNPgWRdpU",
    authDomain: "catch-of-the-day-ryan-martin.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-ryan-martin.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;