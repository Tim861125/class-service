
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Create a new class
app.post('/add-classes', async (req, res) => {
  const { name, teacher, date } = req.body;
  const newClass = await prisma.class.create({
    data: { name, teacher, date: new Date(date) },
  });
  res.json(newClass);
});

// Get all classes
app.get('/get-all-classes', async (req, res) => {
  const classes = await prisma.class.findMany();
  res.json(classes);
});

// Get a class by ID
app.get('/get-class/:id', async (req, res) => {
  const { id } = req.params;
  const course = await prisma.class.findUnique({
    where: { id: Number(id) },
  });
  res.json(course);
});

// Update a class by ID
app.put('/update-class/:id', async (req, res) => {
  const { id } = req.params;
  const { name, teacher, date } = req.body;
  const updatedClass = await prisma.class.update({
    where: { id: Number(id) },
    data: { name, teacher, date: new Date(date) },
  });
  res.json(updatedClass);
});

// Delete a class by ID
app.delete('/del-class/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.class.delete({
    where: { id: Number(id) },
  });
  res.json({ message: 'Class deleted successfully' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
