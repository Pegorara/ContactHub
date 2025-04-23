import { Container, InputSearchContainer } from "./styles";

import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="ContactHub" />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar Contato"/>
      </InputSearchContainer>
    </Container>
  );
}
