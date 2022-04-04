import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../app/async/asyncReducer";
import { uploadToFirebaseStorage } from "../../app/firestore/storageService";
import {
  updateInstitutionFirestore,
  getInstitutionDocRef,
  dataFromSnapshot,
} from "../../app/firestore/firestoreService";
import { LOADSETTING } from "./institutionReducer";

export function uploadLogo(file) {
  return function (dispatch) {
    dispatch(asyncActionError());
    dispatch(asyncActionStart());
    try {
      let optId = sessionStorage.getItem("institutionId");
      uploadToFirebaseStorage("instlogo", file, optId);
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError({ type: "uploadLogo", msg: error }));
    }
  };
}

export function uploadCover(file) {
  return function (dispatch) {
    dispatch(asyncActionError());
    dispatch(asyncActionStart());
    try {
      let optId = sessionStorage.getItem("institutionId");
      uploadToFirebaseStorage("instcover", file, optId);
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError({ type: "uploadCover", msg: error }));
    }
  };
}

export function uploadEndUser(text) {
  return function (dispatch) {
    dispatch(asyncActionError());
    dispatch(asyncActionStart());
    try {
      let optId = sessionStorage.getItem("institutionId");
      updateInstitutionFirestore(optId, { "policies.endUserAgreement": text });
      dispatch(asyncActionFinish());
      dispatch(getPolicies());
    } catch (error) {
      dispatch(asyncActionError({ type: "uploadEndUser", msg: error }));
    }
  };
}
export function uploadAcademic(text) {
  return function (dispatch) {
    dispatch(asyncActionError());
    dispatch(asyncActionStart());
    try {
      let optId = sessionStorage.getItem("institutionId");
      updateInstitutionFirestore(optId, {
        "policies.academicIntegrityAgreement": text,
      });
      dispatch(asyncActionFinish());
      dispatch(getPolicies());
    } catch (error) {
      dispatch(asyncActionError({ type: "uploadAcademic", msg: error }));
    }
  };
}

export function getPolicies() {
  return function (dispatch) {
    dispatch(asyncActionError());
    dispatch(asyncActionStart());
    try {
      let instId = sessionStorage.getItem("institutionId");
      getInstitutionDocRef(instId)
        .get()
        .then((doc) => {
          const institution = dataFromSnapshot(doc);
          dispatch({
            type: LOADSETTING,
            payload: {
              academicAgreement:
                institution.policies.academicIntegrityAgreement,
              endUserAgreement: institution.policies.endUserAgreement,
            },
          });
          dispatch(asyncActionFinish());
        });
    } catch (error) {
      dispatch(asyncActionError({ type: "getPolicies", msg: error }));
    }
  };
}
