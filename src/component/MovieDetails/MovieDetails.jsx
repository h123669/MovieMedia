import React, { useContext, useEffect, useState } from 'react'
import './MovieDetails.module.css'
import { useParams } from 'react-router-dom';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { WatchlistContext } from '../../Context/Add-to-list';


export default function MovieDetails() {
  let {addTOWatchlist}=useContext(WatchlistContext)
  async function addList(id){
    let res =await addTOWatchlist(id)
    console.log(res);
  
      
  if(res.success==true){
    toast.success('Successfully add!')
  }else{
    toast.success("Failed to add")
  }
  
  }

  let {id}=useParams()
  let [details,setdetails]=useState("")
  async function addList(id){
    let res =await addTOWatchlist(id)
    console.log(res);
  
      
  if(res.success==true){
    toast.success('Successfully add!')
  }else{
    toast.success("Failed to add")
  }
  
  }
  
  
  function getDetails() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDAzYjcxMTUyYTQ1OTFhMGM1NjlhZWVjZjQyZjQxNyIsIm5iZiI6MTcyOTcxNTU5NS4xMTMsInN1YiI6IjY3MTk1ZDhiZmVmZDFlMDUxMGZmZDQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._wqTF-e_58X-NriHIheJfvR2Qqo2KMpNOTFioy9S_30'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then(res => res.json())
      .then(res => {
        setdetails(res)
      })
      .catch(err => console.error(err));
  }
  useEffect(()=>{
    getDetails()
  })
  return (
    <>
    <div className='flex flex-wrap w-[90%] m-auto overflow-hidden sm:flex-col lg:flex-row xl:flex-row md:flex-row'>
      <div className='w-full md:w-1/2 p-5'>
      <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} className='rounded-md' alt="" />
      </div>
      <div className='w-full md:w-1/2  p-5'>
        <h3 className='text-2xl'>{details.title}</h3>
        <p className='text-gray-700'>{details.overview}</p>
        <div className='flex gap-2'>{details?.genres?.map((ele)=>{ return(

          <h2 className='text-red-600 border border-gray-400 rounded-md p-1' key={ele.id}>{ele.name}</h2>
        )

        })}</div>

        <div className='flex flex-wrap m-3'> 
        {details?.production_companies?.map((ele)=>{
          return(

<img src={`https://image.tmdb.org/t/p/w500${ele.logo_path}`} className='w-[20%] p-2' alt="" key={ele.id} />
          )
        })
        }
        </div>
        <div className="flex justify-between items-center">
                  <div className='bg-yellow-400 p-2 text-white rounded-full '><i className='p-1 fa-regular fa-star'></i>{details?.vote_average?.toFixed(1)}</div>
                  <button className=" p-2 " onClick={()=>{
                    addList(details.id)
                  }}>
                    <i className="bg-red-600 p-2 text-white rounded-full fa-regular fa-heart"></i>
                  </button>
                </div>


      </div>
    </div>

    
    </>
  )
}
