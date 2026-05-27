// ============= Start check mentor paths =============
// Run: node scripts/check-mentor-paths.js (from backend_rokkru)

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const requiredFiles = [
  'app.js',
  'routes/v1/mentor_system/mentors.js',
  'routes/v1/userTypes.js',
  'controllers/mentor_system/mentors-controller.js',
  'controllers/mentor_system/mentor-portfolio-controller.js',
  'controllers/mentor_system/mentor-skills-controller.js',
  'controllers/mentor_system/mentor-posts-controller.js',
  'controllers/mentor_system/mentor-analytics-controller.js',
  'middleware/mentor_system/auth.js',
  'middleware/mentor_system/require-mentor.js',
  'middleware/mentor_system/upload.js',
  'middleware/mentor_system/error-handler.js',
  'validators/mentor_system/mentor-validators.js',
  'utils/mentor_system/api-response.js',
  'utils/mentor_system/assert-owner.js',
  'models/mentor_system/index.js',
  'models/mentor_system/mentor.js',
];

const broken = requiredFiles.filter((rel) => !fs.existsSync(path.join(root, rel)));

if (broken.length) {
  console.error('Missing files:\n', broken.join('\n '));
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgres://check:check@127.0.0.1:5432/check';
}

try {
  require(path.join(root, 'routes/v1/mentor_system/mentors'));
  require(path.join(root, 'models/mentor_system'));
  console.log('OK: mentor_system paths and requires work');
} catch (err) {
  console.error('Require failed:', err.message);
  process.exit(1);
}

// ============= End check mentor paths =============
