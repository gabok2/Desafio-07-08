import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px;
`;

export const Cart = styled(Link)`
  align-items: center;
  display: flex;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
  div {
    margin-right: 10px;
    text-align: right;
  }
  strong {
    display: block;
    color: #fff;
  }

  span {
    font-size: 12px;
    color: #999;
  }
`;
