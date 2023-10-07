import { render } from 'preact'
import { Post } from './post/post.jsx'
import { SignIn } from './sign_in/sign_in.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Post />
    }
])

render(<RouterProvider router={router}/>, document.getElementById('app'))
