import store from "@/store/data";
import mike from './mike.json';
import Lottie from "lottie-react";
import { BellPlus } from "lucide-react";
import AddAnouncement from "./AddAnouncement";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/fontawesome-free-regular";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function AnnouncementCard({ announcement,setPop }) {
    return (
        <div className="p-4 mb-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-zinc-700 hover:shadow-md hover:border-red-400 dark:hover:border-red-500 transition-all duration-300 group flex items-center justify-between">
            <div className="flex items-start gap-3">
                <div className="min-w-[10px] h-[10px] mt-2 rounded-full bg-red-500 group-hover:bg-red-600 transition-colors"></div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">{announcement.message}</p>
            </div>
            <button onClick={()=>setPop(announcement)}><FontAwesomeIcon icon={faEye} className="text-blue-800 dark:text-blue-300 hover:scale-125"/></button>
        </div>
    );
}
function PopUp({setPop,announcement}){
    const { updateAnnouncement, deleteAnnouncement } = store((state)=>state)
    const [edit,setEdit] = useState(false)
    const [text,setText] = useState(announcement.message)
    const [to,setTo] = useState(announcement.to)
    const handleSave = async()=>{
        const res = await axios.post(`${BACKEND_URL}/announcement/update`,{id:announcement._id,text,to})
        if(res.status === 200){
            updateAnnouncement(res.data.announcement)
            setPop(null)
        }
    }
    const handleDelete = async()=>{
        const res = await axios.post(`${BACKEND_URL}/announcement/delete`, { id:announcement._id })
        if (res.status === 200) {
            deleteAnnouncement(announcement._id)
            setPop(null)
        }
    }
    return(
        <div className="fixed top-[10vh] left-0 w-full h-[90vh] bg-white/90 dark:bg-black/90 backdrop-blur-3xl flex items-center justify-center px-4 z-50">
            <div className="relative bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-md space-y-5">

                <div className="flex items-center justify-between">
                    <button onClick={() => setEdit(!edit)} className="px-4 py-2 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-white font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-700 transition">{edit ? "Cancel" : "Edit"}</button>
                    <button onClick={handleDelete} className="px-4 py-2 rounded-md bg-red-100 text-red-700 dark:bg-red-900 dark:text-white font-semibold hover:bg-red-600 hover:text-white transition">Delete</button>
                </div>

                <textarea value={text} onChange={(e) => setText(e.target.value)} disabled={!edit} placeholder="Enter announcement..." className={`w-full h-28 resize-none rounded-md border border-gray-300 dark:border-zinc-700 px-3 py-2 text-gray-800 dark:text-white dark:bg-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${!edit && 'opacity-50 cursor-not-allowed'}`}/>
                <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800 dark:text-white">Visible to:</p>
                    <select value={to} onChange={(e) => setTo(e.target.value)} disabled={!edit} className="w-[60%] p-2 rounded-md border dark:border-zinc-700 dark:bg-zinc-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 transition">
                        <option value="All" className="dark:bg-zinc-900">All</option>
                        <option value="Teachers" className="dark:bg-zinc-900">Teachers only</option>
                        <option value="Students" className="dark:bg-zinc-900">Students only</option>
                    </select>
                </div>
                {edit && (<button onClick={handleSave} className="w-full mt-2 bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition">Save</button>)}
                <button onClick={() => setPop(false)} className=" text-red-500 hover:text-red-700 dark:hover:text-red-400 text-xl font-bold transition" aria-label="Close">Close</button>
            </div>
        </div>

)}
function Announcements({ leftBar }) {
    const [addAnnouncement, setAddAnnouncement] = useState(false)
    const { announcements } = store((state) => state)
    const [pop,setPop] = useState(null)
    return (
        <div className={`absolute right-0 min-h-[90vh] top-[12vh] px-4 sm:px-8 transition-all duration-300 flex items-start justify-center ${leftBar ? 'w-[75%]' : 'w-full'} dark:bg-zinc-900`}>
            <div className="w-full max-w-4xl bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl p-3 sm:p-5 pt-0">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mx-auto" onClick={()=>setAddAnnouncement(true)}><BellPlus className="w-10 h-10" />New Announcement</button>
                <div className="flex items-center justify-center mb-8 relative">
                    <div className="w-[80px] h-[80px] mr-4">
                        <Lottie animationData={mike} loop className="w-full h-full" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white relative inline-block">
                        <span className="relative px-2 sm:px-4">Latest Announcements</span>
                        <span className="absolute bottom-0 left-0 w-full h-2 bg-red-100 dark:bg-red-900/30 z-0 rounded-md"></span>
                    </h2>
                </div>

                {Object.keys(announcements)?.length > 0 ? (
                    <div className="space-y-4">
                        {Object.keys(announcements).map((id) => (
                            <AnnouncementCard key={id} announcement={announcements[id]} setPop={setPop}/>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <div className="inline-block p-4 bg-gray-100 dark:bg-zinc-700 rounded-full mb-4">
                            <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No announcements available at this time</p>
                    </div>
                )}
            </div>
            {addAnnouncement && <AddAnouncement setAddAnnouncement={setAddAnnouncement}/>}
            {pop && <PopUp announcement={pop} setPop={setPop}/>}
        </div>
    )
}

export default Announcements;
