import React, { useState } from 'react'
import { GrTask } from "react-icons/gr";
import { IoIosContact } from "react-icons/io";
import { GoTasklist } from "react-icons/go";
import { FaStar } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";



const Sidebar = () => {
const [menu,setmenu]= useState(false)

  return (
   <>
  
   <div className='flex flex-col gap-7 w-[15vw] h-[100vh]' >   

    <header className='flex gap-1 text-xl'> <div className='relative top-[0.6rem] left-[0.4rem] text-3xl'> <IoIosContact /> </div> 
     <div className='relative top-[0.6rem] left-[1rem]'>
     User1 </div> </header>
   
   <div className='flex  flex-col gap-1'>
<div className='flex gap-2 items-center'> 
    <div> <GrTask /> </div>
<div>
  Completed</div>
   </div>

<div className='flex gap-1.5 items-center'>  
    <div> <GoTasklist /> </div>
<div>
  Tasks</div> </div>
<div className='flex gap-1.5 items-center'>  
    <div> <FaStar /> </div>
<div>
  Important</div> </div>



   </div>
   
   <footer className='flex gap-10 relative top-[22rem]'>
   <div className='flex gap-1.5 items-center text-xl'>   
   <div> <CiSettings /> </div>
<div>
  Settings</div> </div>
    <div className='flex gap-1.5 items-center'>   
   <div> <IoExitOutline /> </div>
<div>
 Close</div> </div>
   </footer>
   </div>  
   </>
  )
}

export default Sidebar