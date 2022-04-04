// 				constants
export const LOADSETTING = "LOADSETTING";
export const SETLOGO = "SETLOGO";

export function setLogo(url) {
  return {
    type: SETLOGO,
    payload: url,
  };
}

const initialState = {
  id: null,
  name: null,
  logosrc: null,
  location: null,
  academicAgreement: null,
  endUserAgreement:null,
};

export function institutionReducer(state = initialState, { type, payload }) {
  switch (type) {
	case LOADSETTING:
		return {
			...state,
			academicAgreement:payload.academicAgreement,
			endUserAgreement:payload.endUserAgreement,
		}
    case SETLOGO:
      return {
        ...state,
        logosrc: payload,
      };
    default:
      return state;
  }
}
