import { render } from "preact";
import { Post } from "./post/post.jsx";
import { Video } from "./video/video.jsx";
import { Profile } from "./profile/profile.jsx";
import { Users } from "./users/users.jsx";
import BigCard from "./big_card.jsx";
import Comment from "./comment.jsx";
import Login from "./templent/login.jsx";
import EditProfile from "./templent/show-profile.jsx";
import User from "./users/user.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Post />, // <Post/>
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
]);

render(<RouterProvider router={router} />, document.getElementById("app"));
