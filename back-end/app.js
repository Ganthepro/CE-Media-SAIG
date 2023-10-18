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
  src: String,
  profilePic: String,
});

const postLikeAndCommentSchema = new Schema({
  id: String,
  username: String,
  likeNum: Number,
  whoLike: Array,
  commentNum: Number,
  comments: Array,
});

const User = mongoose.model("User", userSchema, "users");
const UserPublic = mongoose.model("UserPublic", publicSchema, "publicData");
const Post = mongoose.model("Post", postSchema, "posts");
const Video = mongoose.model("Video", postSchema, "videos");
const PostLikeAndComment = mongoose.model(
  "PostLikeAndComment",
  postLikeAndCommentSchema,
  "postLikeAndComment"
);

app.get("/loginGoogle/:input", (req, res) => {
  UserPublic.findOne({ username: req.params.input }) // Use findOne instead of find
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.send("User not found");
      }
      console.log("User found:", user);
      return res.json(user);
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
  UserPublic.findOne({
    $or: [{ id: req.params.input }, { username: req.params.input }],
  })
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

app.get("/getUserPost/:username", (req, res) => {
  Post.find({ username: req.params.username })
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
})

app.get("/getUserVideo/:username", (req, res) => {
  Video.find({ username: req.params.username })
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
})

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

app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserPublic.find({}).exec();
    console.log("All users:", users);
    return res.json(users);
  } catch (err) {
    console.error("Error querying for users:", err);
    return res.status(500).json({ error: "Error querying for users" });
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

app.post(
  "/postVideo/:id",
  uploadPostVideo.single("video"),
  async (req, res) => {
    const data = JSON.parse(req.body.jsonData);
    const file = req.file;
    const newVideo = new Video({
      title: data.title,
      description: data.description,
      username: data.username,
      id: req.params.id,
      src: `/${req.params.id}${path.extname(file.originalname)}`,
      profilePic: data.profilePic,
    });
    await newVideo
      .save()
      .then((result) => {
        console.log("New video saved:", result);
        return res.send("Save successfully");
      })
      .catch((err) => {
        console.error("Error saving video:", err);
        return res.status(500).json({ error: "Error saving video" });
      });
    AddLikeAndComment(req.params.id,data.username);
  }
);

app.post("/postImage/:id", uploadPostPic.single("image"), async (req, res) => {
  const data = JSON.parse(req.body.jsonData);
  const file = req.file;
  const newPost = new Post({
    title: data.title,
    description: data.description,
    username: data.username,
    id: req.params.id,
    src: `/${req.params.id}${path.extname(file.originalname)}`,
    profilePic: data.profilePic,
  });
  await newPost
    .save()
    .then((result) => {
      console.log("New post saved:", result);
      return res.send("Save successfully");
    })
    .catch((err) => {
      console.error("Error saving post:", err);
      return res.status(500).json({ error: "Error saving post" });
    });
  AddLikeAndComment(req.params.id,data.username);
});

async function checkImage(id) {
  let im = null;
  await UserPublic.findOne({ id: id })
    .then((user) => {
      if (!user) {
        console.log("old image not found");
        return;
      }
      console.log("old image found");
      im = user.profilePic;
      return;
    })
    .catch((err) => {
      console.error("Error querying image:", err);
    });
  return im;
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
        return;
      }
      console.log("image found");
    })
    .catch((err) => {
      console.error("Error querying image:", err);
    });
}

app.post(
  "/uploadProfilePic/:id",
  uploadProfile.single("image"),
  async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file provided" });
    const oldIm = await checkImage(req.params.id);
    console.log(oldIm);
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
    deleteOldProfilePic(oldIm);
  }
);

app.get("/getPostData/:id", (req, res) => {
  PostLikeAndComment.findOne({ id: req.params.id })
    .then((user) => {
      if (!user) {
        console.log("post not found");
        return res.send("post not found");
      }
      console.log("post found:", user);
      return res.json(user);
    })
    .catch((err) => {
      console.error("Error querying post:", err);
      return res.send("Internal Server Error"); // Handle the error
    });
});

app.get("/getPost", async (req, res) => {
  try {
    const posts = await Post.find({}).exec();
    console.log("All posts:", posts);
    return res.json(posts);
  } catch (err) {
    console.error("Error querying for posts:", err);
    return res.status(500).json({ error: "Error querying for posts" });
  }
});

app.get("/getVideo", async (req, res) => {
  try {
    const videos = await Video.find({}).exec();
    console.log("All videos:", videos);
    return res.json(videos);
  } catch (err) {
    console.error("Error querying for videos:", err);
    return res.status(500).json({ error: "Error querying for videos" });
  }
});

app.get("/likeNcomment/:id", (req, res) => {
  PostLikeAndComment.findOne({ id: req.params.id })
    .then((user) => {
      if (!user) {
        console.log("post not found");
        return res.send("post not found");
      }
      console.log("post found:", user);
      return res.json(user);
    })
    .catch((err) => {
      console.error("Error querying post:", err);
      return res.send("Internal Server Error"); // Handle the error
    });
});

function AddLikeAndComment(id,username) {
  const newLikeAndComment = new PostLikeAndComment({
    id: id,
    likeNum: 0,
    whoLike: [],
    commentNum: 0,
    comments: {},
    username: username,
  });
  newLikeAndComment
    .save()
    .then((result) => {
      console.log("New postLikeAndComment saved:", result);
      return;
    })
    .catch((err) => {
      console.error("Error saving postLikeAndComment:", err);
      return;
    });
}

app.post("/addNewComment/:id", async (req, res) => {
  const data = req.body;
  console.log(data);
  await PostLikeAndComment.findOneAndUpdate(
    { id: req.params.id },
    {
      $push: {
        comments: {
          comment: data.comment,
          username: data.username,
          profilePic: data.profilePic,
        },
      },
      $inc: { commentNum: 1 },
    },
    { new: true }
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

async function deletePostAndLike(id) {
  await PostLikeAndComment.findOneAndDelete({id: id });
}

app.delete("/deletePost", async (req, res) => {
  const data = req.body
  await Post.findOneAndDelete({id: data.id })
  await deletePostAndLike(data.id)
  res.send("Deleted!")
});

app.delete("/deleteVideo", async (req, res) => {
  const data = req.body
  await Video.findOneAndDelete({id: data.id })
  await deletePostAndLike(data.id)
  res.send("Deleted!")
});

app.get("/addNewLike/:id/:username", async (req, res) => {
  let flag = false;
  await PostLikeAndComment.findOne({ id: req.params.id })
    .then((user) => {
      if (!user) {
        console.log("post not found");
      }
      console.log("post found:", user);
      if (user.whoLike.includes(req.params.username)) flag = true;
    })
    .catch((err) => {
      console.error("Error querying post:", err);
    });
  if (!flag) {
    PostLikeAndComment.findOneAndUpdate(
      { id: req.params.id },
      {
        $inc: { likeNum: 1 },
        $push: { whoLike: req.params.username },
      },
      { new: true }
    )
      .then((result) => {
        console.log("Documents updated:", result);
        res.send("Update successful");
      })
      .catch((err) => {
        console.error("Error updating documents:", err);
        res.status(500).json({ error: "Error updating documents" });
      });
  }
});

app.listen(5500, () => console.log("Server started on port 5500"));