import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  uploadComplete,
  uploadError,
  uploadFile,
  uploadProgress
} from '../store/storageReducer';

export default function useCloudStorage({ query, deps }) {
  const dispatch = useDispatch();
  // const storageQuery = firebase.storage().child('asdf').put(file, metadata); // query;

  useEffect(() => {
    // dispatch(asyncActionStart());
    dispatch(uploadFile());
    const unsubscribe = query().on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch(uploadProgress(progress));
      },
      (err) => {
        dispatch(uploadError(err));
      },
      async () => {
        const fileUrl = await query.snapshot.ref.getDownloadURL();
        dispatch(uploadComplete(fileUrl));
      }
    );
    return () => {
      unsubscribe();
    };
  }, deps);

}
