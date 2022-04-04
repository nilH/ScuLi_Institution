import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Menu, Dropdown, Header, Container } from "semantic-ui-react";
import ReportedUsersList from "./ReportedUsersList";
import { fetchReports, changeSort,loadEmailDraft } from "./reportedUserAction";

export default function ReportedUsersPage() {
  const dispatch = useDispatch();
  const { reports, sortBy } = useSelector((state) => state.incident);
  const institutionId = sessionStorage.getItem("institutionId");
  const sortOptions = [
    { key: "time", value: "time", text: "last submit time" },
    { key: "nameA", value: "nameA", text: "user name" },
    { key: "nameB", value: "nameB", text: "reported user name" },
  ];

  useEffect(() => {
    dispatch(fetchReports(institutionId));
    dispatch(loadEmailDraft(institutionId));
    return () => {};
  }, [dispatch,institutionId]);

  return (
    <div className="pagescontent">
      <Segment>
        <Container>
          <Header as="h2">manage reported users</Header>
          <Menu attached="top" borderless>
            <Menu.Menu position="right">
              <span>
                {" "}
                sorted by
                <Dropdown
                  inline
                  options={sortOptions}
                  onChange={(e, { value }) =>
                    dispatch(changeSort(value, reports))
                  }
                  selection
                  defaultValue={sortBy}
                />
              </span>
            </Menu.Menu>
          </Menu>

          <Segment>
            <ReportedUsersList reports={reports} institutionId={institutionId} />
          </Segment>
        </Container>
      </Segment>
    </div>
  );
}
