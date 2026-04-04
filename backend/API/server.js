import express from 'express';
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/index.js";
import cors from 'cors';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const app = express();

// Configurar CORS para produção
const allowedOrigins = [
  'http://localhost:5174',
  'http://localhost:3000',
  'https://fullstack-crud-pearl.vercel.app',
  process.env.FRONTEND_URL || 'http://localhost:5174'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para OPTIONS preflight
app.options('*', cors());

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "segredo_dev"; // usa variável de ambiente

// ── Schemas de validação ──────────────────────────────────────
const userSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  age: z.string().regex(/^\d+$/, "Idade deve ser um número inteiro positivo")
        .refine(val => parseInt(val) <= 120, "Idade inválida"),
  email: z.string().email("Email inválido")
});

const authSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Password deve ter pelo menos 6 caracteres")
});

// ── Middleware de autenticação ────────────────────────────────
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    next(); // token válido — continua para a rota
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

// ── Rotas públicas (sem login) ────────────────────────────────

// Registar admin
app.post('/auth/register', async (req, res) => {
  const result = authSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }
  try {
    const exists = await prisma.admin.findUnique({ where: { email: result.data.email } });
    if (exists) return res.status(400).json({ error: "Email já registado" });

    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const admin = await prisma.admin.create({
      data: { email: result.data.email, password: hashedPassword }
    });
    res.status(201).json({ message: "Admin criado com sucesso", id: admin.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/auth/login', async (req, res) => {
  const result = authSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }
  try {
    const admin = await prisma.admin.findUnique({ where: { email: result.data.email } });
    if (!admin) return res.status(401).json({ error: "Credenciais inválidas" });

    const validPassword = await bcrypt.compare(result.data.password, admin.password);
    if (!validPassword) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '8h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── Rotas protegidas (precisam de token) ─────────────────────

app.get('/usuarios', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    let where = {};
    if (req.query.name || req.query.age || req.query.email) {
      where = { name: req.query.name, age: req.query.age, email: req.query.email };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take: limit }),
      prisma.user.count({ where })
    ]);

    res.status(200).json({ users, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/usuarios', authMiddleware, async (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }
  try {
    const user = await prisma.user.create({ data: result.data });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/usuarios/:id', authMiddleware, async (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: result.data
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/usuarios/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});