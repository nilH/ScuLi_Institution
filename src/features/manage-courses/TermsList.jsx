import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Placeholder, Header,Message,Icon } from "semantic-ui-react";
import { selectTerm } from "./courseManageActions";

export default function TermList() {
  const { terms, selectedTerm } = useSelector((state) => state.course);
  const { loading } = useSelector((state) => state.async);
  const asyncError = useSelector((state) => state.async.error);
  const dispatch = useDispatch();
  return (
    <>
      <Header as="h3">Terms</Header>
      {loading ? (
        <Placeholder>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder>
      ) : (
        <List divided selection>
          {terms &&
            terms.map((term) => (
              <List.Item
                key={term.id}
                onClick={() => dispatch(selectTerm(term.id, term))}
                active={term.id === selectedTerm}
              >
                <List.Content>{term.name}</List.Content>
              </List.Item>
            ))}
        </List>
        
      )}
      {asyncError&&asyncError.type === "addCourseSubmit" && (
        <Message attached="bottom" warning>
          <Icon name="info" />
          {asyncError.msg}
        </Message>
      )}
    </>
  );
}
