import React, { useContext, useEffect, useState } from 'react'
import './WatchList.module.css'
import { Helmet } from 'react-helmet'
import { WatchlistContext } from './../../Context/Add-to-list';
import { Link } from 'react-router-dom';

export default function WatchList() {
  let[list,setList]=useState([])
  let{getWashList,DeleteWatchlist,favorites, setFavorites}=useContext(WatchlistContext)
  async function getmovie() {
    let res = await getWashList()
    setList(res.results)    
    getmovie();

    const movieIds = res.results.map((movie) => movie.id);
    setFavorites(new Set(movieIds));
    
  }

  async function deleteData(id) {
    let ress = await DeleteWatchlist(id)
    setFavorites((prev) => {
      const updatedFavorites = new Set(prev);
      updatedFavorites.delete(id);
      return updatedFavorites;
    });
    
  }


  useEffect(()=>{
    getmovie()
    
  },[])
  
  return (
    <>
    <div className="application">
            <Helmet>
                <title>WatchList</title>
            </Helmet>
      </div>



      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] m-auto">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr className='bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"'>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
        title
        </th>
        
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
  
    <tbody>
        {list?.map((watch)=>{ return (
          <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={watch.id}>
            <Link to={`../movieDetails/${watch.id}`} key={list.id}>
        <td className="px-16 py-3">
          <img src=  {`https://image.tmdb.org/t/p/w500${watch.backdrop_path}`}  className="w-32 md:w-64 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-3 font-semibold text-gray-900 dark:text-white ">
          {watch.title}
        </td>
      
          </Link>
        <td className="px-6 py-3">
          <button onClick={()=>{
            deleteData(watch.id)
            
          }} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
      </tr>
)
        })}
    
    </tbody>
  </table>
</div>

    </>
  )
}
