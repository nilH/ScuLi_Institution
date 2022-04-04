import { List, Placeholder } from "semantic-ui-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFeedback } from "./feedbackAction";

export default function FeedbackList({ feedbacks, selectedFeedback }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const [activeId, setActiveId] = useState("");

  return (
    <>
      {loading ? (
        <Placeholder>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder>
      ) : (
        <List divided selection>
          {feedbacks.length !== 0 &&
            feedbacks.map((feedback) => (
              <List.Item
                key={feedback.id}
                active={feedback.id === activeId}
                onClick={() => {
                  setActiveId(feedback.id);
                  dispatch(selectFeedback(feedback.id, feedback));
                }}
              >
                <List.Content>{feedback.title}</List.Content>
              </List.Item>
            ))}
        </List>
      )}
    </>
  );
}
