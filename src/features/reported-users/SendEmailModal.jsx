import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { Button, Modal,Form,Icon,Label,Message } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { closeModal } from "../../app/common/modals/modalReducer";
import { useFormik } from "formik";
import {
  saveEmailDraft,
  sendEmail,
} from "./reportedUserAction";

export default function SendEmailModal({
  emailDraft,
  incident,
  institutionId,
  officialEmail
}) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      draftSubject: emailDraft.subject,
      draftText: emailDraft.body,
    },
  });
  const asyncError = useSelector((state) => state.async.error);


  return (
    <ModalWrapper
      centered={false}
      header={"Send Notification Email "}
      size="large"
    >
      <Modal.Content scrolling>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control="input"
              default
              name="draftSubject"
              value={formik.values.draftSubject}
              onChange={formik.handleChange}
              label="input subject of email"
            />
            <Form.Field
              control="textarea"
              default
              name="draftText"
              value={formik.values.draftText}
              onChange={formik.handleChange}
              label="input email body"
            />
          </Form.Group>

          <Button
            onClick={() => {
              dispatch(saveEmailDraft(institutionId, formik.values.draftText,formik.values.draftSubject));
            }}
          >
            save as draft
          </Button>
          {asyncError&&asyncError.type === "saveEmailDraft" && (
        <Label color="red">{asyncError.msg}</Label>
      )}
        </Form>
      </Modal.Content>

      <Modal.Actions>
        <Button onClick={() => dispatch(closeModal())} negative>
          Close
        </Button>
        {incident.emailSent ? (
          <Button basic active="false">
            <Icon name="checkmark" />
          </Button>
        ) : (
          <Button
            basic 
            onClick={() => {
              dispatch(
                sendEmail(
                  formik.values.draftSubject,
                  formik.values.draftText,
                  officialEmail,
                  incident
                )
              );
            }}
          >
            Send
          </Button>
        )}
      </Modal.Actions>
      {asyncError&&asyncError.type === "sendEmail" && (
        <Message attached="bottom" warning>
          <Icon name="info" />
          {asyncError.msg}
        </Message>
      )}
    </ModalWrapper>
  );
}
