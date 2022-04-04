const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModal(modal) {
  return {
    type: OPEN_MODAL,
    payload: modal,
  };
}

export function closeModal(result) {
  return {
    type: CLOSE_MODAL,
    payload: result,
  };
}

const initialState = {
  modalCategory: null,
  modalProps: null, /* {
    usecase: null,
    initData: null,
  }  */
  modalResult: null,
  modalOpen: false,
};

export default function modalReducer(state = initialState, { type, payload }) {

  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        ...payload,
        modalProps: {
          ...state.modalProps,
          ...payload.modalProps
        },
        modalOpen: true
      };
    case CLOSE_MODAL:
      return {
        ...state,
        ...payload,
        modalCategory: null,
        modalProps: null,
        modalStartWith: null,
        modalResult: payload,
        modalOpen: false,
      };
    default:
      return state;
  }
}
