import store from "@/store/data"
import axios from "axios"
import { useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function AddStudent({ setAddStudent,section }) {
  const {addStudent,updateSection} = store((state) => state)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const handleSave = async() => {
    try{
      const res = await axios.post(`${BACKEND_URL}/student/create`,{name,phone,email,pwd,section})
      if(res.status === 200){
      addStudent(res.data.student)
      updateSection(res.data.section)
      setAddStudent(false)}
    }
    catch(err){alert(err)}
  }
  return (
    <div className="fixed left-0 z-10 w-full h-[91vh] bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center top-[9vh]">
      <div className="w-[320px] sm:w-[360px] bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg dark:shadow-white/10 animate-fadeIn flex flex-col items-center justify-center">

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Add Student</h2>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter name :' className="w-full mb-3 px-3 py-2 rounded-md bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email :' className="w-full mb-3 px-3 py-2 rounded-md bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter phone no :' className="w-full mb-3 px-3 py-2 rounded-md bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input type='password' value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder='Enter password :' className="w-full mb-3 px-3 py-2 rounded-md bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />

        <div className="flex w-full gap-4 mt-4">
          <button onClick={() => setAddStudent(false)} className="w-1/2 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-red-600 font-semibold dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-red-400">Cancel</button>
          <button className="w-1/2 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
export default AddStudent