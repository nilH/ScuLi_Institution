import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, List } from "semantic-ui-react";
import { deleteCourse } from "./courseManageActions";

export default function CourseListItem({ course }) {
  const dispatch = useDispatch();

  const { selectedTerm, terms } = useSelector((state) => state.course);
  return (
    <List.Item>
      <List.Content floated="right">
        <Button
          onClick={() =>
            dispatch(
              deleteCourse(
                course.id,
                selectedTerm,
                terms.find((term) => term.id === selectedTerm)
              )
            )
          }
        >
          Delete
        </Button>
      </List.Content>
      <List.Content>{course["name"]}</List.Content>
    </List.Item>
  );
}
