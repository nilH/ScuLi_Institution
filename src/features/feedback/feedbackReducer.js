export const LOAD_FEEDBACK = "LOAD_FEEDBACK";
export const SHOW_DETAIL = "FEEDBACK_DETAIL";
export const RESOLVE_FEEDBACK = "RESOLVE_FEEDBACK";
export const CHANGE_SORT = "CHANGE_SORT";

const initialState = {
  loading: false,
  selectedFeedback: null,
  feedbacks: [],
  sortBy: "time",
};

export default function feedbackReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case LOAD_FEEDBACK:
      return {
        ...state,
        selectedFeedback: payload.selectedFeedback,
        feedbacks: payload.feedbacks,
      };
    case SHOW_DETAIL:
      return {
        ...state,
        selectedFeedback: payload.selectedFeedback,
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
