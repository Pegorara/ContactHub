import { Container, Header, ListContainer, Card } from './styles';

import arrow from '../../assets/icons/arrow.svg';
import edit from '../../assets/icons/edit.svg';
import trash from '../../assets/icons/trash.svg';

export default function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 Contatos</strong>
        <a href="/">Novo Contato</a>
      </Header>

      <ListContainer>
        <header>
          <button type='button'>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Nome do Contato</strong>
              <small>Contato</small>
            </div>
            <span>ken@hotmail.com</span>
            <span>(11) 91234-5678</span>
          </div>

          <div className="actions">
            <a href="/">
              <img src={edit} alt="Edit" />
            </a>
            <button type='button'>
              <img src={trash} alt="Trash" />
            </button>
          </div>
        </Card>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Nome do Contato</strong>
              <small>Contato</small>
            </div>
            <span>ken@hotmail.com</span>
            <span>(11) 91234-5678</span>
          </div>

          <div className="actions">
            <a href="/">
              <img src={edit} alt="Edit" />
            </a>
            <button type='button'>
              <img src={trash} alt="Trash" />
            </button>
          </div>
        </Card>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Nome do Contato</strong>
              <small>Contato</small>
            </div>
            <span>ken@hotmail.com</span>
            <span>(11) 91234-5678</span>
          </div>

          <div className="actions">
            <a href="/">
              <img src={edit} alt="Edit" />
            </a>
            <button type='button'>
              <img src={trash} alt="Trash" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
