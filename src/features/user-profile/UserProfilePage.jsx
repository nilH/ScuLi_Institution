import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

export default function UserProfilePage() {
  return (
    <div className="pagescontent">
      <Header as='h2' textAlign='center'>
        <Icon size='big' name='user circle outline' />
        {sessionStorage.getItem('userName')}
      </Header>
    </div>
  );
}
