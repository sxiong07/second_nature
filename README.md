# second nature (zhn_tsunami) - Ada, Grace, Shirley

## About

Second Nature is a movement-focused web platform designed to help you refine your skills through practice, reptition, and self-monitoring.

Practice side-by-side with uploaded or YouTube reference videos while viewing your own camera feed in real time. Break movements down using customizable playback tools, including looping the video, clipping specific segments, and adjusting playback speed.

Whether you're dancing, working out, or practicing an instrument, second nature helps you practice in sync and perfect your form.

## Features

- Five pages: Login/about, upload, play embedded youtube video, customize and playback uploaded video, profile/saved
- Google OAuth login + log out
- Input YouTube link -> play video with live camera
- Input uploaded video -> loop, change playback speed, clip
- Uploaded videos saved to s3bucket and URL saved in MongoDB
- Profile page with stats (Daily logins, number of current projects, join date)

## Citations

- NavBar CSS & javascript file modified from Web Lab Catbook tutorial
- Local storage for storing / remembering links: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage (not used in final product)
- Passing info between pages with location object: https://v5.reactrouter.com/web/api/location
- Uploading files: https://www.geeksforgeeks.org/reactjs/file-uploading-in-react-js/
- Youtube Data API: https://developers.google.com/youtube/v3
- AWS and s3bucket: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/
- Date to string: https://stackoverflow.com/questions/69542299/convert-date-to-month-year-using-javascript
