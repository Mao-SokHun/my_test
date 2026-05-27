const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { sequelize } = require('./models/mentor_system');
const { notFoundHandler, errorHandler } = require('./middleware/mentor_system/error-handler');
const setupSwagger = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Swagger UI Documentation
setupSwagger(app);

// Standard Security & Utility Middlewares
app.use(helmet());
app.use(cors({
  origin: '*', // Adjust to specific frontend domains if necessary
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Base Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to RokKru Backend API Server!',
    status: 'Running',
    timestamp: new Date()
  });
});

// Health check and database connectivity verification route
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: 'UP',
      database: 'Connected',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'DOWN',
      database: 'Disconnected',
      error: error.message
    });
  }
});

// API Routes
const userTypesRouter = require('./routes/v1/userTypes');
const mentorsRouter = require('./routes/v1/mentor_system/mentors');
app.use('/api/v1/user-types', userTypesRouter);
app.use('/api/v1/mentors', mentorsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

// Connect to Database and start server
async function startServer() {
  try {
    console.log('Authenticating database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    console.log('Synchronizing database models (creating tables)...');
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🔗 Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server due to database connection issue:', error);
    process.exit(1);
  }
}

startServer();
