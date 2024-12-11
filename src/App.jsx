import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home';
import WatchList from './component/WatchList/WatchList';
import NowPlaying from './component/NowPlaying/NowPlaying';
import MovieDetails from './component/MovieDetails/MovieDetails';
import { WatchlistProvider } from './Context/Add-to-list'
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';


function App() {

let x= createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {index:true,element:<Home/>},{
      path:"WatchList",element:<WatchList/>
    },{
      path:"NowPlaying",element:<NowPlaying/>
    },{
      path:"movieDetails/:id",element:<MovieDetails/>
    }
  ]}
])
  const [count, setCount] = useState(0)

  return (
    <>
  <WatchlistProvider>
  <RouterProvider router={x}>
  </RouterProvider>
    <Toaster></Toaster>

  </WatchlistProvider>
    </>
  )
}

export default App
