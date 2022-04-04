import {
  setUserProfileData,
  getInstitutionByEmployee,
  dataFromSnapshot,
} from "./firestoreService";
import firebase from "./config/firebase";

export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map((e) =>
      Object.assign({}, e[1], { id: e[0] })
    );
  }
}

export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function socialLogin(selectedProvider, name) {
  let provider;
  if (selectedProvider === "facebook") {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  const usercred = await firebase.auth().signInWithPopup(provider);
  if (usercred?.additionalUserInfo?.isNewUser) {
    setUserProfileData(usercred.user);
  }
  if (usercred?.additionalUserInfo?.profile.email) {
    var snapshot = await getInstitutionByEmployee(
      usercred.additionalUserInfo.profile.email      
    ).get();
    if (snapshot.size !== 1) return Promise.reject("name or email not match");
    const institutions=[];
    snapshot.forEach((doc) => {
      institutions.push(dataFromSnapshot(doc));
    });

      return Promise.resolve({institution:institutions[0],user:{id:usercred.user.uid,displayName:usercred.user.displayName}});
  } else {
    return Promise.reject("name or email not match");
  }
}

export function checkAuth(){
  if(firebase.auth().currentUser){
    return true;
  }else{
    return false;
  }
}