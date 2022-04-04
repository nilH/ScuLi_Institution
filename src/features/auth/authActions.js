import {
  USER_INIT,
  INIT_PROFILE,
  LOGIN_USER,
  LOGOUT_USER,
  CHECK_CRED,
  SET_INSTI,
} from "./authConstants";
import firebase from "firebase/app";
import {
  dataFromSnapshot,
  getUserProfileDocRef,
} from "../../app/firestore/firestoreService";
import {signOutFirebase} from "../../app/firestore/firebaseService";

export function checkCred() {
  return {
    type: CHECK_CRED,
    payload: null,
  };
}

export function loginUser() {
  return {
    type: LOGIN_USER,
  };
}

export function profileInit(profileData) {
  return {
    type: INIT_PROFILE,
    payload: profileData,
  };
}

export function institutionInit(institution) {
  return {
    type: SET_INSTI,
    payload: institution,
  };
}

export function userInitialized() {
  return {
    type: USER_INIT,
    payload: null,
  };
}

export function logoutUser() {
  signOutFirebase();
  sessionStorage.removeItem("login");
  return {
    type: LOGOUT_USER,
  };
}

export function listenAuthState() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user && user.uid && user.email && user.displayName) {
        const profileRef = getUserProfileDocRef(user.uid);
        profileRef.onSnapshot((snapshot) => {
          if (snapshot && snapshot.exists) {
            const profile = dataFromSnapshot(snapshot);
            dispatch(profileInit(profile));
            dispatch(loginUser());
          }
        });
      }
      if (!user) {

      }
    });
  };
}

export function setAuthPersistence(val) {
  if (["local", "session", "none"].includes(val)) {
    firebase
      .auth()
      .setPersistence(val)
      .then(() => console.log("  Set Persistence to: " + val))
      .catch((err) => console.log(err));
  }
}
