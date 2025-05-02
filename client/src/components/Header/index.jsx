import { Container } from "./styles";
import  InputSearch  from "./InputSearch";

import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="ContactHub" />
      <InputSearch />
    </Container>
  );
}
