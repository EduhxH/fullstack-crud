# 🚀 Guia de Deploy - Render.com

## 📝 Pré-requisitos

- Conta no [Render.com](https://render.com)
- Repositório GitHub com o código (público ou privado)
- Banco de dados PostgreSQL (pode ser criado no Render)

---

## 1️⃣ Criar Banco de Dados PostgreSQL no Render

1. Acesse [https://dashboard.render.com](https://dashboard.render.com)
2. Clique em **"New"** → **"PostgreSQL"**
3. Preencha os dados:
   - **Name**: `cadastro-db` (ou o nome que preferir)
   - **Database**: `cadastro` 
   - **User**: `postgres`
   - **Region**: `São Paulo` ou outro próximo a você
   - **PostgreSQL Version**: `16`
4. Clique em **"Create Database"**
5. Copie a **Connection String** (vai parecer com: `postgresql://user:password@host:port/dbname`)

---

## 2️⃣ Deploy do Backend

### 2.1 Conectar GitHub ao Render

1. No dashboard do Render, clique em **"New"** → **"Web Service"**
2. Selecione **"Connect a repository"**
3. Autorize Render a acessar seu GitHub
4. Selecione o repositório `cadastro-usuarios`

### 2.2 Configurar o Web Service

Preencha com:

- **Name**: `cadastro-api` (ou nome que preferir)
- **Runtime**: `Node`
- **Build Command**: `cd backend/API && npm install && npx prisma generate`
- **Start Command**: `cd backend/API && node server.js`
- **Region**: Use a mesma do banco de dados

### 2.3 Configurar Variáveis de Ambiente

Após criar o serviço, vá em **"Environment"** e adicione:

```
DATABASE_URL=postgresql://user:password@host:port/dbname
NODE_ENV=production
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000
```

⚠️ **Importante**: 
- `DATABASE_URL` deve ser a connection string do banco criado no passo 1
- `JWT_SECRET` deve ser uma chave segura e única
- `PORT` pode ser qualquer número, Render vai gerenciar

### 2.4 Deploy

1. Clique em **"Create Web Service"**
2. Render automaticamente fará o build e deploy
3. Após alguns minutos, seu API estará disponível em: `https://seu-nome.onrender.com`

---

## 3️⃣ Deploy do Frontend (Vercel)

O frontend já tem `vercel.json` configurado. Você pode:

### Opção A: Deploy automático (Recomendado)
1. Acesse [https://vercel.com](https://vercel.com)
2. Clique **"Add New"** → **"Project"**
3. Selecione o repositório
4. Framework: `Vite`
5. Root Directory: `frontend/cadastro`
6. Deploy

### Opção B: Deploy manual
```bash
cd frontend/cadastro
vercel --prod
```

---

## 4️⃣ Atualizar Frontend para usar nova URL da API

No arquivo `frontend/cadastro/src/services/api.js`:

```javascript
const API_BASE_URL = 'https://seu-nome.onrender.com';
```

Substitua `seu-nome.onrender.com` pela URL do seu serviço no Render.

---

## ✅ Verificar se está funcionando

1. **Health Check**: `https://seu-nome.onrender.com/health`
2. **Login**: `POST https://seu-nome.onrender.com/auth/login`
3. **Register**: `POST https://seu-nome.onrender.com/auth/register`

---

## 🛠️ Troubleshooting

### Erro: "Cannot find module 'dotenv'"
- Certifique-se que `npm install` foi executado
- Verifique se `.env` contém `DATABASE_URL`

### Erro: "Prisma migration"
- Atualize o Build Command para:
  ```
  cd backend/API && npm install && npx prisma migrate deploy
  ```

### Banco de dados não conecta
- Verifique se `DATABASE_URL` está correto
- Certifique-se que o banco está em status "Available"
- Teste a conexão com: `npx prisma db push`

### Timeout de requisições
- Aumente o timeout no Render (Environment → Resource)
- Aumente o Pool de conexões do Prisma

---

## 📚 Links úteis

- [Render Docs](https://render.com/docs)
- [Prisma Deploy Guide](https://www.prisma.io/docs/orm/prisma-client)
- [Railway vs Render](https://render.com) - Render é gratuito com limites generosos

