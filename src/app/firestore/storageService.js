import firebase from "./config/firebase";
import { updateInstitutionFirestore } from "./firestoreService";

export function uploadToFirebaseStorage(usecase, file, id = null) {
  const validUsecases = ["userprofile", "instlogo","instcover", "tutorapp"];
  if (!validUsecases.includes(usecase)) {
    return Promise.reject({
      code: "invalid-args",
      message: "Invalid command",
    });
  }
  let root = "";
  let path = "";
  let target = "";
  switch (usecase) {
    case "userprofile":
      root = "users";
      path = firebase.auth().currentUser.uid ?? null;
      target = "profile/img";
      break;
    case "instlogo":
      root = "institutions";
      path = id;
      target = "logo/img";
      break;
    case "instcover":
      root = "institutions";
      path = id;
      target = "cover/img";
      break;
    case "tutorapp":
      root = "application";
      path = id;
      target = "transcript/pdf";
      break;
    default:
      break;
  }
  if (!root || !path || !target) {
    return Promise.reject({ code: "invalid-args", message: "Invalid command" });
  }

  let metadata = {
    customMetadata: {
      usecase: usecase,
    },
  };

  return firebase
    .storage()
    .ref(`${root}/${path}/${target}`)
    .put(file, metadata)
    .then((uploadTaskSnapshot) => {
      console.log(
        "----------------------- storageService.js --------------------------"
      );
      const size = uploadTaskSnapshot.metadata.size;
      const mimeType = uploadTaskSnapshot.metadata.contentType;
      const timeCreated = uploadTaskSnapshot.metadata.timeCreated;
      console.log(`  size: ${size}`);
      console.log(`  mimeType: ${mimeType}`);
      console.log(
        `  timeCreated: ${timeCreated}    ${new Date(
          timeCreated
        )}    ${new Date(timeCreated).toLocaleString()}`
      );
      if (usecase === "instlogo") {
        uploadTaskSnapshot.ref.getDownloadURL().then((url) => {
          updateInstitutionFirestore(id, { logoURL: url }).then(() => {
            console.log("update logo success");
          });
          sessionStorage.setItem("logoURL", url);
        });
      }else if(usecase==="instcover"){
        uploadTaskSnapshot.ref.getDownloadURL().then((url) => {
          updateInstitutionFirestore(id, { coverPhotoURL: url }).then(() => {
            console.log("update cover photo success");
          });
          sessionStorage.setItem("coverPhoto", url);
        });
      }
    });
}

export function deleteFromFirebaseStorage(filename, targetId) {
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
  return photoRef.delete();
}

export async function loadPicture(institutionId) {
  const src = await firebase
    .storage()
    .ref(`institutions/${institutionId}/logo/img`)
    .getDownloadURL();
  return src;
}
