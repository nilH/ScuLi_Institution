import { Formik } from 'formik';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';
// import * as Yup from 'yup';


export default function FileUploadDropzoneElement({ setFiles }) {
	const dropzoneStyles = {
		border: 'dashed 3px #eee',
		borderRadius: '5%',
		paddingTop: '30px',
		paddingLeft: '6px',
		paddingRight: '6px',
		textAlign: 'center',
		minWidth: '65%'
	};

	const dropzoneActive = {
		border: 'dashed 3px green',
	};

	const onDrop = useCallback(acceptedFiles => {
		setFiles(acceptedFiles.map(file => Object.assign(file, {
			preview: URL.createObjectURL(file)
		})));
	}, [setFiles]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div
			{...getRootProps()}
			style={isDragActive
				? { ...dropzoneStyles, ...dropzoneActive }
				: dropzoneStyles}
		>
			<Formik initialValues={{ dropfiles: null }}
				// validationSchema={
				// 	Yup.object({
				// 		dropfiles:
				// 	})
				// }
				onSubmit={async (values, { setSubmitting, setErrors }) => {

				}} >
				<input name='dropfiles' {...getInputProps()} />
				<Icon name='upload' size='huge' />
				<Header style={{ marginBottom: '1rem' }}
					content='Click to select or drop a file here' />

			</Formik>
		</div>
	);
}
