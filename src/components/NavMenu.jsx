import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${props => (props.isOpen ? '0px' : '-200px')};
  width: 200px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 1000;
`;

const NavButton = styled.button`
  position: fixed;
  top: 5px;
  left: 20px;
  background-color: #7c77e3;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 1001;
`;

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavButton onClick={toggleNav}>
        {isOpen ? 'Close' : 'Menu'}
      </NavButton>
      <NavContainer isOpen={isOpen}>
        <ul>
          <li><Link to="/main" onClick={toggleNav}>Main Page</Link></li>
          <li><Link to="/info" onClick={toggleNav}>Info Page</Link></li>
        </ul>
      </NavContainer>
    </>
  );
};

export default NavMenu;