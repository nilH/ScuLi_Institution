import React from "react";
import { Container, Image,Header } from "semantic-ui-react";

export default function DashboardHome() {
  return (
    <div className="pagescontent">
      <Container>
        <Header as="h1" textAlign="center">Manage Your SCuLi With Few Clicks</Header>

        <Image
          src={sessionStorage.getItem("coverURL")}
          size="huge"
          centered
        ></Image>
      </Container>
    </div>
  );
}
