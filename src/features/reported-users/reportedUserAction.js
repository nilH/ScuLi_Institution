import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import {
  FETCH_REPORTS,
  CHANGE_SORT,
  RELOAD,
  LOADDRAFT,
} from "./reportedUsersReducer";

import {
  getUserProfileDocRef,
  getIncidentsByInstitution,
  getInstitutionDocRef,
  dataFromSnapshot,
  updateIncidentFirestore,
  updateInstitutionFirestore,
} from "../../app/firestore/firestoreService";

export function fetchReports(institutionID) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      getIncidentsByInstitution(institutionID)
        .get()
        .then((snapshot) => {
          const incidents = [];
          snapshot.forEach((doc) => {
            const incident = dataFromSnapshot(doc);
            incident.emailSent = false;
            incidents.push(incident);
          });
          const payload = {
            reports: incidents,
          };
          dispatch({ type: FETCH_REPORTS, payload: payload });
          dispatch(asyncActionFinish());
        });
    } catch (error) {
      dispatch(asyncActionError({type:"fetchReports",msg:error}));
    }
  };
}

export function sendEmail(subject, text, officialEmail, incident) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      getUserProfileDocRef(incident.reportedUserId)
        .get()
        .then((doc) => {
          const userdata = dataFromSnapshot(doc);
          fetch("/sendEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: officialEmail,
              to: userdata.email,
              subject: subject,
              body: text,
            }),
          })
            .then((response) => {
              response.json();
            })
            .then((data) => {
              dispatch({ type: RELOAD });
              dispatch(asyncActionFinish());
              incident.emailSent = true;
              console.log("Success:", data);
            });
        });
    } catch (error) {
      dispatch(asyncActionError({type:"sendEmail",msg:error}));
    }
  };
}

export function solvedReport(selectedReportID) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      updateIncidentFirestore(selectedReportID, { status: 1 }).then(() => {
        dispatch(asyncActionFinish());
      });
    } catch (error) {
      dispatch(asyncActionError({type:"solvedReport",msg:error}));
    }
  };
}

export function changeSort(sortby, reports) {
  return function (dispatch) {
    const payload = { sortBy: 0 };
    switch (sortby) {
      case "time": {
        reports.sort((a, b) => a.time.getTime() - b.time.getTime());
        payload.sortBy = "time";
        break;
      }
      case "nameA": {
        reports.sort((a, b) => {
          return a.userName > b.userName ? 1 : -1;
        });
        payload.sortBy = "nameA";
        break;
      }
      case "nameB": {
        reports.sort((a, b) => {
          return a.reportedUserName > b.reportedUserName ? 1 : -1;
        });
        payload.sortBy = "nameB";
        break;
      }
      default: {
        payload.sortBy = "time";
        break;
      }
    }
    dispatch({ type: CHANGE_SORT, payload: payload });
  };
}

export function loadEmailDraft(institutionId) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      getInstitutionDocRef(institutionId)
        .get()
        .then((doc) => {
          const institution = dataFromSnapshot(doc);
          dispatch({
            type: LOADDRAFT,
            payload: {
              emailDraft: institution.emailDraft,
            },
          });
          dispatch(asyncActionFinish());
        });
    } catch (error) {
      dispatch(asyncActionError({type:"loadEmailDraft",msg:error}));
    }
  };
}

export function saveEmailDraft(institutionId, text, subject) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      updateInstitutionFirestore(institutionId, {
        emailDraft: { subject: subject, body: text },
      }).then(() => {
        dispatch({
          type: RELOAD,
        });
        dispatch(asyncActionFinish());
      });
    } catch (error) {
      dispatch(asyncActionError({type:"saveEmailDraft",msg:error}));
    }
  };
}
