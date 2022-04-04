import {
  LOAD_TERM,
  SELECT_TERM,
  SEARCH_CHANGE,
  ADD_COURSE,
  UPLOAD_TERM,
  UPLOAD_COURSE,
} from "./courseManageConstants";

const initialState = {
  selectedTerm: null,
  terms: null,
  courses: null,
  loading: false,
  isaddCourse: false,
  searchValue: "",
  alCoursesInfo: "",
  termCoursesInfo: "",
};

export default function courseManageReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case LOAD_TERM:
      return {
        ...state,
        selectedTerm: payload.selectedTerm,
        terms: payload.terms,
      };
    case SELECT_TERM:
      return {
        ...state,
        selectedTerm: payload.selectedTerm,
        courses: payload.courses,
        searchValue: "",
      };
    case ADD_COURSE:
      return {
        ...state,
        isaddCourse: payload,
      };
    case SEARCH_CHANGE:
      return {
        ...state,
        courses: payload.courses,
        searchValue: payload.searchValue,
      };
    case UPLOAD_COURSE:
      return {
        ...state,
        alCoursesInfo: payload,
      };
    case UPLOAD_TERM:
      return {
        ...state,
        termCoursesInfo: payload,
      };
    default:
      return state;
  }
}
