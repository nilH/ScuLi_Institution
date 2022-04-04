import React, { useState } from "react";
import { Divider, Pagination,List } from "semantic-ui-react";
import TutorApplicationListItem from "./TutorApplicationListItem";


const numOnePage = 10;
export default function TutorApplicationList({ tutorapps }) {
  const [activePage, setactivePage] = useState(1);

  return (
    <>
      <List divided verticalAlign="middle">
        {tutorapps &&
          tutorapps
            .slice(numOnePage * (activePage - 1), numOnePage * activePage)
            .map((application) => (
              <TutorApplicationListItem tutorapp={application} key={application["id"]} />
            ))}
      </List>
      <Divider />

      <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={4}
        //totalPages={courses?Math.ceil(courses.length/numOnePage):1}
        totalPages={3}
        onPageChange={(e, { activePage }) => setactivePage(activePage)}
      />
    </>
  );
}