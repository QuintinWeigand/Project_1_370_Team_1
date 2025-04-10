const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/codeLogs')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const logSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    code: String
}, { versionKey: false }); // Disable the __v field
const Log = mongoose.model('Log', logSchema);

// API endpoint to save logs
app.post('/log', async (req, res) => {
    try {
        const { code } = req.body;
        const log = new Log({ code });
        await log.save();
        res.status(201).send({ message: 'Log saved successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to save log' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});