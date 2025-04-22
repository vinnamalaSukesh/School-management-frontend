import store from "@/store/data"
import { faEye } from "@fortawesome/fontawesome-free-regular"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import AddTeacher from "./addTeacher"
import { UserRoundPlus } from "lucide-react"
import Teacher from "./teacher"
import teacher from './lottieTeacher.json';
import Lottie from "lottie-react";

function Teachers({ leftBar }) {
  const { teachers } = store((state) => state)
  const [addTeacher,setAddTeacher] = useState(false)
  const [id,setId] = useState()
  return (
    <div className={`flex flex-col ${leftBar ? 'w-[75%]' : 'w-full'} absolute right-0 top-[10vh] min-h-[90vh] px-4 dark:bg-zinc-900 transition-all duration-300`}>
      <button onClick={() => setAddTeacher(true)} className="flex items-center gap-5 px-8 py-3 w-[170px] sm:w-[200px] mx-auto my-3 bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-green-700 dark:text-green-100 font-semibold rounded-lg shadow-sm transition-all duration-200"><UserRoundPlus className="w-10 h-10" /><div className="flex flex-col text-lg"><div className="text-left">Add</div><div className="text-left">Teacher</div></div></button>
      <div className="flex items-start justify-center gap-10 ">
        <h1 className="text-2xl font-semibold text-red-700 dark:text-red-400 mt-3">Teachers List</h1>
        <div className="w-[150px] h-[150px] "><Lottie animationData={teacher} loop={true} /></div>
      </div>

      <div className="flex items-center justify-around w-full p-3 rounded-md bg-gray-100 dark:bg-zinc-800 font-semibold shadow-sm text-black dark:text-white relative top-[-70px]">
        <p className="text-center w-[90%] sm:w-[25%]">Name</p>
        <p className="text-center hidden sm:block w-[25%]">Phone</p>
        <p className="hidden lg:block text-center w-[25%]">Email</p>
        <p className="hidden xl:block text-center w-[15%]">Qualification</p>
        <div className="text-center w-[10%]">View</div>
      </div>

      {Object.keys(teachers).map((id) => (
        <div key={id} className="flex items-center justify-around w-full sm:p-3 p-2 m-1 sm:my-2 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white shadow hover:shadow-md transition-all duration-200">
          <p className="text-center w-[90%] sm:w-[25%]">{teachers[id]?.name}</p>
          <p className="text-center sm:block hidden w-[25%]">{teachers[id]?.phone}</p>
          <p className="hidden lg:block text-center w-[25%]">{teachers[id]?.email}</p>
          <p className="hidden xl:block text-center w-[15%]">{teachers[id]?.qualification}</p>
          <button className="text-center w-[10%] hover:scale-150 transition" onClick={()=>setId(id)}><FontAwesomeIcon icon={faEye} className="p-2" /></button>
        </div>
      ))}

      {addTeacher && <AddTeacher setAddTeacher={setAddTeacher}/>}
      {id && <Teacher id={id} setId={setId}/>}
    </div>
  )
}

export default Teachers
