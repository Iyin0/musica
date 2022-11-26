import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import BottomBar from "./bottombar";
import Collections from './collections';
import Home from "./home";
import Profile from './profile';
import Radio from './radio';
import SideBar from "./sidebar";
import TopBar from "./topbar";
import Videos from './videos';
import Welcome from './welcome';
import { AnimatePresence } from "framer-motion"
import HomePlaylist from './homePlaylist';
import CollectionsPlaylist from './collectionsPlaylist';
import Signup from './signup';
import Login from './login';
import { useAuthContext } from './hooks/useAuthContext';
import LandingPage from './landingPage';
// import { ChakraProvider } from '@chakra-ui/react'


function App() {

  const { user } = useAuthContext()

  // For smooth transitioning between the pages

  const PageTransition = () => {

    const location = useLocation();

    return (

      <AnimatePresence mode='wait' >
        <SideBar />
        <TopBar />
        <Routes key={location.pathname} location={location}>
          <Route path='/' element={<Welcome />} />
          <Route path='/home' element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path='/collections' element={user ? <Collections /> : <Navigate to="/login" />} />
          <Route path='/radio' element={user ? <Radio /> : <Navigate to="/login" />} />
          <Route path='/videos' element={user ? <Videos /> : <Navigate to="/login" />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path='/home/playlist/:playlist_id&:playlist_name' element={user ? <HomePlaylist /> : <Navigate to="/login" />} />
          <Route path='/collections/playlist/:playlist_id' element={user ? <CollectionsPlaylist /> : <Navigate to="/login" />} />
        </Routes>
        <BottomBar />
      </AnimatePresence>
    )
  }


  return (
    // <ChakraProvider>
    <BrowserRouter >
      {/* <div className="App"> */}
      {!user ? (
        <div>
          <Routes>
            <Route path='/' element={!user ? <LandingPage /> : <Navigate to="/" />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route exact path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
      ) : (
        <div className="App">
          <SideBar />
          <TopBar />
          <PageTransition />
          <BottomBar />
        </div>
      )}
      {/* </div> */}
    </BrowserRouter>
    // </ChakraProvider>
  );
}

export default App;
