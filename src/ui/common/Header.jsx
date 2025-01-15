import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderBase = styled.div`
  color: ${props => props.color || '#333'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
  text-align: ${props => props.textAlign || 'left'};
`;

const Header = ({ level, children, color, margin, padding, textAlign }) => {
  const Tag = `h${level}`;

  return (
    <HeaderBase as={Tag} color={color} margin={margin} padding={padding} textAlign={textAlign}>
      {children}
    </HeaderBase>
  );
};

Header.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  textAlign: PropTypes.string,
};

export default Header;