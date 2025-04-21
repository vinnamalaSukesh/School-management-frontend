import store from "@/store/data"
import axios from "axios"
import { useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function AddTeacher({ setAddTeacher }) {
  const {addTeacher} = store((state)=> state)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [qualification, setQualification] = useState('')
  const [pwd, setPwd] = useState('')

  const handleSave = async()=>{
    const res = await axios.post(`${BACKEND_URL}/teacher/create`,{name,email,pwd,phone,qualification})
    if(res.status === 200){
      addTeacher(res.data.teacher)
      setAddTeacher(false)
    }
  }
  return (
    <div className="fixed left-0 z-10 w-full h-[91vh] bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center top-[9vh]">
      <div className="w-[320px] sm:w-[360px] bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg dark:shadow-white/10 animate-fadeIn flex flex-col items-center justify-center">

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Add Teacher</h2>
        {[
          { label: "Enter name", state: name, setState: setName, type: "text" },
          { label: "Enter phone", state: phone, setState: setPhone, type: "text" },
          { label: "Enter email", state: email, setState: setEmail, type: "email" },
          { label: "Enter qualification", state: qualification, setState: setQualification, type: "text" },
          { label: "Enter password", state: pwd, setState: setPwd, type: "password" }
        ].map(({ label, state, setState, type }, idx) => (
          <input key={idx} type={type} value={state} onChange={(e) => setState(e.target.value)} placeholder={label} className="w-full mb-3 px-3 py-2 rounded-md bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
        ))}

        <div className="flex w-full gap-4 mt-4">
          <button onClick={() => setAddTeacher(false)} className="w-1/2 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-red-600 font-semibold dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-red-400">Cancel</button>
          <button className="w-1/2 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default AddTeacher
