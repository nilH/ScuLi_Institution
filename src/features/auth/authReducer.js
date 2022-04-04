import {
  LOGIN_USER,
  LOGOUT_USER,
  USER_INIT,
  INIT_PROFILE,
  CHECK_CRED,
  SET_INSTI,
} from "./authConstants";

const initialState = {
  authenticated: false,
  currentUser: null,
  userProfile: null,
  initialized: false,
  currentInstitution: null,
  statusMessage: null,
  logout:false,
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHECK_CRED:
      return {
        ...state,
        statusMessage: "Authenticating...",
      };
    case LOGIN_USER:
      return {
        ...state,
        logout:false,
      };
    case INIT_PROFILE:
      if (payload) {
        return {
          ...state,
          userProfile: {
            uid: state.uid,
            displayName: payload.displayName,
            email: payload.email,
            // metadata: payload.metadata ? {
            //   creationTime: payload.metadata?.creationTime ?? undefined, // string
            //   lastSignInTime: payload.metadata?.lastSignInTime ?? undefined, // string,
            // } : null,
            isAdministrator: payload.isAdministrator === true,
            institution: {
              id: payload.institution?.id,
              name: payload.institution?.name,
              photoURL: payload.institution?.photoURL,
            },
          },
          initialized: true,
        };
      }
      return state;
    case USER_INIT:
      return {
        ...state,
        initialized: true,
        statusMessage: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        logout:true,
      };
    case SET_INSTI:
      return {
        ...state,
        currentInstitution: payload,
      };
    default:
      return state;
  }
}
