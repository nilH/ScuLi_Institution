import { combineReducers } from "redux";
import asyncReducer from "../async/asyncReducer";
import courseManageReducer from "../../features/manage-courses/courseManageReducer";
import feedbackReducer from "../../features/feedback/feedbackReducer";
import authReducer from "../../features/auth/authReducer";
import modalReducer from "../common/modals/modalReducer";
import { storageReducer } from "./storageReducer";
import { reportedUsersReducer } from "../../features/reported-users/reportedUsersReducer";
import { institutionReducer } from "../../features/institution-settings/institutionReducer";
import { tutorAppReducer } from "../../features/tutor-applications/tutorAppReducer";

const rootReducer = combineReducers({
  async: asyncReducer,
  modal: modalReducer,
  auth: authReducer,
  storage: storageReducer,

  institution: institutionReducer,

  feedback: feedbackReducer,
  incident: reportedUsersReducer,
  course: courseManageReducer,
  tutorApp: tutorAppReducer,
});

export default rootReducer;
