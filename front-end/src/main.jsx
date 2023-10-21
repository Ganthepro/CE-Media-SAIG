import { render } from "preact";
import { Post } from "./post/post.jsx";
import { Video } from "./video/video.jsx";
import { Profile } from "./profile/profile.jsx";
import { Users } from "./users/users.jsx";
import { Upload } from "./upload/upload.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Post />,
  },
  { path: "/profile", element: <Profile /> },
  {
    path: "/video",
    element: <Video />,
  },
  {
    path: "/user",
    element: <Users />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
]);

render(<RouterProvider router={router} />, document.getElementById("app"));
