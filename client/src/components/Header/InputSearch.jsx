import { useState } from "react";
import styled from "styled-components";

export default function Input() {
  const [value, setValue] = useState("");

  const handleClear = () => setValue("");

  return (
    <Wrapper>
      <Group>
        <SearchIcon viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </g>
        </SearchIcon>

        <InputField
          type="text"
          placeholder="Pesquisar contato..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {value && <ClearButton onClick={handleClear}>×</ClearButton>}
      </Group>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  height: 45px;
  padding: 0 2.5rem;
  border: none;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 0 0 1.5px #d6d7e1, 0 0 25px -17px #000;
  transition: all 0.25s ease;
  outline: none;

  &::placeholder {
    color: #bcbcbc;
  }

  &:hover {
    box-shadow: 0 0 0 2.5px #b3b6c6;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    box-shadow: 0 0 0 2.5px #b3b6c6;
  }
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 1rem;
  width: 1rem;
  height: 1rem;
  fill: #bdbecb;
  pointer-events: none;
  z-index: 1;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #bdbecb;
  cursor: pointer;
  z-index: 2;
`;
