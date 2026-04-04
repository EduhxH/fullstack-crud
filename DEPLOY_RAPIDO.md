# 🚀 GUIA RÁPIDO DE DEPLOY

## Passo 1: Push ao GitHub

```bash
cd c:\Users\Yor\Documents\cadastro-usuarios

# Adicionar mudanças e fazer push
git add .
git commit -m "Projeto pronto para deploy"
git push origin main
```

Seu repositório: **https://github.com/EduhxH/fullstack-crud**

---

## Passo 2: Deploy do Backend (Railway)

### 2.1 Criar conta na Railway
- Acesse: https://railway.app
- Login com GitHub

### 2.2 Criar novo projeto Railway
1. Clique em **"New Project"**
2. Selecione **"Deploy from GitHub"**
3. Cole: **https://github.com/EduhxH/fullstack-crud**
4. Railway vai detectar que é Node.js

### 2.3 Configurar variáveis de ambiente no Railway
1. Na dashboard, vá para **"Variables"**
2. Adicione:
   ```
   DATABASE_URL = (copie do seu .env)
   JWT_SECRET = (gere uma senha segura)
   NODE_ENV = production
   FRONTEND_URL = (será atualizado após o deploy da Vercel)
   ```

### 2.4 Deploy automático
- Railway vai fazer deploy automaticamente
- Pegue a URL final: `https://seu-projeto.up.railway.app`

---

## Passo 3: Deploy do Frontend (Vercel)

### 3.1 Atualizar .env.production do frontend
Edite: `frontend/cadastro/.env.production`
```
VITE_API_URL=https://seu-projeto.up.railway.app
```

Commit essa mudança:
```bash
git add .
git commit -m "Atualizar URL da API para produção"
git push
```

### 3.2 Deploy na Vercel
1. Acesse: https://vercel.com/new
2. Clique em **"Import Git Repository"**
3. Cole: **https://github.com/EduhxH/fullstack-crud**
4. Vercel vai importar do seu repositório

### 3.3 Configurar durante o deploy
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `frontend/cadastro`
- **Environment Variables**:
  ```
  VITE_API_URL = https://seu-projeto.up.railway.app
  ```

### 3.4 Deploy!
Clique em **"Deploy"** e aguarde

---

## Passo 4: Voltar ao Railway e atualizar FRONTEND_URL

1. Na dashboard do Railway
2. Vá para **"Variables"**
3. Atualize:
   ```
   FRONTEND_URL = https://seu-projeto.vercel.app
   ```

---

## ✅ Pronto!

Seu site estará em: **https://seu-projeto.vercel.app**
Seu backend estará em: **https://seu-projeto.up.railway.app**

---

## 🔧 Problemas Comuns?

### CORS Error
Se o frontend não conseguir chamar o backend:
- Verifique que `FRONTEND_URL` está correto no Railway
- Aguarde 5 minutos para o Railway redeployar

### 401 Unauthorized
Significa o token JWT expirou. Faça login novamente.

### Database Connection Error
- Verifique que `DATABASE_URL` está correto
- MongoDB Atlas precisa permitir conexões de qualquer IP
