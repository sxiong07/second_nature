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
const multer = require("multer"); // img storage

const upload = multer({ storage: multer.memoryStorage() });

// set up s3bucket
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

// POST single uploaded video route
router.post("/upload", auth.ensureLoggedIn, upload.single("video"), async (req, res) => {
  const key = `${req.user._id}/${Date.now()}_${req.file.originalname}`; // create key for s3
  const command = new PutObjectCommand({
    // prepare and upload to s3
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  });
  await s3.send(command);
  const uploadvideo = require("./models/uploadvideo");
  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`; // get url from s3, make vid object
  const video = new uploadvideo({
    userId: req.user._id,
    url: url,
    key: key,
    originalName: req.file.originalname,
  });
  await video.save();

  res.send({ url: url });
});

// from a youtube url, get the video id
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

// GET all videos
router.get("/videos/mine", async (req, res) => {
  const youtubeVideos = await Video.find({ userId: req.user._id }); // youtube vids
  const uploadVideos = await uploadvideo.find({ userId: req.user._id }); // uploaded vids

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

  // compile both youtube + uploaded for front end
  res.send([...formattedYoutubeVideos, ...formattedUploads]);
});

// POST single youtube video route
router.post("/videos", async (req, res) => {
  const videoId = extractVideoID(req.body.videoUrl);

  // first see if we've already saved it
  const exist = await Video.findOne({ id: videoId, userId: req.user._id });

  // no duplicates, return existing vid
  if (exist) {
    return res.status(200).send(exist);
  }

  // get youtube video from api
  const response = await youtubeApi.videos.list({
    key: process.env.YOUTUBE_API,
    part: "snippet,contentDetails,statistics",
    id: videoId,
  });

  const vid = response.data.items[0];

  if (!vid) {
    return res.status(404).send({ error: "Video not found" });
  }

  // make new youtube video entry
  const newVideo = new Video({
    id: videoId,
    title: vid.snippet.title,
    thumbnail: vid.snippet.thumbnails.default.url,
    userId: req.user._id,
  });

  newVideo.save().then((video) => res.send(video));
});

// DELETE single video route
router.delete("/videos/:id", async (req, res) => {
  const { type } = req.query; // either a youtube video or uploaded video
  if (type === "youtube") {
    // simply delete from mongodb
    await Video.deleteOne({ _id: req.params.id, userId: req.user._id });
  } else {
    // get id -> delete from s3 bucket -> delete from mongodb
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

// DELETE all videos route
router.delete("/videos", async (req, res) => {
  await Video.deleteMany({ userId: req.user._id });
  await uploadvideo.deleteMany({ userId: req.user._id });
  res.send({ success: true });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
