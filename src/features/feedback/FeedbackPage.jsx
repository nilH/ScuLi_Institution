import React, { useState } from "react";
import {
  Container,
  Grid,
  Segment,
  Header,
  Menu,
  Dropdown,
  Pagination,
  Message,
  Icon,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import FeedbackList from "./FeedbackList";
import FeedbackDetail from "./FeedbackDetail";
import { loadFeedback, changeSort } from "./feedbackAction";

const numOnePage = 10;

export default function FeedbackPage() {
  const { selectedFeedback, feedbacks, sortBy } = useSelector(
    (state) => state.feedback
  );
  const institutionID = sessionStorage.getItem("institutionId");
  const sortOptions = [
    { key: "time", value: "time", text: "last submit time" },
    { key: "title", value: "title", text: "title" },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFeedback(institutionID));
    return () => {};
  }, [dispatch, institutionID]);
  const [activePage, setactivePage] = useState(1);
  const asyncError = useSelector((state) => state.async.error);

  return (
    <div className="pagescontent">
      <Segment>
        <Container>
          <Header as="h2">manage feedbacks</Header>

          <Menu attached="top" borderless>
            <Menu.Menu position="right">
              <span>
                sorted by
                <Dropdown
                  inline
                  options={sortOptions}
                  onChange={(e, { value }) =>
                    dispatch(changeSort(value, feedbacks))
                  }
                  selection
                  defaultValue={sortBy}
                />
              </span>
            </Menu.Menu>
          </Menu>
          <Segment>
            <Grid>
              <Grid.Column width={5}>
                <FeedbackList
                  feedbacks={feedbacks.slice(
                    numOnePage * (activePage - 1),
                    numOnePage * activePage
                  )}
                  selectedFeedback={selectedFeedback}
                />
              </Grid.Column>

              {selectedFeedback && (
                <Grid.Column width={5}>
                  <FeedbackDetail
                    feedback={feedbacks.find(
                      (fb) => fb.id === selectedFeedback
                    )}
                  />
                </Grid.Column>
              )}
            </Grid>
            {asyncError &&
              (asyncError.type === "loadFeedback" ||
                asyncError.type === "selectFeedback" ||
                asyncError.type === "solveFeedback") && (
                <Message attached="bottom" warning>
                  <Icon name="info" />
                  {asyncError.msg}
                </Message>
              )}
          </Segment>
          <Pagination
            attached="bottom"
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={2}
            totalPages={Math.ceil(feedbacks.length / numOnePage)}
            onPageChange={(e, { activePage }) => setactivePage(activePage)}
          />
        </Container>
      </Segment>
    </div>
  );
}
