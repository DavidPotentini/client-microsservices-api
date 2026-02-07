# Arquitetura de Microsserviços - API de Clientes

## Estrutura do Projeto

O projeto está dividido em três serviços principais:

1.  **Auth Service (Porta 3001):** Registro e login de usuários com JWT.
2.  **User Service (Porta 3002):** Gerenciamento de perfis de usuários.
3.  **Resource Service (Porta 3003):** Gerenciamento de Clientes (CRUD).

## Exemplos de Requisições (Body)

### 1. Auth Service (Porta 3001)

**POST** `/auth/register`
```json
{
  "name": "usuario",
  "email": "usuario@exemplo.com",
  "password": "senha_segura_123"
}
```

**POST** `/auth/login`
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha_segura_123"
}
```

---

### 2. User Service (Porta 3002)

**GET** `/users` (Retorna lista de usuários)
**GET** `/users/:id` (Retorna usuário específico)

*Nota: O User Service neste exemplo é focado em consulta. O registro é feito via Auth Service.*

---

### 3. Resource Service (Porta 3003)

**POST** `/clients`
```json
{
  "name": "João Silva",
  "email": "joao@cliente.com",
  "cpf": "123.456.789-00"
}
```

**PUT** `/clients/:id`
```json
{
  "name": "João Silva Alterado",
  "email": "joao.novo@cliente.com"
}
```

**GET** `/clients` (Lista todos)

---

## Configuração Docker

A comunicação utiliza os **nomes dos containers** definidos no `docker-compose.yml`.

### Variáveis de Ambiente (.env)
- `DB_HOST=mysql-db`
- `DB_NAME=microservices_db`
- `DB_USER=root`
- `DB_PASSWORD=root`

## Como Executar
1.  Execute na raiz:
    ```bash
    docker-compose up --build
    ```

## Testes
1. Execute na pasta do teste que deseja executar:

```bash
npm install --save-dev jest supertest  
``` 

```bash
npm test
```
