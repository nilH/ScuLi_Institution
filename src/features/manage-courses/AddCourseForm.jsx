import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Accordion, Button, Icon, Message } from "semantic-ui-react";
import { addCourseSubmit } from "./courseManageActions";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { addCourse } from "./courseManageActions";

export default function AddCourseForm() {
  const dispatch = useDispatch();
  const { selectedTerm, terms, isaddCourse } = useSelector(
    (state) => state.course
  );
  const asyncError = useSelector((state) => state.async.error);
  const [isExpanded, setExpanded] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      shortName: "",
      description: "",
    },
    onSubmit: (values) => {
      dispatch(
        addCourseSubmit(
          values.name,
          values.shortName,
          values.description,
          selectedTerm,
          terms.find((term) => term.id === selectedTerm)
        )
      );
    },
  });
  return (
    <Accordion>
      <Accordion.Title
        active={isExpanded}
        onClick={() => {
          isExpanded ? setExpanded(false) : setExpanded(true);
        }}
      >
        <Icon name="dropdown" />
        Add a course
      </Accordion.Title>
      <Accordion.Content active={isExpanded}>
        <Button onClick={() => dispatch(addCourse())}>Add</Button>
        {isaddCourse && (
          <Form>
            <label htmlFor="courseName">Course name</label>
            <Form.Field
              placeholder="Intro to Cultural Anthropology"
              name="name"
              control="input"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <label htmlFor="shortName">Short name</label>
            <Form.Field
              name="shortName"
              control="input"
              placeholder="ANTH 3"
              value={formik.values.shortName}
              onChange={formik.handleChange}
            />
            <label htmlFor="description">Course description</label>
            <Form.Field
              control="textarea"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <Button
              type="submit"
              onClick={() => {
                dispatch(
                  addCourseSubmit(
                    formik.values.name,
                    formik.values.shortName,
                    formik.values.description,
                    selectedTerm,
                    terms.find((term) => term.id === selectedTerm)
                  )
                );
              }}
            >
              Submit
            </Button>
          </Form>
        )}
        {asyncError&&asyncError.type === "addCourseSubmit" && (
          <Message attached="bottom" warning>
            <Icon name="info" />
            {asyncError.msg}
          </Message>
        )}
      </Accordion.Content>
    </Accordion>
  );
}
