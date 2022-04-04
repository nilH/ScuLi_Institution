import { LOAD_TUTORAPP, CHANGE_SORT } from "./tutorAppReducer";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../app/async/asyncReducer";
import {
  dataFromSnapshot,
  fetchInstitutionTutorApps,
  updateTutorappFirestore,
  addUserToCourse,
  updateUserProfile,
  getUserProfileDocRef,
  getCourse,
} from "../../app/firestore/firestoreService";

export async function loadTutorApps(institutionID, dispatch) {
  dispatch(asyncActionStart());
  try {
    const snapshot = await fetchInstitutionTutorApps(
      0,
      institutionID,
      500
    ).get();
    const applications = [];
    for (const doc of snapshot.docs) {
      const tutorapp = dataFromSnapshot(doc);
      const coursedoc = await getCourse(tutorapp.courseId).get();
      const course = dataFromSnapshot(coursedoc);
      tutorapp.courseName = course.name;
      applications.push(tutorapp);
    }
    const payload = {
      selectedTutorApp: null,
      applications: applications,
    };
    dispatch({ type: LOAD_TUTORAPP, payload: payload });
    dispatch(asyncActionFinish());
    return Promise.resolve();
  } catch (error) {
    dispatch(asyncActionError({ type: "loadTutorApps", msg: error }));
    return Promise.reject();
  }
}

export function solvedApplications(tutorapp, option) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      updateTutorappFirestore(tutorapp.id, { status: option }).then(() => {
        if (option === 1) {
          addUserToCourse(tutorapp.courseId, tutorapp.userId).then((result) => {
            getUserProfileDocRef(tutorapp.userId)
              .get()
              .then((doc) => {
                const userProfile = dataFromSnapshot(doc);
                let patch = {
                  courses: {
                    student: userProfile.courses.student,
                    tutor: [...userProfile.courses.tutor, tutorapp.courseId],
                  },
                };
                updateUserProfile(patch, tutorapp.userId).then(() => {
                  loadTutorApps(
                    sessionStorage.getItem("institutionId"),
                    dispatch
                  );
                  asyncActionFinish();
                  dispatch(asyncActionFinish());
                });
              });
          });
        } else {
          asyncActionFinish();
          dispatch(asyncActionFinish());
        }
      });
    } catch (error) {
      dispatch(asyncActionError({ type: "solvedApplications", msg: error }));
    }
  };
}

export function changeSort(sortby, applications) {
  return function (dispatch) {
    const payload = { sortBy: 0 };
    switch (sortby) {
      case "time": {
        applications.sort((a, b) => a.time.getTime() - b.time.getTime());
        payload.sortBy = "time";
        break;
      }
      case "user": {
        applications.sort((a, b) => {
          return a.userName > b.userName ? 1 : -1;
        });
        payload.sortBy = "user";
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
