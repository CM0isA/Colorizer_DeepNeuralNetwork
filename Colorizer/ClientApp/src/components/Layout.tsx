import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavBar/NavMenu';
import './Background.css'


export function Layout(props: any) {
  return (
    <div className='background'>
      <NavMenu />
      <Container >{props.children}</Container>
    </div>
  );
}
