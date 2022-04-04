import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Label, Form, Accordion } from "semantic-ui-react";
import { uploadAlCourses, uploadTermCourses } from "./courseManageActions";

export default function UploadCoursesForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const { selectedTerm } = useSelector((state) => state.course);
  const [alCoursesFile, setalCoursesFile] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const [termFile, settermFile] = useState("");
  const institutionID = sessionStorage.getItem("institutionId");

  return (
    <Accordion>
      <Accordion.Title
        active={isExpanded}
        onClick={() => {
          isExpanded ? setExpanded(false) : setExpanded(true);
        }}
      >
        <Icon name="dropdown" />
        Upload courses data
      </Accordion.Title>
      <Accordion.Content active={isExpanded}>
        <Form>
          <Label pointing="below">
            upload all courses data of your institution
          </Label>

          <Form.Group>
            <Form.Input
              width="10"
              type="file"
              onChange={(e) => {
                setalCoursesFile(e.target.files[0]);
              }}
            />

            <Form.Button
              width="4"
              type="submit"
              loading={loading}
              onClick={() => {
                dispatch(uploadAlCourses(alCoursesFile));
              }}
            >
              Submit
            </Form.Button>
          </Form.Group>

          <Label pointing="below">upload courses names in this term</Label>
          <Form.Group>
            <Form.Input
              width="10"
              type="file"
              onChange={(e) => settermFile(e.target.files[0])}
            />
            <Form.Button
              width="4"
              type="submit"
              loading={loading}
              onClick={() =>
                dispatch(uploadTermCourses(institutionID,termFile, selectedTerm))
              }
            >
              Submit
            </Form.Button>
          </Form.Group>
        </Form>
      </Accordion.Content>
    </Accordion>
  );
}
