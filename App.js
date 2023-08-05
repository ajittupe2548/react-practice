import React from 'react';
import { createBrowserRouter, RouterProvider, useRouteError, Link, Outlet } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Home, About } from './FunctionComponent';
import { HomeClass, AboutClass } from './ClassComponent';

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
    return (
        <>
            <Link to='/'>
                <button>Home</button>
            </Link>
            <Link to='/about'>
                <button>About</button>
            </Link>
            <Link to='/homeClass'>
                <button>Home Class</button>
            </Link>
            <Link to='/aboutClass'>
                <button>About Class</button>
            </Link>
            <Outlet />
        </>
    );
}

const Error = () => {
    const err = useRouteError();
    return (
        <>
            <h2>Home Error</h2>
            <h3>{err.status} : {err.statusText}</h3>
        </>
    );
}

const appRoutes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/homeClass',
                element: <HomeClass />,
            },
            {
                path: '/aboutClass',
                element: <AboutClass />,
            },
        ]
    }
])

reactRoot.render(<RouterProvider router={appRoutes} />);