import {
  Container,
  Placeholder,
  Segment,
} from 'semantic-ui-react';

export function textareaPlaceholder() {
  return (
    <Segment raised>
      <Container text>
        <Placeholder>
          <Placeholder.Header image />
          <Placeholder.Paragraph>
            <Placeholder.Line length='very long' />
            <Placeholder.Line length='long' />
            <Placeholder.Line length='long' />
          </Placeholder.Paragraph>
          <Placeholder.Paragraph>
            <Placeholder.Line length='very long' />
            <Placeholder.Line length='long' />
            <Placeholder.Line length='long' />
          </Placeholder.Paragraph>
        </Placeholder>
      </Container>
    </Segment>
  );
}

export function institutionLogoUpload(dispatch) {

}

export function textareaPolicy(dispatch) {

}
