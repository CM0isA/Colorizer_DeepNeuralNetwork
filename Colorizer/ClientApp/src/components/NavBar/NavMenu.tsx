import React, { useContext, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { UserAvatar } from '_components';
// import { AppContext, EditUserContextProvider } from '_contexts';
import './NavMenu.css';
import cegekaLogo from '../../assets/logo-cegeka.png'
import Hide from '../Hide';

interface NavMenuVM {
  collapsed: boolean;
}

export function NavMenu() {
  const [state, setState] = useState<NavMenuVM>({ collapsed: false });
  // const { appState } = useContext(AppContext);
  // const { user } = appState;

  function renderNavBar() {
    // if(!user)
    //   return;
    return <>
    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">
            {/* <img src={cegekaLogo} className="logo"></img> */}
            Colorizer
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">
                  Home
                </NavLink>
              </NavItem>
              {/* <Hide if={user.role !== 'programManager'}>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/users">
                  Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/internship-programs">
                  Internship Programs
                </NavLink>
              </NavItem>
              </Hide> */}
            </ul>
          </Collapse>
        </Container>
      </Navbar>

    </>
  }


  const toggleNavbar = () =>
    setState({
      collapsed: !state.collapsed,
    });
  return (
    <header>
      {renderNavBar()}
    </header>
  );
}
