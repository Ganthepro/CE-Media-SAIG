const express = require("express");
const multer = require("multer");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../front-end")));

mongoose
  .connect("mongodb://127.0.0.1:27017/UserPass", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
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

const postSchema = new Schema({
  title: String,
  description: String,
  username: String, 
  id: String,
  scr: String,
})

const User = mongoose.model("User", userSchema, "users");
const UserPublic = mongoose.model("UserPublic", publicSchema, "publicData");
const Post = mongoose.model("Post", postSchema, "posts");
const Video = mongoose.model("Video", postSchema, "videos");

app.get("/loginGoogle/:input", (req, res) => {
  UserPublic.findOne({ username: req.params.input }) // Use findOne instead of find
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.send("User not found");
      }
      console.log("User found:", user);
      return res.json(user)
    })
    .catch((err) => {
      console.error("Error querying user:", err);
      return res.send("Internal Server Error"); // Handle the error
    });
});

app.get("/login/:user/:pass", async (req, res) => {
  let flag = false;
  const { user, pass } = req.params;
  await User.findOne({ username: user, password: pass })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        flag = true;
        return res.send("User not found");
      }
      console.log("User found:", user);
    })
    .catch((err) => {
      console.error("Error querying user:", err);
      return res.send("Internal Server Error");
    });
  if (!flag) {
    UserPublic.findOne({ username: user }).then((user) => {
      return res.json(user);
    });
  }
});

app.get("/getPublic/:input", (req, res) => {
  UserPublic.findOne({ $or: [{ id: req.params.input }, { username: req.params.input }] })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.send("User not found");
      }
      console.log("User found:", user);
      return res.json(user); // Send the user data as JSON
    })
    .catch((err) => {
      console.error("Error querying user:", err);
      return res.send("Internal Server Error"); // Handle the error
    });
});

app.post("/newUser", (req, res) => {
  const data = req.body;
  const newUser = new User({
    username: data.username,
    password: data.password == null ? "qwertyuiop" : data.password,
    id: data.id,
  });
  const newPublicData = new UserPublic({
    description: "-",
    sex: "-",
    country: "-",
    id: data.id,
    profilePic: data.profilePic,
    username: data.username,
  });
  newUser
    .save()
    .then((result) => {
      console.log("New user saved:", result);
    })
    .catch((err) => {
      console.error("Error saving user:", err);
    });
  newPublicData
    .save()
    .then((result) => {
      console.log("New user saved:", result);
      return res.json(result); // Respond with the saved user as JSON
    })
    .catch((err) => {
      console.error("Error saving user:", err);
      return res.json({ error: "Internal Server Error" }); // Handle the error and respond with JSON
    });
});

app.put("/update", (req, res) => {
  const data = req.body;
  UserPublic.updateOne(
    { id: data.id },
    {
      $set: {
        sex: data.sex,
        country: data.country,
        description: data.description,
      },
    }
  )
    .then((result) => {
      console.log("Documents updated:", result);
      res.send("Update successful");
    })
    .catch((err) => {
      console.error("Error updating documents:", err);
      res.status(500).json({ error: "Error updating documents" });
    });
});

app.get('/getUsers', async (req, res) => {
  try {
    const users = await UserPublic.find({}).exec();
    console.log('All users:', users);
    return res.json(users);
  } catch (err) {
    console.error('Error querying for users:', err);
    return res.status(500).json({ error: 'Error querying for users' });
  }
});

const storageProfile = multer.diskStorage({
  destination: path.join("../front-end/public", "profilePic"), // Define the destination folder
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storagePostPic = multer.diskStorage({
  destination: path.join("../front-end/public", "postFolder"), // Define the destination folder
  filename: (req, file, cb) => {
    cb(null, req.params.id + path.extname(file.originalname));
  },
});

const storagePostVideo = multer.diskStorage({
  destination: path.join("../front-end/public", "videoFolder"), // Define the destination folder
  filename: (req, file, cb) => {
    cb(null, req.params.id + path.extname(file.originalname));
  },
});

const uploadProfile = multer({ storage: storageProfile });
const uploadPostPic = multer({ storage: storagePostPic });
const uploadPostVideo = multer({ storage: storagePostVideo });

app.post("/postVideo/:id",) // แก้ต่อ

app.post("/postImage/:id",uploadPostPic.single("image"), async (req, res) => {
  const data = JSON.parse(req.body.jsonData);
  const file = req.file;
  const newPost = new Post({
    title: data.title,
    description: data.description,
    username: data.username, 
    id: req.params.id,
    scr: `/${req.params.id}${path.extname(file.originalname)}`,
  });
  await newPost
    .save()
    .then((result) => {
      console.log("New post saved:", result);
      return res.send("Save successfully")
    })
    .catch((err) => {
      console.error("Error saving post:", err);
      return res.status(500).json({ error: "Error saving post" });
    });
})

async function checkImage(id) {
    let im = null
    await UserPublic.findOne({ id: id })
      .then((user) => {
        if (!user) {
          console.log("old image not found");
          return
        }
        console.log("old image found");
        im = user.profilePic
        return 
      })
      .catch((err) => {
        console.error("Error querying image:", err);
      });
    return im
}

function deleteOldProfilePic(im) {
  UserPublic.findOne({ profilePic: im })
    .then((user) => {
      if (!user) {
        console.log("image not found");
        const filePath = `../front-end/public/profilePic${im}`;
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err);
          console.log("File deleted successfully : " + im);
        });
        return
      }
      console.log("image found");
    })
    .catch((err) => {
      console.error("Error querying image:", err);
    });
}

app.post("/uploadProfilePic/:id", uploadProfile.single("image"), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file provided" });
    const oldIm = await checkImage(req.params.id);
    console.log(oldIm)
    await UserPublic.updateOne(
        { id: req.params.id },
        { profilePic: "/" + file.originalname }
    )
        .then((result) => {
            console.log("Documents updated:", result);
            res.json({ message: "Image uploaded successfully" });
        })
        .catch((err) => {
            console.error("Error updating documents:", err);
            res.status(500).json({ error: "Error updating documents" });
        });
    deleteOldProfilePic(oldIm)
});

app.listen(5500, () => console.log("Server started on port 5500"));
