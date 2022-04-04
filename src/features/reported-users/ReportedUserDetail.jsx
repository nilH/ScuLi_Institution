import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Grid,
  Button,
  Header,
  Placeholder,
} from "semantic-ui-react";

export default function ReportedUserDetail({ incident }) {
  const { sessionInfo } = useSelector((state) => state.incident);
  const { loading } = useSelector((state) => state.async);
  return (
    <>
      <Header as="h2">Incident report #{incident.id}</Header>
      {loading ? (
        <Placeholder.Image rectangular />
      ) : (
        <Grid  centered>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as='h4' content="User"/>
              <Card>
                <Card.Header>{incident.user.displayName}</Card.Header>
                <Button>go to profile</Button>
              </Card>
            </Grid.Column>
            <Grid.Column>
            <Header as='h4' content="Reported User"/>
              <Card>
                <Card.Header>
                  {incident.reportedUser.displayName}
                </Card.Header>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column fluid>
              <Card fluid>
                <Card.Header textAlign="center">time of incide </Card.Header>
                <Card.Description> {incident.time}</Card.Description>
                <Card.Header textAlign="center">description of incident</Card.Header>
                <Card.Description>{incident.time}</Card.Description>
                <Card.Header textAlign="center">name of chat session </Card.Header>
                <Card.Description> {sessionInfo.time}</Card.Description>
                <Card.Header textAlign="center">description of chat session</Card.Header>
                <Card.Description>{sessionInfo.description}</Card.Description>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </>
  );
}
