import {
  LOAD_TERM,
  SELECT_TERM,
  ADD_COURSE,
  SEARCH_CHANGE,
  UPLOAD_COURSE,
  UPLOAD_TERM,
} from "./courseManageConstants";
import {
  dataFromSnapshot,
  getCourses,
  getInstitutionDocRef,
  getTerms as getTermsfromDatabase,
  updateTerm,
  addCourse as addCoursetoDatabase,
  addCourses as addCoursestoDatabase,
  getCoursesByName,
} from "../../app/firestore/firestoreService";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../app/async/asyncReducer";


export function getTerms(institutionID) {
  return function (dispatch) {
    dispatch(asyncActionError());
    dispatch(asyncActionStart());
    try {
      getInstitutionDocRef(institutionID)
        .get()
        .then((doc) => {
          const institution = doc.data();
          const curtermid = institution.currentTerm;
          const termIds = [
            ...institution.pastTerms,
            curtermid,
            ...institution.futureTerms,
          ];
          getTermsfromDatabase(termIds)
            .get()
            .then((snapshot) => {
              const terms = [];
              snapshot.forEach((doc) => {
                terms.push(dataFromSnapshot(doc));
              });
              const payload = {
                terms: terms,
                selectedTerm: curtermid,
              };
              dispatch({ type: LOAD_TERM, payload: payload });
              dispatch(
                selectTerm(
                  curtermid,
                  terms.find((term) => term.id === curtermid)
                )
              );
              dispatch(asyncActionFinish());
            });
        });
    } catch (error) {
      dispatch(asyncActionError({type:"getTerms",msg:error}));
    }
  };
}

export function selectTerm(termid, term) {
  return function (dispatch) {
    dispatch(asyncActionError());
    dispatch(asyncActionStart());
    try {
      getCourses(term.courses)
        .get()
        .then((snapshot) => {
          const courses = [];
          snapshot.forEach((doc) => {
            courses.push(dataFromSnapshot(doc));
          });
          const payload = {
            selectedTerm: termid,
            courses: courses,
          };
          dispatch({ type: SELECT_TERM, payload: payload });
          dispatch({ type: ADD_COURSE, payload: false });
          dispatch(asyncActionFinish());
        });
    } catch (error) {
      dispatch({
        type: SELECT_TERM,
        payload: { selectedTerm: termid, courses: [] },
      });
      dispatch(asyncActionError({type:"selectTerm",msg:error}));
    }
  };
}

export function searchCourse(results, searchValue, termid, term) {
  return function (dispatch) {
    if (searchValue !== "") {
      const payload = {
        courses: results,
        searchValue: searchValue,
      };
      dispatch({ type: SEARCH_CHANGE, payload: payload });
    } else {
      dispatch(selectTerm(termid, term));
    }
  };
}

export function deleteCourse(courseid, termid, term) {
  return function (dispatch) {
    dispatch(asyncActionError());
    dispatch(asyncActionStart());
    try {
      const courses = term.courses.filter((courseId) => courseId !== courseid);
      updateTerm(termid, { courses: courses }).then(() => {
        dispatch(asyncActionFinish());
        dispatch(selectTerm(termid, term));
      });
    } catch (error) {
      dispatch(asyncActionError({type:"deleteCourse",msg:error}));
    }
  };
}

export function addCourse() {
  return function (dispatch) {
    dispatch({ type: ADD_COURSE, payload: true });
  };
}

export function addCourseSubmit(
  name,
  shortName,
  description,
  termid,
  term
) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    dispatch(asyncActionError());
    try {
      addCoursetoDatabase({
        name: name,
        courseShortName: shortName,
        description: description,
      }).then((doc) => {
        term.courses.push(doc.id);
        debugger;
        updateTerm(termid, { courses: term.courses }).then(() => {
          dispatch({ type: ADD_COURSE, payload: false });
          dispatch(selectTerm(termid, term));
          dispatch(asyncActionFinish());
        });
      });
    } catch (error) {
      dispatch(asyncActionError({type:"addCourseSubmit",msg:error}));
    }
  };
}

export function parseAlCourseJSON(institutionID,courseData) {
  const alCourses = JSON.parse(courseData);
  return alCourses.map((course) => {
    return {
      name: course.label,
      shortName: course.value,
      institutionId: institutionID,
    };
  });
}

export function parseTermCourseJSON(termData) {
  return JSON.parse(termData);
}

export function uploadAlCourses(alCoursesFile) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      var alCourses = [];
      var readeralCourses = new FileReader();
      readeralCourses.onload = (e) => {
        alCourses = parseAlCourseJSON(e.target.result);
        addCoursestoDatabase(alCourses).then(() => {
          dispatch(asyncActionFinish());
          dispatch({ type: UPLOAD_COURSE, payload: alCourses.length });
        });
      };
      readeralCourses.readAsText(alCoursesFile);
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function uploadTermCourses(institutionID,termFile, selectedTerm) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      var termCourses = [];
      const readertermCourses = new FileReader();
      readertermCourses.onload = (e) => {
        termCourses = parseTermCourseJSON(e.target.result);

        getCoursesByName(termCourses, institutionID)
          .get()
          .then((snapshot) => {
            const coursesId = [];
            snapshot.forEach((doc) => {
              coursesId.push(dataFromSnapshot(doc).id);
            });
            updateTerm(selectedTerm, { courses: coursesId }).then(() => {
              dispatch({ type: UPLOAD_TERM, payload: termCourses.length });
              dispatch(asyncActionFinish());
            });
          });
      };
      readertermCourses.readAsText(termFile);
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
