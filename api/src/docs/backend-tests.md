<h1 align="center" style="font-weight: bold;">Testes da API 🧪</h1>

Esta API possui uma suíte de testes automatizados utilizando [Jest](https://jestjs.io/) e [Supertest](https://github.com/visionmedia/supertest).

### ▶️ Executando os testes

Antes de rodar os testes, certifique-se de que:

- Você tem um banco de testes configurado no seu `.env.test`
- Está com o `NODE_ENV=test` ao rodar

```bash
yarn test
```

Para ver a cobertura de testes:

```bash
yarn test --coverage
```

---

### 🧠 O que está sendo testado

#### 📂 CategoryController

| Método | Rota | Cenários testados |
|--------|------|--------------------|
| `GET`  | `/categories` | - Retorna array vazio se não houver categorias<br>- Retorna lista de categorias (ordenadas por nome) |
| `POST` | `/categories` | - Cria uma nova categoria com nome válido<br>- Impede duplicação de nomes<br>- Retorna erro se `name` estiver ausente |
| `GET`  | `/categories/:id` | - Retorna a categoria se o ID for válido<br>- Retorna 404 se a categoria não existir |
| `PUT`  | `/categories/:id` | - Atualiza o nome da categoria<br>- Retorna 404 se o ID não existir<br>- Retorna erro se `name` estiver ausente<br>- Impede atualizar para nome já existente |
| `DELETE` | `/categories/:id` | - Impede deletar categoria com contatos associados (valida integridade) |


#### 👥 ContactController

| Método | Rota               | Cenários testados                                                                 |
|--------|--------------------|------------------------------------------------------------------------------------|
| `GET`  | /contacts          | - Retorna array vazio se não houver contatos<br>- Retorna lista de contatos ordenados por nome da categoria (asc/desc)<br>- Inclui `category_name` na resposta |
| `POST` | /contacts          | - Cria contato sem categoria<br>- Cria contato com categoria<br>- Retorna erro se `name` estiver ausente<br>- Retorna erro se `email` e `phone` estiverem ausentes<br>- Retorna erro se `email` já existir<br>- Retorna erro se `phone` já existir<br>- Retorna erro se `category_id` não existir |
| `GET`  | /contacts/:id      | - Retorna contato pelo ID<br>- Retorna 404 se o contato não existir<br>- Inclui `category_name` na resposta |
| `PUT`  | /contacts/:id      | - Atualiza contato com dados válidos<br>- Atualiza contato com nova categoria<br>- Retorna 404 se o contato não existir<br>- Retorna erro se `name` estiver ausente<br>- Retorna erro se `email` e `phone` estiverem ausentes<br>- Retorna erro se `email` já estiver em uso por outro contato<br>- Retorna erro se `phone` já estiver em uso por outro contato<br>- Retorna erro se `category_id` não existir |
|`DELETE`| /contacts/:id      | - Deleta contato com sucesso<br>- Retorna 404 se o contato não existir |


---

