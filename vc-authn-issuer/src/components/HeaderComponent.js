import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { useHistory, useLocation }    from 'react-router-dom';
import { globalStyles }               from '../assets/styles/globalStyles';
import Auth                           from '../helpers/Auth';
import useWindowDimensions            from '../helpers/useWindowDimensions';
import QuebecLogo                     from '../assets/images/gouvqc.jpg';
import QuebecMiniLogo                 from '../assets/images/gouvqc.gif';

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { height, width } = useWindowDimensions();

  const history = useHistory();
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogin = () => {
    history.push('/login');
  };

  const handleLogout = () => {
    Auth.signout();
    history.replace('/');
  };

  return (
    <Navbar color="light" light expand="sm" fixed="top" style={globalStyles.navbar}>
      <NavbarBrand className="navbar-brand">
        {width > 500 ? (
          <a href="http://quebec.ca"> <img src={QuebecLogo} alt="quebec-logo" style={globalStyles.navbarLogo} /></a>
        ) : (
            <a href="http://quebec.ca"><img src={QuebecMiniLogo} alt="quebec-logo" style={globalStyles.navbarLogoMini} /></a>
          )}
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar className="ml-auto">
          <NavItem>
            <a
              rel="noopener noreferrer"
              href="https://github.com/CQEN-QDCE/cov-id-issuer"
              target="_blank"
              className="btn btn-dark text-white px-4 mr-4 my-3 my-sm-0">
              Github
            </a>
          </NavItem>
          {Auth.getAuth() ? (
            <NavItem>
              <Button color="primary" className="px-4" onClick={handleLogout}>
                Sortir
              </Button>
            </NavItem>
          ) : (
              <NavItem>
                <Button color="primary" className="px-4" onClick={handleLogin}>
                  Essayer
              </Button>
              </NavItem>
            )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default HeaderComponent;
