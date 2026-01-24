import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Login from "./components/pages/Login";
import Upload from "./components/pages/Upload";
import NotFound from "./components/pages/NotFound";
import VideoCamera from "./components/pages/VideoCamera";
import VideoPlay from "./components/pages/VideoPlay";
import Profile from "./components/pages/Profile";
import Saved from "./components/pages/Saved";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "435083304248-2bhn941itlu7jf5v3e3sbfku67n99gjv.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/view" element={<VideoCamera />} />
      <Route path="/play" element={<VideoPlay />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
