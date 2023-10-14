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
  id: Number,
  profilePic: String,
});

const User = mongoose.model('User', userSchema);

app.get('/getUser/:userName', (req, res) => {
    User.findOne({ username: req.params.userName }) // Use findOne instead of find
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

app.post('/newUser', (req, res) => {
    const data = req.body; // Extract data from the request body
    console.log(data.username)
    const newUser = new User({
        username : data.username,
        password : data.password,
        id : data.id,
        profilePic : data.profilePic,
    });
    newUser.save()
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
