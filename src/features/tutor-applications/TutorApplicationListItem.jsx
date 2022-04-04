import React from "react";
import { useDispatch } from "react-redux";
import { Button, List, Grid } from "semantic-ui-react";
import { solvedApplications } from "./tutorAppAction";

export default function TutorApplicationListItem({ tutorapp }) {
  const dispatch=useDispatch();
  return (
    <Grid row={1} columns={5}>
      <Grid.Row>
        <Grid.Column>
          <List link>
            <List.Item>
              <Button
              basic
                href={tutorapp.transcriptURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Transcript
              </Button>
            </List.Item>
          </List>
        </Grid.Column>

        <Grid.Column>
          <List.Item>
            <List.Content>{tutorapp.userName}</List.Content>
          </List.Item>
        </Grid.Column>
        <Grid.Column>
          <List.Item>
            <List.Content>{tutorapp.courseName}</List.Content>
          </List.Item>
        </Grid.Column>
        <Grid.Column>
          <List.Item>
            <List.Content>
              <Button
              basic
                onClick={() => {
                  dispatch(solvedApplications(tutorapp,1));
                }}
              >
                Approve
              </Button>
              <Button
              basic
                onClick={() => {
                  dispatch(solvedApplications(tutorapp,2));
                }}
              >
                Reject
              </Button>
            </List.Content>
          </List.Item>
        </Grid.Column>
        <Grid.Column>
          <List.Item>
            <List.Content>{tutorapp.time.toDateString()}</List.Content>
          </List.Item>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
