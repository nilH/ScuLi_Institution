import React, { useEffect } from "react";
import { Grid, Segment,Header,Menu,Dropdown } from "semantic-ui-react";
import TutorApplicationList from "./TutorApplicationList";
import { loadTutorApps,changeSort } from "./tutorAppAction";
import { useSelector,useDispatch } from "react-redux";



export default function TutorApplicationsPage() {
  const institutionID = sessionStorage.getItem("institutionId");
  const dispatch=useDispatch();
  const sortOptions = [
    { key: "time", value: "time", text: "last submit time" },
    { key: "user", value: "user", text: "user" },
  ];
  const {  tutorapps, sortBy } = useSelector(
    (state) => state.tutorApp
  );
  useEffect(() => {
    loadTutorApps(institutionID,dispatch);
    return () => {};
  }, [dispatch, institutionID]);
  return (
    <div className="pagescontent">
      <Header as="h2">manage tutor applications</Header>

      <Menu attached="top" borderless>
        <Menu.Menu position="right">
          <span>
            sorted by
            <Dropdown
              inline
              options={sortOptions}
              onChange={(e, { value }) =>
                dispatch(changeSort(value, tutorapps))
              }
              selection
              defaultValue={sortBy}
            />
          </span>
        </Menu.Menu>
      </Menu>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment color="blue" size="large">
                <TutorApplicationList tutorapps={tutorapps}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
