import React, { useContext, useEffect } from 'react'
import './Home.module.css'
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WatchlistContext } from '../../Context/Add-to-list';
import toast from './../../../node_modules/react-hot-toast/src/index';


export default function Home() {
  let {addTOWatchlist}=useContext(WatchlistContext)
let [movie,setMovie]=useState([])
let [Search,setSearch]=useState([])
const [favorites, setFavorites] = useState(new Set());
function getMovie() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDAzYjcxMTUyYTQ1OTFhMGM1NjlhZWVjZjQyZjQxNyIsIm5iZiI6MTcyOTcxNTU5NS4xMTMsInN1YiI6IjY3MTk1ZDhiZmVmZDFlMDUxMGZmZDQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._wqTF-e_58X-NriHIheJfvR2Qqo2KMpNOTFioy9S_30'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res =>{
      setMovie(res.results)
      setSearch(res.results)
      
    
    }

  )
    .catch(err => console.error(err));
}

async function addList(id){
  let res =await addTOWatchlist(id)

    
if(res.success==true){
  toast.success('Successfully add!')
  setFavorites(prev => new Set(prev).add(id));
  getMovie()
}else{
  toast.success("Failed to add")
  getMovie()
}

}


function searchMovie(e) {
  console.log(e.target.value);
  if(e.target.value==""){
    setSearch(movie)
  }else{
    let mymovie =[...movie]
    let filter = mymovie?.filter((mov)=>{
      return mov.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setSearch(filter)

  }
  
}
  
    useEffect(()=>{
getMovie()
    },[])
  return (
    
    <>
    <div className="application">
            <Helmet>
                <title>UpComing...</title>
            </Helmet>
        </div>

        <h2 className='text-2xl p-5'>Upcoming</h2>
        <div className="flex flex-wrap w-[90%] m-auto">
        <input type="text" onChange={(e)=>{
          searchMovie(e)
        }} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-red-500" placeholder="Search..." required />
          {Search?.map((movie) => (
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
