# ContactHub

API RESTful para gerenciamento de contatos e categorias, com documentação via Swagger e testes automatizados com Jest.

## 🧠 Visão Geral

O ContactHub permite criar, visualizar, editar e excluir contatos, organizando-os por categorias. É uma aplicação fullstack com backend em Node.js e frontend em React.

---

## 📦 Tecnologias

### Backend
- Node.js + Express
- PostgreSQL
- Jest + Supertest
- ESLint + Prettier
- Dotenv
- Swagger 

### Frontend (em breve) 🚧
- Vite

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior recomendada)
- PostgreSQL
- Yarn

> **Observações:**
> - Docker e Insomnia foram utilizados no desenvolvimento, mas não são obrigatórios.
> - O banco de dados principal deve ser criado manualmente.
> - O banco de testes é criado via script.


### 1. Clone o repositório
```bash
git clone https://github.com/pegorara/contacthub.git
cd contacthub
```

### 2. Instale as dependências:
```bash
yarn
```
### 3. Configure o banco de dados:
- Crie um banco de dados PostgreSQL (o nome pode ser configurado no arquivo .env).
- Copie o arquivo env.example para .env e preencha as variáveis de ambiente necessárias.
- O schema do banco de dados já está disponível nos arquivos do projeto (em `src/database/schema.sql`). Execute o schema para criar as tabelas:
```bash
psql -U usuario -d contacthub -f src/database/schema.sql
```
### 4. Inicie o servidor:
```bash
yarn dev
```
>  O servidor estará rodando em http://localhost:3000

## 📘 Documentação da API
A documentação da API está disponível em `/api-docs` usando o Swagger. Após iniciar o servidor, acesse:
```bash
http://localhost:3000/api-docs
```
> O Swagger fornece uma interface interativa para explorar e testar todos os endpoints da API.

## 🧪 Testes
A aplicação inclui testes automatizados para os controllers `ContactController` e `CategoryController`. Para mais detalhes sobre como executar os testes e sua estrutura, consulte o [link](https://github.com/Pegorara/ContactHub/blob/main/api/src/docs/backend-tests.md)


