const express = require("express");
const multer = require("multer");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use(express.json());
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/UserPass', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  id: String,
});

const publicSchema = new Schema({
  description: String,
  sex: String,
  country: String,
  id: String,
  profilePic: String,
  username: String,
});

const User = mongoose.model('User', userSchema, "users");
const UserPublic = mongoose.model('UserPublic', publicSchema, "publicData");

app.get('/loginGoogle/:input', (req, res) => {
    User.findOne({ username: req.params.input }) // Use findOne instead of find
    .then((user) => {
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }
        console.log('User found:', user);
        res.json(user); // Send the user data as JSON
    })
    .catch((err) => {
        console.error('Error querying user:', err);
        res.status(500).send('Internal Server Error'); // Handle the error
    });
});

app.get('/login/:user/:pass', (req, res) => {
    const { user, pass } = req.params; 
    User.findOne({ username: user, password: pass })
        .then((user) => {
            if (!user) {
            console.log('User not found');
            res.send(false);
            }
            console.log('User found:', user);
        })
        .catch((err) => {
            console.error('Error querying user:', err);
            res.status(500).send('Internal Server Error');
        });
    UserPublic.findOne({ username: user })
        .then((user) => {
        if (!user) {
            console.log('User not found');
            res.send(false);
        }
        res.json(user)
        })
        .catch((err) => {
        console.error('Error querying user:', err);
        res.status(500).send('Internal Server Error');
        });
});

app.get('/getPublic/:input', (req, res) => {
    UserPublic.findOne({ $or: [{ id: req.params.input }, { username: req.params.input }] })
    .then((user) => {
        if (!user) {
            console.log('User not found');
            return res.send('User not found');
        }
        console.log('User found:', user);
        res.json(user); // Send the user data as JSON
    })
    .catch((err) => {
        console.error('Error querying user:', err);
        res.status(500).send('Internal Server Error'); // Handle the error
    });
})

app.post('/newUser', (req, res) => {
    const data = req.body;
    const newUser = new User({
        username : data.username,
        password : data.password == null ? "qwertyuiop" : data.password,
        id : data.id,
    });
    const newPublicData = new UserPublic({
        description: "-",
        sex: "-",
        country: "-",
        id : data.id,
        profilePic : data.profilePic,
        username : data.username,
    })
    newUser.save()
        .then((result) => {
            console.log('New user saved:', result);
            res.status(201).json(result); // Respond with the saved user as JSON
        })
        .catch((err) => {
            console.error('Error saving user:', err);
            res.status(500).json({ error: 'Internal Server Error' }); // Handle the error and respond with JSON
        });
    newPublicData.save()
        .then((result) => {
            console.log('New user saved:', result);
            res.status(201).json(result); // Respond with the saved user as JSON
        })
        .catch((err) => {
            console.error('Error saving user:', err);
            res.status(500).json({ error: 'Internal Server Error' }); // Handle the error and respond with JSON
        });
});

// Use Multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory for this example
const upload = multer({ storage: storage });

app.post('/uploadProfilePic', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    console.log('File uploaded:', req.file);
    res.status(200).send('File uploaded');
});

app.listen(5500, () => console.log("Server started on port 5500"));
