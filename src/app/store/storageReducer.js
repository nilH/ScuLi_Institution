export const SET_FILE = 'SET_FILE';
export const FILE_UPLOAD = 'FILE_UPLOAD';
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';
export const UPLOAD_COMPLETE = 'UPLOAD_COMPLETE';
export const UPLOAD_ERROR = 'UPLOAD_ERROR';


export function setFile(file) {
  return {
    type: SET_FILE,
    payload: file
  };
}

export function uploadFile(file, usecase) {
  return file && usecase
    ? {
      type: FILE_UPLOAD,
      payload: file,
    }
    : uploadError({
      code: 'null-args',
      message: 'That file does not exist',
    });
}

export function uploadProgress(val) {
  return {
    type: UPLOAD_PROGRESS,
    payload: val,
  };
}

export function uploadComplete(downloadURL) {
  return {
    type: UPLOAD_COMPLETE,
    payload: downloadURL,
  };
}

export function uploadError(err) {
  return {
    type: UPLOAD_ERROR,
    payload: err,
  };
}

const initialState = {
  file: null,
  usecase: null,
  loading: false,
  progress: 0,
  error: null,
  downloadURL: null,
};

export function storageReducer(state = initialState, { type, payload }) {

  switch (type) {
    case SET_FILE:
      if (payload && payload.file && payload.usecase) {
        return {
          ...state,
          file: payload.file,
          usecase: payload.usecase,
        };
      }
      return initialState;
    case FILE_UPLOAD:
      if (payload && payload.file && payload.usecase) {
        return {
          ...state,
          file: payload.file,
          usecase: payload.usecase,
          loading: true,
          progress: 0,
        };
      }
      return {
        ...state,
        ...payload,
        loading: false,
        error: {
          code: 'invalid-args',
          message: 'No file selected',
        }
      };
    case UPLOAD_PROGRESS:
      return {
        ...state,
        progress: payload?.progress,
      };
    case UPLOAD_COMPLETE:
      return {
        ...state,
        loading: false,
        downloadURL: payload?.downloadURL,
      };
    case UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: payload?.error,
      };
    default:
      return state;
  }
}
