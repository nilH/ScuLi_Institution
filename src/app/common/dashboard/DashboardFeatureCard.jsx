import React from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';

export default function DashboardFeatureCard({
  title,
  icon,
  dest,
  color,
  ...rest
}) {
  return (
    <>
      <Card
        fluid
        centered
        className='featurecard'
        link
        color={color}
        raised
        {...rest}>
        <Header
          icon
          style={{ fontSize: '1.125em', marginBottom: 0, maxWidth: 110 }}>
          <Icon
            name={icon ?? 'image'}
            color={color}
            style={{ fontSize: '3em' }}
          />
        </Header>
        <Card.Description>
          <span as='h2'>{title ? title : '<placeholder>'}</span>
        </Card.Description>
      </Card>
    </>
  );
}
