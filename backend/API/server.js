import express from 'express';
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/index.js";
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(cors()); 
app.use(express.json());


app.get('/usuarios', async (req, res) => {
  try {
    let users = [];
    if (req.query.name || req.query.age || req.query.email) {
      users = await prisma.user.findMany({
        where: {
          name: req.query.name,
          age: req.query.age,
          email: req.query.email
        }
      });
    } else {
      users = await prisma.user.findMany();
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
      }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id }
    });
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});