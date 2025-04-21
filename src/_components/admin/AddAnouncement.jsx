import store from "@/store/data"
import axios from "axios"
import { useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function AddAnnouncement({ setAddAnnouncement }) {
  const { addAnnouncement } = store((state)=> state)
  const [text,setText] = useState('')
  const [to,setTo] = useState('All')
  const handleSave = async()=>{
    const res = await axios.post(`${BACKEND_URL}/announcement/create`,{text})
    addAnnouncement(res.data.announcement)
    setAddAnnouncement(false)
  }
  return (
    <div className="fixed inset-0 top-[10vh] z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 w-[90%] sm:w-[400px] p-6 rounded-xl shadow-lg dark:shadow-white/10 transition-all animate-fadeIn">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">Add Announcement</h2>
        <input className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Enter announcement..." value={text} onChange={(e)=>setText(e.target.value)}/>
        <div className="flex w-full items-center justify-center mt-3">
          <p className="w-1/2 text-center">Visible to :</p>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="w-1/2 p-2 shadow-[0px_0px_3px_black] dark:shadow-[0px_0px_3px_white] rounded-sm text-left">
            <option value='All' className="dark:bg-zinc-900">All</option>
            <option value='Teachers' className="dark:bg-zinc-900">Teachers only</option>
            <option value='Students' className="dark:bg-zinc-900">Students only</option>
          </select>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button onClick={()=>setAddAnnouncement(false)} className="w-1/2 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-red-600 font-semibold dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-red-400">Cancel</button>
          <button onClick={handleSave} className="w-1/2 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">Save</button>
        </div>
      </div>
    </div>
  );
}


export default AddAnnouncement
