import styled from "styled-components";

export const Container = styled.header`
  margin-top: 5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const InputSearchContainer = styled.div`
  margin-top: 2rem;
  width: 100%;

  input {
    width: 100%;
    background: #f5f5f5;
    border: none;
    border-radius: 1.5rem;
    height: 3rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    outline: none;
    padding: 0 1.5rem;

    &::placeholder {
      color: #b8b8b8;
    }
  }
`;
