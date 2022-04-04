import firebase from "./config/firebase";
const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot || !snapshot.exists) {
    return undefined;
  }
  const data = snapshot.data();
  for (const prop in data) {
    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }
  return {
    ...data,
    id: snapshot.id,
  };
}

export function fetchFeedbackFromFirestore(
  filter,
  institutionId,
  limit,
  lastDocSnapshot = null
) {
  let feedbackRef = db
    .collection("feedback")
    .where("institutionId", "==", institutionId)
    .orderBy("date")
    .startAfter(lastDocSnapshot)
    .limit(limit);

  switch (filter) {
    case "report":
      return feedbackRef.where("type", "==", "Incident");
    case "feedback":
      return feedbackRef.where("type", "==", "Feedback");
    case "bug":
      return feedbackRef.where("type", "==", "Bug");
    default:
      return feedbackRef;
  }
}

export function setUserProfileData(user, isAdmin = true) {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function getInstitutionByEmployee(email) {
  return db
    .collection("institutions")
    .where("domain", "==", email.split("@")[1])
    .where("verifiedAdministrators", "array-contains", email);
}

// update admin profile data
export function setAdminProfileData(user) {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      isAdministrator: true,
    });
}
export function addInstitutionToAdmin(adminId, instId) {
  const batch = db.batch();
  const profileRef = db.collection("users").doc(adminId);
  batch.update(profileRef, { institution: instId });
  const instRef = db.collection("institutions").doc(instId);
  batch.update(instRef, {
    approvedAdmins: firebase.firestore.FieldValue.arrayUnion(adminId),
  });
  return batch.commit();
}

export function getAdminProfile(userId) {
  return db.collection("users").doc(userId);
}

export function updateAdminPhotoURL(newURL) {
  const user = firebase.auth().currentUser;
  return db.collection("users").doc(user.uid).update({ photoURL: newURL });
}

export function updateInstitutionFirestore(institutionId, item) {
  return db.collection("institutions").doc(institutionId).update(item);
}

export function updateInstitutionLogo(instId, fileURL) {
  return db.collection("institutions").doc(instId).update({
    photoURL: fileURL,
  });
}

// export function getFeedbackListenerQuery(institutionId) {
//   return db
//     .collection('feedback')
//     .where('institutionId', '==', institutionId)
//     .where('type', '==', 'Feedback')
//     .orderBy('time');
// }

export function getTerm(termID) {
  return db.collection("terms").doc(termID);
}

export function getTerms(termIDs) {
  return db
    .collection("terms")
    .where(firebase.firestore.FieldPath.documentId(), "in", termIDs);
}

export function getCourse(courseID) {
  return db.collection("courses").doc(courseID);
}
export function getCourses(courseIDs) {
  return db
    .collection("courses_test")
    .where(firebase.firestore.FieldPath.documentId(), "in", courseIDs);
}

export function getCoursesByName(names, institutionID) {
  return db
    .collection("courses_test")
    .where("institutionId", "==", institutionID)
    .where("name", "in", names);
}

export function addCourse(course) {
  return db.collection("courses_test").add(course);
}

export async function addCourses(courses) {
  const batchArray = [];
  batchArray.push(db.batch());
  var opCounter = 0;
  var btIndex = 0;
  courses.forEach((course) => {
    if (opCounter === 498) {
      opCounter = 0;
      btIndex += 1;
      batchArray.push(db.batch());
    }
    opCounter += 1;
    const docRef = db.collection("courses_test").doc();
    batchArray[btIndex].set(docRef, course);
  });
  batchArray.forEach(async (batch) => await batch.commit());
  return;
}

export function updateTerm(termID, term) {
  return db.collection("terms").doc(termID).update(term);
}

export function getFeedbacksByInstitution(institutionID) {
  return db
    .collection("feedback_test")
    .where("institutionId", "==", institutionID)
    .where("status", "==", 0);
}

export function updateFeedback(feedbackID, feedback) {
  return db.collection("feedback_test").doc(feedbackID).update(feedback);
}


export function getInstitutionDocRef(instId) {
  return db.collection("institutions").doc(instId);
}

export function getUserProfileDocRef(userId) {
  return db.collection("users").doc(userId);
}

export function getUsersByEmail(email){
  return db.collection("users").where("email","==",email);
}

export function getUserByUid(uid) {
  return db.collection("users").doc(uid);
}

export function getTutorAppDocRef(appId) {
  return db.collection("tutorapps").doc(appId);
}

export function getIncidentDocRef(incidentId) {
  return db.collection("incident_test").doc(incidentId);
}

export function getIncidentsByInstitution(institutionId) {
  return db
    .collection("incident_test")
    .where("institutionId", "==", institutionId)
    .where("status", "==", 0);
}

export function updateTutorappFirestore(appId, updates) {
  return db.collection("tutorapp_test").doc(appId).update(updates);
}

export function updateIncidentFirestore(incidentId, updates) {
  return db.collection("incident_test").doc(incidentId).update(updates);
}

// querys + lists
export function fetchTutorAppsByIdQuery(
  {
    idType, // institutionId, departmentId, courseId
    boolOp, // ==  != < <= => > array-contains  array-contains-any    in   not-in
    idValue,
  },
  status = -1, // 0 pending    1 accepted    2 rejected
  lastDocSnapshot = null,
  limit = 25
) {
  const validIdTypes = [
    "institutionId",
    "departmentId", // TODO: DATE-TIME RANGE
    "courseId",
    "userId",
  ];
  const validBoolOps = [
    "<",
    "<=",
    ">=",
    ">",
    "==",
    "!=",
    "array-contains",
    "array-contains-any",
    "in",
    "not-in",
  ];
  if (
    !validIdTypes.includes(idType) ||
    !validBoolOps.includes(boolOp) ||
    idValue < -1
  ) {
    return Promise.reject({
      code: "invalid-args",
      message: "The value you provided is invalid",
    });
  }
  const tutorappsQueryRef = db
    .collection("application")
    .where(idType, boolOp, idValue)
    .orderBy("time")
    .startAfter(lastDocSnapshot)
    .limit(limit);

  switch (status) {
    case 0:
    case "pending":
      return tutorappsQueryRef.where("status", "<=", 1);
    case 1:
    case "accepted":
      return tutorappsQueryRef.where("status", "<=", 2);
    case 2:
    case "rejected":
      return tutorappsQueryRef.where("status", "<=", 3);
    default:
      return tutorappsQueryRef;
  }
}

export function fetchInstitutionTutorApps(
  filter,
  institutionId,
  limit = 25,
) {
  let tutorappsQueryRef = db
    .collection("tutorapp_test")
    .where("institutionId", "==", institutionId)
    .limit(limit);

  switch (filter) {
    case 0:
    case "pending":
      return tutorappsQueryRef.where("status", "==", 0);
    case 1:
    case "accepted":
      return tutorappsQueryRef.where("status", "==", 1);
    case 2:
    case "rejected":
      return tutorappsQueryRef.where("status", "==", 2);
    default:
      return tutorappsQueryRef;
  }
}
export async function addUserToCourse(courseId,userId) {
  let courseRef = db.collection('courses').doc(courseId);
  return await courseRef.set(
    {
      users: firebase.firestore.FieldValue.arrayUnion(userId),
    },
    { merge: true }
  );
}
export async function updateUserProfile(patch,userId) {
  try {
    return await db.collection('users').doc(userId).update(patch);
  } catch (error) {
    throw error;
  }
}

export function fetchCourseTutorApps(instId, courseId, status = 0) {}

export function fetchUserTutorApps() {}
