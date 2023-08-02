import React from 'react';
import { createBrowserRouter, RouterProvider, useRouteError, Link, Outlet, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
    console.log(React.useState())
    return (
        <>
            <Link to='/'>
                <button>Home</button>
            </Link>
            <Link to='/about'>
                <button>About</button>
            </Link>
            <Link to='/about/us'>
                <button>About Us</button>
            </Link>
            <Outlet />
            <h2>Footer</h2>
        </>
    );
}

const Home = () => {
    return (
        <>
            <h2>Home</h2>
        </>
    );
};

const About = () => {
    return (
        <>
            <h2>About</h2>
        </>
    );
};

const DynamicAbout = () => {
    const { id } = useParams();
    return (
        <>
            <h2>Dynamic About Id : {id}</h2>
        </>
    );
};

const AboutUs = () => {
    return (
        <>
            <h2>About Us</h2>
        </>
    );
};

const HomeError = () => {
    const err = useRouteError();
    return (
        <>
            <h2>Home Error</h2>
            <h3>{err.status} : {err.statusText}</h3>
        </>
    );
}

const AboutError = () => {
    return (
        <h2>About Error</h2>
    );
}

const AboutUsError = () => {
    return (
        <h2>About Us Error</h2>
    );
}

const appRoutes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <HomeError />,
        children: [
            {
                path: '/',
                element: <Home />,
                errorElement: <HomeError />,
            },
            {
                path: '/about',
                element: <About />,
                errorElement: <AboutError />,
            },
            {
                path: '/about/:id',
                element: <DynamicAbout />,
                errorElement: <AboutError />,
            },
            {
                path: '/about/us',
                element: <AboutUs />,
                errorElement: <AboutUsError />,
            },
        ]
    }
])

reactRoot.render(<RouterProvider router={appRoutes} />);