import { Navigate, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom'
import BottomBar from "./bottombar";
import Collections from './collections';
import Home from "./home";
import Profile from './profile';
import Radio from './radio';
import SideBar from "./sidebar";
import TopBar from "./topbar";
import Videos from './videos';
import { AnimatePresence } from "framer-motion"
import HomePlaylist from './homePlaylist';
import CollectionsPlaylist from './collectionsPlaylist';
import Signup from './signup';
import Login from './login';
import { useAuthContext } from './hooks/useAuthContext';
import LandingPage from './landingPage';
import Navbar from './navbar';
import GenrePlaylist from './genrePlaylist';


function App() {

  const { user } = useAuthContext()

  const LayoutUnauth = () => {
    return (
      <AnimatePresence mode='wait'>
        <div className="App">
          <Navbar />
          {user ? <Navigate to='/home' /> : <Outlet />} {/* Protecting Routes */}
        </div>
      </AnimatePresence>
    )
  }

  const LayoutAuth = () => {
    return (
      <AnimatePresence mode='wait'>
        <div className="App">
          <SideBar />
          <TopBar />
          {user ? <Outlet /> : <Navigate to='/login' />}  {/* Protecting Routes */}
          <BottomBar />
        </div>
      </AnimatePresence>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutUnauth />,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
      ]
    },
    {
      path: '/',
      element: <LayoutAuth />,
      children: [
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/collections',
          element: <Collections />
        },
        {
          path: '/radio',
          element: <Radio />
        },
        {
          path: '/videos',
          element: <Videos />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/home/playlist/:playlist_id',
          element: <HomePlaylist />
        },
        {
          path: '/home/genre/:genre_id',
          element: <GenrePlaylist />
        },
        {
          path: '/collections/playlist/:playlist_id',
          element: <CollectionsPlaylist />
        },
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App;
