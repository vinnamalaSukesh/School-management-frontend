import store from "@/store/data"
import axios from "axios"
import { useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function AddSubject({ sect, setAddSubject }) {
  const { subjects, teachers, updateSection } = store((state)=> state)
  const [subject, setSubject] = useState("")
  const [teacher,setTeacher] = useState("")
  console.log(subject,teacher)
  const handleSave = async() => {
    if (subject !== null) {
      const res = await axios.post(`${BACKEND_URL}/class/subject`,{section : sect,subject,teacher})
      if(res.status === 200){
        updateSection(res.data.section)
        setAddSubject(false)
      }
    } else {
      alert("Please select a subject.")
    }
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 w-full max-w-xl space-y-4">
        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white">Add Subject to Section</h2>
        <div className="w-full items-center justify-center gap-5 flex">
          <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="p-2 border-2 rounded-sm">
            <option className="dark:bg-black">Select subject</option>
            {Object.keys(subjects).map((id) =>
              <option key={id} value={id} className="dark:bg-zinc-800 dark:text-white">{subjects[id]?.name}</option>)}
          </select>

          <select value={teacher} onChange={(e) => setTeacher(e.target.value)} className="p-2 border-2 rounded-sm">
            <option className="dark:bg-black dark:text-white">Select teacher</option>
            {Object.keys(teachers).map((id) =>
              <option key={id} value={id} className="dark:bg-zinc-800 dark:text-white">{teachers[id]?.name}</option>)}
          </select>
        </div>
        <div className="flex justify-between">
          <button onClick={() => setAddSubject(false)} className="text-red-700 font-semibold px-4 py-2 bg-red-100 rounded-sm">Close</button>
          <button onClick={handleSave} className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700`} disabled={!subject}>Save Class</button>
        </div>
      </div>
    </div>
  )
}

export default AddSubject
