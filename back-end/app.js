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
            return res.send('User not found');
        }
        console.log('User found:', user);
        return res.json(user); // Send the user data as JSON
    })
    .catch((err) => {
        console.error('Error querying user:', err);
        return res.send('Internal Server Error'); // Handle the error
    });
});

app.get('/login/:user/:pass',async (req, res) => {
    let flag = false
    const { user, pass } = req.params; 
    await User.findOne({ username: user, password: pass })
        .then((user) => {
            if (!user) {
                console.log('User not found');
                flag = true
                return res.send("User not found");
            }
            console.log('User found:', user);
        })
        .catch((err) => {
            console.error('Error querying user:', err);
            return res.send('Internal Server Error');
    });
    if (!flag) {
        UserPublic.findOne({ username: user })
            .then((user) => {
                return res.json(user)
            })      
    }
});

app.get('/getPublic/:input', (req, res) => {
    UserPublic.findOne({ $or: [{ id: req.params.input }, { username: req.params.input }] })
    .then((user) => {
        if (!user) {
            console.log('User not found');
            return res.send('User not found');
        }
        console.log('User found:', user);
        return res.json(user); // Send the user data as JSON
    })
    .catch((err) => {
        console.error('Error querying user:', err);
        return res.send('Internal Server Error'); // Handle the error
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
        })
        .catch((err) => {
            console.error('Error saving user:', err);
        });
    newPublicData.save()
        .then((result) => {
            console.log('New user saved:', result);
            return res.json(result); // Respond with the saved user as JSON
        })
        .catch((err) => {
            console.error('Error saving user:', err);
            return res.json({ error: 'Internal Server Error' }); // Handle the error and respond with JSON
        });
});

app.put('/update', (req, res) => {
    const data = req.body;
    UserPublic.updateOne(
        { id: data.id },
        { $set: {sex: data.sex, country: data.country, description: data.description} }
    )
    .then(result => {
        console.log('Documents updated:', result);
        res.send('Update successful');
    })
    .catch(err => {
        console.error('Error updating documents:', err);
        res.status(500).json({ error: 'Error updating documents' });
    });
});


// Use Multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory for this example
const upload = multer({ storage: storage });

app.post('/uploadProfilePic', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.send('No file uploaded');
    }

    console.log('File uploaded:', req.file);
    return res.send('File uploaded');
});

app.listen(5500, () => console.log("Server started on port 5500"));
