// Server main entry point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Fallback to * for debugging, but recommend setting FRONTEND_URL
    credentials: true
}));
app.use(express.json());

// Debugging: Log configuration on startup
console.log('Environment Check:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ NOT SET');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ NOT SET');
console.log('- FRONTEND_URL:', process.env.FRONTEND_URL || 'Not Set (using *)');

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('Notes App API is running...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Fallback routes for when the backend is deployed separately as a root service
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

// Export for Vercel
module.exports = app;

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});