import { LOAD_FEEDBACK, SHOW_DETAIL,CHANGE_SORT} from "./feedbackReducer";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../app/async/asyncReducer";
import {
  dataFromSnapshot,
  getFeedbacksByInstitution,
  updateFeedback,
  getUserProfileDocRef,
} from "../../app/firestore/firestoreService";

export function loadFeedback(institutionID) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      getFeedbacksByInstitution(institutionID)
        .get()
        .then((snapshot) => {
          const feedbacks = [];
          snapshot.forEach((doc) => feedbacks.push(dataFromSnapshot(doc)));
          const payload = {
            selectedFeedback: null,
            feedbacks: feedbacks,
          };
          dispatch({ type: LOAD_FEEDBACK, payload: payload });
          dispatch(asyncActionFinish());
          feedbacks.length>0&&dispatch(selectFeedback(feedbacks[0].id,feedbacks[0]))
        });
      
    } catch (error) {
      dispatch(asyncActionError({type:"loadFeedback",msg:error}));
    }
  };
}

export function selectFeedback(selectedFeedback, feedback) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      getUserProfileDocRef(feedback.userId)
        .get()
        .then((doc) => {
          const user = dataFromSnapshot(doc);
          feedback.userName = user.displayName;
          const payload = {
            selectedFeedback: selectedFeedback,
            feedback: feedback,
          };
          dispatch({ type: SHOW_DETAIL, payload: payload });
          dispatch(asyncActionFinish());
        });
        
        
    } catch (error) {
      dispatch(asyncActionError({type:"selectFeedback",msg:error}));
    }

    
  };
}

export function solvedFeedback(selectedFeedback) {
  return function (dispatch) {
    dispatch(asyncActionStart());
    try {
      updateFeedback(selectedFeedback, {status:1});
      asyncActionFinish();
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError({type:"solveFeedback",msg:error}));
    }
  };
}


export function changeSort(sortby,feedbacks){
  return function (dispatch) {
    const payload = { sortBy: 0 };
    switch (sortby) {
      case "time": {
        feedbacks.sort((a, b) => a.time.getTime() - b.time.getTime());
        payload.sortBy = "time";
        break;
      }
      case "title": {
        feedbacks.sort((a, b) => {
          return a.title > b.title ? 1 : -1;
        });
        payload.sortBy = "title";
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