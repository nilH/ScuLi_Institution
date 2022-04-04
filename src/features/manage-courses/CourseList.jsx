import React,{useState} from "react";
import CourseListItem from "./CourseListItem";
import { List, Placeholder, Pagination,Divider,Message,Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";

const numOnePage=10;

export default function CourseList() {
  const { courses } = useSelector((state) => state.course);
  const { loading } = useSelector((state) => state.async);
  const asyncError = useSelector((state) => state.async.error);
  const [activePage,setactivePage]=useState(1);
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
        <>
          <List divided verticalAlign="middle">
              {
                courses&&courses.slice(numOnePage*(activePage-1),numOnePage*activePage).map((course) => (
                  <CourseListItem course={course} key={course["id"]} />
                ))
              }
          </List>
          <Divider/>
          <Pagination
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={4}
            totalPages={courses?Math.ceil(courses.length/numOnePage):1}
            onPageChange={(e,{activePage})=>setactivePage(activePage)}
          />
            {asyncError&&asyncError.type === "deleteCourse" && (
        <Message attached="bottom" warning>
          <Icon name="info" />
          {asyncError.msg}
        </Message>
      )}
          )
        </>
      )}
    </>
  );
}
