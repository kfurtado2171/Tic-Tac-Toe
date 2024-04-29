// server.js
const express = require('express');
const bodyParser = require('body-parser');
const playerRouter = require('./routes/playerRouter');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/players', playerRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// const express = require('express');
// const http = require('http');
// const path = require('path');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const socketIo = require('socket.io');

// const app = express();
// const PORT = process.env.PORT || 3001;

// // MongoDB connection
// mongoose.connect('mongodb+srv://kfurtado14:zIOQyNZQ5GQKofCu@players.gvpdlpn.mongodb.net/?retryWrites=true&w=majority&appName=Players', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // User schema and model
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });

// const User = mongoose.model('User', userSchema);

// // Middleware
// app.use(bodyParser.json());

// // User registration endpoint
// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create a new user
//     const newUser = new User({ username, email, password });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Serve static files from the 'frontend/build' directory
// app.use(express.static(path.join(__dirname, 'frontend/build')));

// // Define routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// });

// // Start the HTTP server
// const server = http.createServer(app);
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // WebSocket server setup
// const io = socketIo(server);

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });

//   // Handle game move
//   socket.on('move', (move) => {
//     // Broadcast the move to all connected clients
//     io.emit('move', move);
//   });
// });
