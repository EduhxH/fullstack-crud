# Guia de Deploy - Cadastro de Usuários

## 1️⃣ Preparar o Backend para Deploy

### 1.1 Criar arquivo `.env.production`

Na pasta `backend/API`, crie um arquivo `.env.production`:

```
DATABASE_URL=sua_url_do_banco_de_dados
NODE_ENV=production
PORT=3000
```

### 1.2 Atualizar `server.js`

Certifique-se que seu servidor está escutando na porta do ambiente:

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### 1.3 Preparar `package.json` do backend

Adicione um script de build/start:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 2️⃣ Deploy do Backend na Railway

### 2.1 Criar conta na Railway

1. Acesse https://railway.app
2. Clique em "Login with GitHub" ou crie uma conta
3. Autorize a Railway a acessar seus repositórios

### 2.2 Criar novo projeto

1. Clique em "New Project"
2. Selecione "Deploy from GitHub"
3. Cole: **https://github.com/EduhxH/fullstack-crud**
4. Railway vai detectar automaticamente que é Node.js

### 2.3 Configurar variáveis de ambiente

1. Na dashboard do projeto, clique em "Variables"
2. Adicione:
   - `DATABASE_URL` = sua URL do banco (PostgreSQL/MySQL)
   - `NODE_ENV` = `production`

### 2.4 Deploy automático

1. Clique em "Add Service" → "Database" (se não tiver)
2. Escolha seu banco (PostgreSQL, MySQL, etc.)
3. Railway vai fazer o primeiro deploy automaticamente
4. Pegue a URL do seu backend (ex: `https://seu-projeto.up.railway.app`)

---

## 3️⃣ Preparar o Frontend para Deploy

### 3.1 Atualizar URL da API

Na pasta `frontend/cadastro/src/services/api.js`, atualize:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000/api'
});

export default api;
```

### 3.2 Criar arquivo `.env.production`

Na pasta `frontend/cadastro`, crie `.env.production`:

```
VITE_API_URL=https://seu-projeto.up.railway.app/api
```

### 3.3 Criar arquivo `.env`

Para desenvolvimento local:

```
VITE_API_URL=http://localhost:3000/api
```

---

## 4️⃣ Deploy do Frontend na Vercel

### 4.1 Preparar repositório Git

Se ainda não tem Git inicializado:

```bash
cd c:\Users\Yor\Documents\cadastro-usuarios
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

### 4.2 Push para GitHub

```bash
git add .
git commit -m "Preparado para deploy"
git push origin main
```

Seu repositório: **https://github.com/EduhxH/fullstack-crud**

### 4.3 Deploy na Vercel

1. Acesse https://vercel.com
2. Clique em "Import Project"
3. Selecione "Import Git Repository"
4. Cole a URL: **https://github.com/EduhxH/fullstack-crud**
5. Vercel vai detectar que é um projeto Vite

### 4.4 Configurar durante o deploy

**Build Settings:**
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `frontend/cadastro`

**Environment Variables:**
- `VITE_API_URL`: `https://seu-projeto.up.railway.app/api`

### 4.5 Deploy!

Clique em "Deploy" e aguarde. Sua URL será algo como `https://seu-projeto.vercel.app`

---

## 5️⃣ Problemas Comuns

### ❌ CORS Error

Se o frontend não conseguir chamar o backend, adicione CORS no backend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://seu-projeto.vercel.app',
  credentials: true
}));
```

### ❌ Variáveis de Ambiente não funcionam

Certifique-se que os arquivos `.env` estão no `.gitignore`:

```bash
# backend/API/.gitignore
.env
.env.local
.env.*.local
```

### ❌ Banco de dados não está acessível

Certifique-se que:
1. A `DATABASE_URL` está correta
2. Seu banco permite conexões externas
3. O firewall está configurado para aceitar conexões

---

## 6️⃣ Checklist Final

- [ ] Backend tem `server.js` configurado
- [ ] Backend tem scripts no `package.json`
- [ ] Frontend atualiza URL da API por variável de ambiente
- [ ] Repositório está no GitHub
- [ ] Railway projeto criado e configurado
- [ ] Vercel projeto criado e configurado
- [ ] Variáveis de ambiente definidas
- [ ] CORS configurado no backend
- [ ] `.env` adicionado ao `.gitignore`
- [ ] Database URL está funcionando

---

## 🎉 Próximas Ações

1. Configure o backend na Railway primeiro
2. Pegue a URL do backend
3. Configure o frontend com essa URL
4. Faça deploy na Vercel

Se tiver dúvidas em qualquer etapa, é só me chamar!
