// ============= Start upload middleware =============
// Task #11 — multer for POST /mentors/:userId/portfolio/upload
// Frontend: FormData field name "file"
// ................................................

const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Start portfolio upload directory on disk
// ................................................
const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads', 'portfolio');
fs.mkdirSync(uploadDir, { recursive: true });
// End portfolio upload directory on disk
// ................................................

// Start multer disk storage configuration
// ................................................
const storage = multer.diskStorage({
  destination: (_request, _file, callback) => callback(null, uploadDir),
  filename: (_request, file, callback) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    callback(null, `${Date.now()}-${safeName}`);
  },
});

const uploadPortfolio = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    const allowedExtension = /\.(jpg|jpeg|png|gif|webp|pdf)$/i;
    const isAllowed = allowedExtension.test(file.originalname);
    if (isAllowed) return callback(null, true);
    return callback(new Error('Only images and PDF files are allowed'));
  },
});
// End multer disk storage configuration
// ................................................

module.exports = { uploadPortfolio };

// ============= End upload middleware =============
