import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Icon,
  Image,
  Menu,
} from "semantic-ui-react";
import { logoutUser } from "../../../features/auth/authActions";

export default function DashboardHeader() {
  const dispatch = useDispatch();
  function HeaderActions() {
    return (
      <>
        <Menu.Item position="right" style={{ marginLeft: 12 }}>
          <Icon size="big" name="user circle outline" />
          <Dropdown
            pointing="top right"
            text={sessionStorage.getItem("userName")}
          >
            <Dropdown.Menu>
              <Dropdown.Item
                text="Profile"
                icon="user"
                as={Link}
                to="/app/profile"
              />
              <Divider />
              <Dropdown.Item
                text="Sign out"
                icon="sign-out"
                // as={Link}
                // to='/login'
                as={Button}
                onClick={() => {
                  dispatch(logoutUser());
                }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </>
    );
  }

  return (
    <>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/app/dashboard" header>
            <Image
              src={sessionStorage.getItem("logoURL")}
              circular
              size="mini"
              style={{ marginRight: 6 }}
            ></Image>
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to="/app/settings"
            name="Institution Settings"
          />
          <Menu.Item as={NavLink} to="/app/courses" name="Courses" />
          <Menu.Item as={NavLink} to="/app/tutor-apps" name="Tutor Apps" />
          <Menu.Item
            as={NavLink}
            to="/app/reported-users"
            name="Reported Users"
          />
          <Menu.Item as={NavLink} to="/app/feedbacks" name="Feedbacks" />
          <HeaderActions />
        </Container>
      </Menu>
    </>
  );
}
