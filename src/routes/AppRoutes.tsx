import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Notes from '../pages/Notes';
import Register from '../pages/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/notes',
        element: <Notes />
    }
]);

const AppRoutes: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
