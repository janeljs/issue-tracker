import styled from 'styled-components';

const Theme = {
  color: {
    white: '#ffffff',
    bg: '#f6f8fa',
    inputBg: '#EFF0F6',
    fontGrey: '#6E7191',
    fontBlack: '#14142B',
    bgGrey: '#F7F7FC',
    lineGrey: '#e2e5e9',
    skyblue: '#007AFF',
    blueGrey: '#bbbdda',
    blue: '#007AFF',
    transparent: '#00ffff00',
    primary: '#3f51b5',
    red: '#FF3B30',
  },
  size: {
    sm: 12,
    md: 16,
    md2: 18,
    lg: 32,
  },
  weight: {
    bold: 700,
  },
  tabModalRightPosition: {
    assignee: 260.5,
    label: 181.5,
    milestone: 90.5,
    author: 11,
  },
  tabModalTopPosition: {
    assignee: 110,
    label: 0,
    milestone: 0,
    author: 0,
  },
};

export const hoverGrey = styled.div`
  &:hover {
    background-color: ${Theme.color.bgGrey};
  }
`;

export default Theme;
