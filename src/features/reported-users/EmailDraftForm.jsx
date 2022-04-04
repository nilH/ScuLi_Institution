import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Accordion, Button, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { loadEmailDraft, saveEmailDraft } from "./reportedUserAction";

export default function EmailDraftForm({institutionId}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadEmailDraft(institutionId));
    return () => {};
  }, [dispatch,institutionId]);
  const [isExpanded, setExpanded] = useState(false);
  const {emailDraft}=useSelector((state)=>state.incident);
  

  const formik = useFormik({
    initialValues: {
      draftText: "",
    }});

  return (
    <Accordion>
      <Accordion.Title
        active={isExpanded}
        onClick={() => {
          isExpanded ? setExpanded(false) : setExpanded(true);
        }}
      >
        <Icon name="dropdown" />
        Notification Email
      </Accordion.Title>
      <Accordion.Content active={isExpanded}>
        <Form>
          <Form.Group widths="equal">
          <Form.Field control="textarea" value={emailDraft} label="the saved draft" onChange={()=>{console.log(emailDraft);}}/>
          <Form.Field
            control="textarea"
            name="draftText"
            value={formik.values.draftText}
            onChange={formik.handleChange}
            label="input new draft"
          />
          </Form.Group>
      
          <Button
            onClick={() => {
              dispatch(saveEmailDraft(institutionId,formik.values.draftText));
            }}
          >
            save
          </Button>
        </Form>
      </Accordion.Content>
    </Accordion>
  );
}
