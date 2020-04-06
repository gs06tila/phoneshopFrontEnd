import * as firebase from "firebase";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyBnMZzJv6G4Buc5PiqE-Yn84Y3xckELjf0",
  authDomain: "phonevueshop.firebaseapp.com",
  databaseURL: "https://phonevueshop.firebaseio.com",
  projectId: "phonevueshop",
  storageBucket: "phonevueshop.appspot.com"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
