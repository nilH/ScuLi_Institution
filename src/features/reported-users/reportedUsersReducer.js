// constants

export const FETCH_REPORTS = "FETCH_REPORTS";
export const CHANGE_SORT = "CHANGE_SORT";
export const RELOAD = "RELOAD";
export const LOADDRAFT = "LOADDRAFT";

// reducer
const initialState = {
  reports: [],
  sessionInfo: null,
  sortBy: "time",
  reload: 0,
  emailDraft: null,
};

export function reportedUsersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_REPORTS:
      return {
        ...state,
        reports: payload.reports,
      };
    case CHANGE_SORT:
      return {
        ...state,
        sortBy: payload.sortBy,
      };
    case RELOAD:
      return {
        ...state,
        reload: state.reload + 1,
      };
    case LOADDRAFT:
      return {
        ...state,
        emailDraft: payload.emailDraft,
      };
    default:
      return state;
  }
}
