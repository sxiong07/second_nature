/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// aws and s3
const {
  S3Client,
  PutObjectCommand,
  DeleteObject$,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// import models so we can interact with the database
const User = require("./models/user");
const Video = require("./models/video");

// import authentication library
const auth = require("./auth");

// YOUTUBE API
const googleApi = require("googleapis").google;
const youtubeApi = googleApi.youtube("v3");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const uploadvideo = require("./models/uploadvideo");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.post("/upload", auth.ensureLoggedIn, upload.single("video"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded" });
  }
  try {
    const key = `${req.user._id}/${Date.now()}_${req.file.originalname}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });
    await s3.send(command);
    const uploadvideo = require("./models/uploadvideo");
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    const video = new uploadvideo({
      userId: req.user._id,
      url: url,
      key: key,
      originalName: req.file.originalname,
    });
    await video.save();

    res.send({ url: url });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    res.status(500).send({ error: "Error uploading file" });
  }
});

const extractVideoID = (videoUrl) => {
  try {
    const url = new URL(videoUrl);

    if (url.hostname === "youtu.be") {
      return url.pathname.slice(1);
    } else if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
      return url.searchParams.get("v");
    }
  } catch (error) {
    console.error("Error extracting video ID:", error);
    return null;
  }
};

router.get("/videos", (req, res) => {
  Video.find({}).then((videos) => res.send(videos));
});

router.get("/videos/mine", async (req, res) => {
  const youtubeVideos = await Video.find({ userId: req.user._id });
  const uploadVideos = await uploadvideo.find({ userId: req.user._id });

  const formattedUploads = uploadVideos.map((vid) => ({
    _id: vid._id,
    type: "upload",
    title: vid.originalName,
    url: vid.url,
  }));

  const formattedYoutubeVideos = youtubeVideos.map((vid) => ({
    _id: vid._id,
    type: "youtube",
    title: vid.title,
    youtubeId: vid.id,
    thumbnail: vid.thumbnail,
  }));

  res.send([...formattedYoutubeVideos, ...formattedUploads]);
});

router.post("/videos", async (req, res) => {
  const videoId = extractVideoID(req.body.videoUrl);

  const exist = await Video.findOne({ id: videoId, userId: req.user._id });

  if (exist) {
    return res.status(200).send(exist);
  }

  const response = await youtubeApi.videos.list({
    key: process.env.YOUTUBE_API,
    part: "snippet,contentDetails,statistics",
    id: videoId,
  });

  const vid = response.data.items[0];

  if (!vid) {
    return res.status(404).send({ error: "Video not found" });
  }

  const newVideo = new Video({
    id: videoId,
    title: vid.snippet.title,
    thumbnail: vid.snippet.thumbnails.default.url,
    userId: req.user._id,
  });

  newVideo.save().then((video) => res.send(video));
});

router.delete("/videos/:id", async (req, res) => {
  const { type } = req.query;
  if (type === "youtube") {
    await Video.deleteOne({ _id: req.params.id, userId: req.user._id });
  } else {
    const vid = await uploadvideo.findById(req.params.id);

    if (vid) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: vid.key,
        })
      );
      await vid.deleteOne();
    }
  }

  res.send({ success: true });
});

router.delete("/videos", async (req, res) => {
  await Video.deleteMany({ userId: req.user._id });
  await uploadvideo.deleteMany({ userId: req.user._id });
  res.send({ success: true });
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
