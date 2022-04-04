import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";
import TermsList from "./TermsList";
import CourseList from "./CourseList";
import AddCourseForm from "./AddCourseForm";
import { getTerms } from "./courseManageActions";
import CourseSearchBar from "./CourseSearchBar";
import UploadCoursesForm from "./UploadCoursesForm";

export default function ManageCoursePage() {
  const dispatch = useDispatch();
  const institutionID = sessionStorage.getItem("institutionId");
  useEffect(() => {
    dispatch(getTerms(institutionID));
    return () => {};
  }, [dispatch, institutionID]);
  return (
    <div className="pagescontent">
      <Segment>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={4} style={{ margin: 100 }}>
              <Segment>
                <TermsList />
              </Segment>

              <Segment color="blue">
                <UploadCoursesForm />
              </Segment>
            </Grid.Column>
            <Grid.Column width={7}>
              <CourseSearchBar />
              <Segment color="blue" size="large">
                <CourseList />
              </Segment>
              <Segment>
                <AddCourseForm />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
