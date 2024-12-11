import React from 'react'
import './Navbar.module.css'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
<nav className="bg-[#DC143C]">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="">
      <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">MovieMedia</span>
    </Link>
    <div className=" w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse">
        <li>
          <NavLink to="WatchList" className="block py-2 px-3 text-white">WatchList</NavLink>
        </li>
        <li>
        <NavLink to="NowPlaying" className="block py-2 px-3 text-white ">NowPlaying</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>


    </>
  )
}
