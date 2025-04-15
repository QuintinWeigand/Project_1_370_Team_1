const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/codeLogs')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema and Model for Users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// API endpoint for user registration
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to register user' });
    }
});

// API endpoint for user login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        res.status(200).send({ message: 'Login successful' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to login' });
    }
});

// Schema and Model for Logs
const logSchema = new mongoose.Schema({
    username: { type: String, required: true },
    input: { type: String, required: true },
    output: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Log = mongoose.model('Log', logSchema);

// API endpoint for logging code execution
app.post('/log', async (req, res) => {
    try {
        const { username, input, output } = req.body;
        const log = new Log({ username, input, output });
        await log.save();
        res.status(201).send({ message: 'Log saved successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to save log' });
    }
});

// Add an endpoint to fetch logs for a specific user
app.get('/logs', async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).send({ error: 'Username is required' });
        }
        const logs = await Log.find({ username }).sort({ timestamp: -1 }); // Sort by most recent
        res.status(200).send(logs);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch logs' });
    }
});

// API endpoint to check MongoDB connection status
app.get('/status', (req, res) => {
    const state = mongoose.connection.readyState; // 1 = connected, 0 = disconnected
    // console.log("Status: " + state + { connected: state === 1 });
    res.send({ connected: state === 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});