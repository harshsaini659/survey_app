const express = require('express');
require('dotenv').config();
const createDatabase = require('./config/createDatabase');
const { sequelize } = require('./models/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const coordinatorRoutes = require('./routes/coordinatorRoutes');
const respondentRoutes = require('./routes/respondentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/coordinator', coordinatorRoutes);
app.use('/api/respondent', respondentRoutes);

app.get('/', (req, res) => {
  res.send('Survey API running...');
});

async function startServer() {
  try {
    await createDatabase();

    await sequelize.sync();

    console.log('Database connected and synced!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
  }
}

startServer();