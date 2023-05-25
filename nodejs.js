// ===== Fullstack test complete =====
// For dataBase you can use MongoAtlas.
// 6) For Node JS
// 1) use Passport.js for User creation and authentication
// 2) Add middleware for Token
// 3) Example for Promise.all, resolve , reject
// 4) Example for Aggregate Lookup property
// 5) Example for populate on a array field (where show ref id in a array)
// 6) 4-5 Socket emit and On function example including socket connection .
// 7) Add indexing for Schema's

// Using Passport.js for User Creation and Authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

// Configure passport to use the LocalStrategy for authentication
passport.use(new LocalStrategy(User.authenticate()));

// Register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.register(new User({ username }), password, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'User registered successfully' });
    }
  });
});

// Authenticate a user
app.post('/login', passport.authenticate('local'), (req, res) => {
  // Authentication successful, handle the response
  res.json({ message: 'Authentication successful' });
});


//Adding Middleware for Token:
const jwt = require('jsonwebtoken');

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

//  route using the authenticateToken middleware
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted to protected route' });
});

// Promise.all, resolve, and reject:
const promise1 = Promise.resolve('Resolved value 1');
const promise2 = new Promise((resolve) => setTimeout(resolve, 2000, 'Resolved value 2'));
const promise3 = Promise.reject(new Error('Promise rejected'));

Promise.all([promise1, promise2])
  .then((results) => {
    console.log(results); // ['Resolved value 1', 'Resolved value 2']
  })
  .catch((error) => {
    console.log(error);
  });

Promise.all([promise1, promise3])
  .then((results) => {
    console.log(results); // This won't be executed
  })
  .catch((error) => {
    console.log(error); // Error: Promise rejected
  });

// Aggregate Lookup Property
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const PostSchema = new mongoose.Schema({
  title: String,
  content: String
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

// Use aggregate to perform a lookup on the 'posts' array field
User.aggregate([
  { $match: { username: 'john' } },
  { $lookup: { from: 'posts', localField: 'posts', foreignField: '_id', as: 'posts' } }
])
  .exec((err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });

// Example for Populating an Array Field:

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', UserSchema);

// Populate the 'friends' array field with referenced user documents
User.findOne({ username: 'john' })
  .populate('friends')
  .exec((err, user) => {
    if (err) {
      console.error(err);
    } else {
      console.log(user);
    }
  });


// 4-5 Socket Emit and On Function Examples, Including Socket Connection:
// Server-side code
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Example 1: Emitting a message from server to client
  socket.emit('message', 'Hello from server');

  // Example 2: Receiving a message from client
  socket.on('message', (data) => {
    console.log('Received message:', data);
  });

  // Example 3: Broadcasting a message to all connected clients
  socket.on('broadcast', (data) => {
    socket.broadcast.emit('message', data);
  });

  // Example 4: Handling disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

//Adding Indexing for Schemas:
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

userSchema.index({ username: 1, email: 1 }); // Indexing multiple fields

const User = mongoose.model('User', userSchema);

// Example usage of indexed query
User.find({ username: 'john' }).exec((err, users) => {
  if (err) {
    console.error(err);
  } else {
    console.log(users);
  }
});
