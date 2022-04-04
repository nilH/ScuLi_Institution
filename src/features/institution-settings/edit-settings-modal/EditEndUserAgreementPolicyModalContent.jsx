import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Modal } from "semantic-ui-react";
import { uploadEndUser } from "../settingsAction";
// import * as Yup from 'yup';

export default function EditEndUserAgreementPolicyModalContent({ startWith }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      enduserPolicy: startWith,
    },
  });
  return (
    <>
      <Modal.Content scrolling>
        <Form className="ui form">
          <Form.Field
		  	control="textarea"
            name="enduserPolicy"
			value={formik.values.enduserPolicy}
			onChange={formik.handleChange}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button.Group>
          <Button
            color="teal"
            content="Update"
            onClick={() => dispatch(uploadEndUser(formik.values.enduserPolicy))}
          />
        </Button.Group>
      </Modal.Actions>
    </>
  );
}
