import React from "react";
import { Card, Button, Placeholder,Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { solvedFeedback } from "./feedbackAction";

export default function FeedbackDetail({ feedback }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);

  return (
    <Card fluid>
      {loading || !feedback ? (
        <>
          <Card.Content>
            <Placeholder.Header length="medium" />
          </Card.Content>
          <Card.Content>
            <Placeholder.Line length="medium" />
          </Card.Content>
          <Card.Content>
            <Placeholder.Line length="medium" />
          </Card.Content>
          <Card.Content>
            <Placeholder.Line length="medium" />
          </Card.Content>
          <Card.Content>
            <Placeholder.Line length="medium" />
          </Card.Content>
        </>
      ) : (
        <>
          <Card.Content>
            <Card.Header>{feedback.title}</Card.Header>
            <Card.Meta>title</Card.Meta>
          </Card.Content>
          <Card.Content>
            {feedback.description}
            <Card.Meta>description</Card.Meta>
          </Card.Content>
          <Card.Content>
            {feedback.userName}
            <Card.Meta>user</Card.Meta>
          </Card.Content>
          <Card.Content>
            <Card.Meta>{feedback.time.toString()}</Card.Meta>
          </Card.Content>
          <Card.Content>
            {feedback.status === 0 ? (
              <Button
                basic
                floated="right"
                onClick={() => {
                  feedback.status = 1;
                  dispatch(solvedFeedback(feedback.id, feedback));
                }}
              >
                Solved
              </Button>
            ) : (
              <Button floated="right" basic active="false">
                <Icon name="checkmark" />
              </Button>
            )}
          </Card.Content>
        </>
      )}
    </Card>
  );
}
