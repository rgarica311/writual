import * as firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/auth';
//console.log(`firebaseConfig api key ${firebaseConfig.apiKey}`)
const firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseSetup = {
    firebaseApp: firebaseApp,
    firebaseAppAuth: firebaseApp.auth(),
    providers: {
        googleProvider: new firebase.auth.GoogleAuthProvider(),
    }
}

export default firebaseSetup