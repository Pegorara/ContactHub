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
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1rem;
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;

export const ListContainer = styled.div`
  margin-top: 1rem;

  header {
      margin-bottom: 0.5rem;
      button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;

      span{
        margin-right: 0.5rem;
        font-weight: bold;
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.primary.main};
      }
    }
  }
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  padding: 1rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 1rem;
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 0.25rem;
        border-radius: 0.25rem;
        margin-left: 0.5rem;
      }
    }

    span {
      display: block;
      color: ${({ theme }) => theme.colors.gray[200]};
      font-size: 0.875rem;
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: none;
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }
`;
