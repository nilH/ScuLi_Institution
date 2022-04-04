import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Header, Segment } from 'semantic-ui-react';

export default function PageNotFoundError() {
  const { error } = useSelector((state) => state.async);

  return (
    <Grid textAlign='center' style={{ height: '100vh', marginTop: '10%' }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment placeholder>
          <Header
            textAlign='center'
            content={error?.message || 'Page not found'}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
