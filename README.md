# second nature (zhn_tsunami) - Ada, Grace, Shirley

## About

second nature is a movement-focused web platform designed to help you refine your skills through practice, reptition, and self-monitoring.

Practice side-by-side with uploaded or YouTube reference videos while viewing your own camera feed in real time. Break movements down using customizable playback tools, including looping the video, clipping specific segments, and adjusting playback speed.

Whether you're dancing, working out, or practicing an instrument, second nature helps you practice in sync and perfect your form.

## MVP Progress

- All front-end pages besides saved & profile stats done
- Google OAuth login + log out implemented
- YouTube link -> play video & live camera page done
- Given an uploaded video, can loop + change playback speed + clip

## To Do:

- Upload videos to back end + MongoDB / Cloudinary DB if possible
- Record reference + live cam and save it
- Folder of saved project with tagging system
- Profile page of stats
- Daily login tracker
- Add favicon (client/dist/favicon.ico)

## [SAVED NOTES] Socket stuff

- If you're not using realtime updating or don't need server->client communication, you can remove socket entirely! (server-socket.js, client-socket.js, and anything that imports them)
- If you are using sockets, consider what you want to do with the FIXME in server-socket.js

## [SAVED NOTES] Edit at your own risk

the following files students do not need to edit. feel free to read them if you would like.

```
client/src/utilities.js
client/src/client-socket.js
server/validator.js
server/server-socket.js
.npmrc
.prettierrc
package-lock.json
vite.config.js
```

## Citations

NavBar CSS & javascript file modified from Web Lab Catbook tutorial
Local storage for storing / remembering links: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
Passing info between pages with location object: https://v5.reactrouter.com/web/api/location
Uploading files: https://www.geeksforgeeks.org/reactjs/file-uploading-in-react-js/
Cloudinary DB: https://cloudinary.com/documentation

## Good luck on your project :)
