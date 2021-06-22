import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavBar/NavMenu';
import background from "./assets/images/background.png";

export function Layout(props: any) {
  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition: 'center',  }}>
      <NavMenu />
      <Container>{props.children}</Container>
    </div>
  );
}
