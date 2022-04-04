import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Header, Icon, Image, Label, Message } from 'semantic-ui-react';
import { uploadToFirebaseStorage } from '../../../firestore/storageService';
// import { setFile, uploadComplete, uploadError, uploadProgress } from '../../store/storageReducer';
// import { closeModal } from '../modals/modalReducer';
import FileUploadDropzoneElement from './FileUploadDropzoneElement';
import cuid from 'cuid';



export default function FileUploadComponent({ usecase, handleSubmit, handleCancel, current }) {
	const [files, setFiles] = useState([]);							// TODO current = current imgURL from store
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(false);

	// const dispatch = useDispatch();
	// const { file, loading, progress, error, downloadURL } = useSelector((state) => state.storage);
	const { userProfile } = useSelector(state => state.auth);

	if (!usecase) {
		return (
			<Message icon='info' content='Something went wrong' />
		);
	}

	function handleUploadFile() {
		setLoading(true);
		// const filename = cuid() + '.' + getFileExtension(files[0].name);
		// const filename = files[0].name;
		const id =
			(usecase === 'userprofile')
				? null
				: usecase === 'instlogo'
					? userProfile.institution.id
					: usecase === 'tutorapp'
						? 'apptutors_' + cuid() // application/ appId / transcript / pdf
						: 'handle default error case';
		const uploadTask = uploadToFirebaseStorage(usecase, files[0], id);
		console.log('oooooooooo     Upload is       oooooooooooooooo');
		uploadTask.on('state_changed', snapshot => {
			const progress_percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			setProgress(progress_percent);
			console.log('           ' + progress_percent + '% done');
		}, error => {
			// toast.error(error.messege);
			console.log(error);
		}, () => {
			setLoading(false);
			uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {


			});
		});
	}

	// const useSetFile = (files) => {
	// 	if (!files || files.length === 0) {
	// 		dispatch(setFile(null));
	// 	} else {
	// 		const file = files[0];
	// 		Object.assign(file, {
	// 			preview: URL.createObjectURL(file)
	// 		});
	// 		console.log('  PHOTO UPLOAD WIDGET: ');
	// 		console.log(file);
	// 		dispatch(setFile({ file, usecase }));
	// 	}
	// };

	return (
		<Grid>
			{!files || !files[0] &&
				<Grid.Row centered stretched >
					<FileUploadDropzoneElement setFile={setFiles} />
				</Grid.Row>}

			{files && files[0] && <>
				<Label as='a' color='red' ribbon='right'>
					Cancel
            <Icon name='close' />
				</Label>
				<Image
					size='large'
					src={files[0].preview}
					label={{
						as: 'a',
						color: 'teal',
						content: 'Review',
						icon: 'photo',
						ribbon: true
					}}
				/>
			</>
			}
		</Grid>
	);
}
