import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavBar/NavMenu';

export function Layout(props: any) {
  return (
    <div>
      <NavMenu />
      <Container>{props.children}</Container>
    </div>
  );
}
