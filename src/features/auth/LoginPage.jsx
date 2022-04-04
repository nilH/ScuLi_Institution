import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { socialLogin } from "../../app/firestore/firebaseService";
import { checkCred } from "./authActions";

export default function LoginPage({ history }) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { statusMessage } = useSelector((state) => state.auth);

  function handleSocialLogin(providerStr) {
    dispatch(asyncActionStart());
    setErrorMsg(null);
    setSubmitting(true);
    dispatch(checkCred());
    socialLogin(providerStr)
      .then((result) => {
        setSubmitting(false);
        sessionStorage.setItem("institutionId", result.institution.id);
        sessionStorage.setItem("institutionName", result.institution.name);
        sessionStorage.setItem("logoURL",result.institution.logoURL);
        sessionStorage.setItem("coverURL",result.institution.coverPhotoURL);
        sessionStorage.setItem("userId", result.user.id);
        sessionStorage.setItem("userName", result.user.displayName);
        sessionStorage.setItem("login", "true");
        history.push("/app/dashboard");
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        setErrorMsg(err);
        setSubmitting(false);
        dispatch(asyncActionError(err));
      });
  }

  return (
    <div>
      <Dimmer.Dimmable as={Segment} dimmed={true && submitting}>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h3" color="teal" textAlign="center">
              <Image src="/assets/logosculi.png" style={{ width: 300 }} />
              <p>Institutional Login</p>
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Button
                  onClick={() => {
                    handleSocialLogin("google");
                  }}
                  icon="google"
                  fluid
                  color="google plus"
                  content="Login with Google"
                />
              </Segment>
            </Form>
            {errorMsg !== null && !submitting && (
              <Message attached="bottom" warning>
                <Icon name="info" />
                {errorMsg}
              </Message>
            )}
          </Grid.Column>
        </Grid>
        <Dimmer active={submitting && statusMessage && true} inverted>
          <Loader inverted>{statusMessage}</Loader>
        </Dimmer>
      </Dimmer.Dimmable>
    </div>
  );
}
