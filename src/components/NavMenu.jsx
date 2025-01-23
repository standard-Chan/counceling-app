import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Spacing from '../ui/common/Spacing';

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${props => (props.isOpen ? '0px' : '-200px')};
  width: 200px;
  height: 100%;
  background-color: #ececec7b; /* 흰색 배경 */
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 9000;
  padding-top: 60px; /* 버튼과 메뉴 간격 */
`;

const NavButton = styled.button`
  position: fixed;
  top: 5px;
  left: 20px;
  background-color: #395bb8; /* 녹색 */
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1001;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #183481; /* 호버 시 더 어두운 녹색 */
  }
`;

const NavLink = styled(Link)`
  margin-left: 10px;
  display: block;
  padding: 10px 20px;
  color: #ffffff; /* 어두운 회색 */
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  transition: background-color 0.3s ease;

  border: 1px solid #f1f1f1; /* 밝은 회색 */
  border-radius: 8px;
  background: #6481d2;
  &:hover {
    background-color: #3b62cc; /* 호버 시 밝은 회색 */
  }
`;

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <NavButton onClick={toggleNav}>
        {isOpen ? 'Close' : 'Menu'}
      </NavButton>
      <NavContainer ref={navRef} isOpen={isOpen}>
        <ul>
          <li><NavLink to="/main" onClick={toggleNav}>Main Page</NavLink></li>
          <Spacing top={"16px"} />
          <li><NavLink to="/info" onClick={toggleNav}>Info Page</NavLink></li>
        </ul>
      </NavContainer>
    </>
  );
};

export default NavMenu;