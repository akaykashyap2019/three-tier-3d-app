const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Database read failed', details: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Entity identifier is required' });
    }
    const newItem = await prisma.item.create({
      data: { name: name.trim() }
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Database write failed', details: error.message });
  }
};

module.exports = {
  getItems,
  createItem
};