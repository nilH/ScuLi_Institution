export const LOAD_TUTORAPP = "LOAD_TUTORAPP";
export const SHOW_DETAIL = "FEEDBACK_DETAIL";
export const RESOLVE_TUTORAPP = "RESOLVE_TUTORAPP";
export const CHANGE_SORT = "CHANGE_SORT";

const initialState = {
  loading: false,
  selectedTutorApp: null,
  tutorapps: [],
  sortBy: "time",
};

export function tutorAppReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case LOAD_TUTORAPP:
      return {
        ...state,
        selectedTutorApp: payload.selectedTutorApp,
        tutorapps: payload.applications,
      };
    case SHOW_DETAIL:
      return {
        ...state,
        selectedTutorApp: payload.selectedTutorApp,
      };
    case CHANGE_SORT: {
      return {
        ...state,
        sortBy: payload.sortBy,
      };
    }
    default:
      return state;
  }
}
