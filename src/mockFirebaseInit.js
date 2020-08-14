import firebasemock from 'firebase-mock';
const mockauth = new firebasemock.MockAuthentication();
const mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path) => {
    return null;
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    return mockauth;
  },
  // use null if your code does not use FIRESTORE
  () => {
    return null;
  },
  // use null if your code does not use STORAGE
  () => {
    return null;
  },
  // use null if your code does not use MESSAGING
  () => {
    return null;
  }
);