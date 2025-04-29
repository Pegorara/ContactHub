import styled from "styled-components";

export const Container = styled.div`
  margin-top: 2rem;
`;

export const Header = styled.header`

  display: flex;
  align-items: center;
  justify-content: space-between;
  strong {
    font-size: 1.5rem;
    color: #222;
  }

  a {
    color: #054d94;
    font-size: 1rem;
    text-decoration: none;
    font-weight: bold;
    border: 2px solid #054d94;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
`;
