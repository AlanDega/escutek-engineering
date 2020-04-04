import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    projectId: "quanium-stream",
    storageBucket: "quanium-stream.appspot.com",
    apiKey: "AIzaSyD4LHXGjlrJ8xU1MXRy6ip3elgqvafO8wY"
  })
  .firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
