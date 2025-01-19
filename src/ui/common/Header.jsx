import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderBase = styled.div`
  color: ${props => props.color || '#333'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
  text-align: ${props => (props.center ? 'center' : props.textAlign || 'left')};
`;

const Header = ({ level, children, color, margin, padding, textAlign, center }) => {
  const Tag = `h${level}`;

  return (
    <HeaderBase as={Tag} color={color} margin={margin} padding={padding} textAlign={textAlign} center={center}>
      {children}
    </HeaderBase>
  );
};

Header.propTypes = {
  level: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  textAlign: PropTypes.string,
  center: PropTypes.bool,
};

Header.defaultProps = {
  color: '#333',
  margin: '0',
  padding: '0',
  textAlign: 'left',
  center: false,
};

export default Header;