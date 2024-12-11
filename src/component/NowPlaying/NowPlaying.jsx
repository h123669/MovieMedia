import React, { useContext, useEffect, useState } from 'react'
import './NowPlaying.module.css'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { WatchlistContext } from '../../Context/Add-to-list'
import toast from './../../../node_modules/react-hot-toast/src/index';


export default function NowPlaying() {
  let {addTOWatchlist}=useContext(WatchlistContext)
  const [favorites, setFavorites] = useState(new Set());

  let[list,setList]=useState([])
  function Nowplayine() {
    
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDAzYjcxMTUyYTQ1OTFhMGM1NjlhZWVjZjQyZjQxNyIsIm5iZiI6MTcyOTcxNTU5NS4xMTMsInN1YiI6IjY3MTk1ZDhiZmVmZDFlMDUxMGZmZDQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._wqTF-e_58X-NriHIheJfvR2Qqo2KMpNOTFioy9S_30'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        console.log(json.results);
        setList(json.results)
        
      })
      .catch(err => console.error(err));
  }
  async function addList(id){
    let res =await addTOWatchlist(id)
    console.log(res);
  
      
  if(res.success==true){
    toast.success('Successfully add!')
    setFavorites(prev => new Set(prev).add(id));

  }else{
    toast.success("Failed to add")
  }
  
  }

    useEffect(()=>{
      Nowplayine()
    },[])

  return (
    <>
    <div className="application">
            <Helmet>
                <title>Nowplaying</title>
            </Helmet>
        </div>

        <h2 className='text-2xl p-5'>NowPlaying</h2>
        <div className="flex flex-wrap w-[90%] m-auto">
          {list?.map((movie) => (
            <div className="w-full md:w-1/4 p-4" key={movie.id}>
            <Link to={`/movieDetails/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="rounded-md"
                  alt={movie.title}
                  />
                <h3 className="text-center">{movie.title}</h3>
                  </Link>
                <div className="flex justify-around items-center">
                  <span>{new Date(movie.release_date).toDateString()}</span>
                  <button className=" p-2 " onClick={()=>{
                    addList(movie.id)
                  }}>
                    <i className={` p-2 text-white rounded-full fa-regular fa-heart ${favorites.has(movie.id) ? 'bg-red-600' : 'bg-gray-400'}`}></i>
                    </button>
                </div>
              </div>
          ))}
      
        </div>
    </>
  )
}
