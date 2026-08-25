require('dotenv').config();
const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', itemRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', tier: 'application-server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Tier 2] Backend logic running on port ${PORT}`);
});