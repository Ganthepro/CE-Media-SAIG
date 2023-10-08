import { render } from 'preact'
import { Post } from './post/post.jsx'
import { Video } from './video/video.jsx'
import BigCard from './big_card.jsx'
import Comment from './comment.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <BigCard mode="pic"/>
        // element: <Comment/>
    }
])

render(<RouterProvider router={router}/>, document.getElementById('app'))
