import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { Form } from './Templates/Math/index.tsx';
import { Auth } from './Templates/Auth/index.tsx';
import Logout from './Templates/Logout/index.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Auth />,
    },
    {
        path: "/math",
        element: <Form />,
    },
    {
        path: "/logout",
        element: <Logout />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
