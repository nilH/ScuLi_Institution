import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'semantic-ui-react';
import {uploadAcademic} from "../settingsAction";

export default function EditAcademicIntegrityPolicyModalContent({ startWith }) {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
		  academicPolicy: startWith,
		},
	  });
	  return (
		<>
		  <Modal.Content scrolling>
			<Form className="ui form">
			  <Form.Field
				  control="textarea"
				name="academicPolicy"
				value={formik.values.academicPolicy}
				onChange={formik.handleChange}
			  />
			</Form>
		  </Modal.Content>
		  <Modal.Actions>
			<Button.Group>
			  <Button
				color="teal"
				content="Update"
				onClick={() => dispatch(uploadAcademic(formik.values.academicPolicy))}
			  />
			</Button.Group>
		  </Modal.Actions>
		</>
	  );
}
