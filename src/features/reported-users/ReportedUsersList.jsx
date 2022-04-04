import React, { useState } from "react";
import {
  Button,
  Card,
  Pagination,
  Grid,
  Accordion,
  Placeholder,
  Divider,
  Header,
  Icon,
  Message
} from "semantic-ui-react";
import { solvedReport } from "./reportedUserAction";
import { openModal } from "../../app/common/modals/modalReducer";
import { useDispatch, useSelector } from "react-redux";
const numOnePage = 6;
const officialEmail="sculink@gmail.com";

export default function ReportedUsersList({ reports, institutionId }) {
  const { reload, emailDraft } = useSelector((state) => state.incident);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();
  const asyncError = useSelector((state) => state.async.error);
  const [activePage, setactivePage] = useState(1);
  return (
    <>
      <Grid columns={3}>
        {reports
          .slice(numOnePage * (activePage - 1), numOnePage * activePage)
          .map(
            (incident) =>
              incident && (
                <Grid.Column key={incident.id}>
                  <Card>
                    {loading ? (
                      <Placeholder>
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="medium" />
                      </Placeholder>
                    ) : (
                      <>
                        <Card.Content>
                          <Card.Header>
                            {incident.reportedUserName}{" "}
                          </Card.Header>
                          <Card.Meta>reported user</Card.Meta>
                          {incident.emailSent ? (
                            <Button floated="left" basic active="false">
                              <Icon name="checkmark" />
                            </Button>
                          ) : (
                            <Button
                              basic
                              floated="left"
                              onClick={() => {
                                dispatch(
                                  openModal({
                                    modalCategory: "SendEmailModal",
                                    modalProps: {
                                      emailDraft: emailDraft,
                                      incident: incident,
                                      institutionId: institutionId,
                                      officialEmail:officialEmail,
                                    },
                                   
                                  })
                                );
                                console.log(reload);
                              }}
                            >
                              notificate
                            </Button>
                          )}
                        </Card.Content>

                        <Card.Content>
                          <Card.Header>{incident.userName}</Card.Header>
                          <Card.Meta>submit user</Card.Meta>
                        </Card.Content>
                        <Card.Content>
                          <Accordion
                            as={Card.Content}
                            panels={[
                              {
                                key: incident.id,
                                title: incident.description
                                  .substring(0, 30)
                                  .padEnd(35, "..."),
                                content: incident.description,
                              },
                            ]}
                          ></Accordion>
                          <Card.Meta>description</Card.Meta>
                        </Card.Content>
                        <Card.Content>
                          <Card.Meta>{incident.time.toDateString()}</Card.Meta>
                        </Card.Content>
                        <Card.Content>
                          {incident.status === 0 ? (
                            <Button
                              basic
                              floated="right"
                              onClick={() => {
                                incident.status = 1;
                                dispatch(solvedReport(incident.id));
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
                        <Card.Content></Card.Content>
                      </>
                    )}
                  </Card>
                </Grid.Column>
              )
          )}
      </Grid>
      {asyncError&&(asyncError.type === "addCourseSubmit" ||asyncError.type === "fetchReports")&& (
        <Message attached="bottom" warning>
          <Icon name="info" />
          {asyncError.msg}
        </Message>
      )}
      <Divider horizontal>
        <Header as="h4">pages</Header>
      </Divider>

      <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={2}
        totalPages={Math.ceil(reports.length / numOnePage)}
        onPageChange={(e, { activePage }) => setactivePage(activePage)}
      />
    </>
  );
}
