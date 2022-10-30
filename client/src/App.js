import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
// import { ChakraProvider } from '@chakra-ui/react'


function App() {

  // For smooth transitioning between the pages

  const PageTransition = () => {

    const location = useLocation();

    return (
      <AnimatePresence mode='wait' >
        <Routes key={location.pathname} location={location}>
          <Route path='/' element={<Welcome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/radio' element={<Radio />} />
          <Route path='/videos' element={<Videos />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/home/playlist/:playlist_id&:playlist_name' element={<HomePlaylist />} />
          <Route path='/collections/playlist/:playlist_id&:playlist_name' element={<CollectionsPlaylist />} />
        </Routes>
      </AnimatePresence>
    )
  }


  return (
    // <ChakraProvider>
    <BrowserRouter >
      <div className="App">
        <SideBar />
        <TopBar />
        <PageTransition />
        <BottomBar />
      </div>
    </BrowserRouter>
    // </ChakraProvider>
  );
}

export default App;
