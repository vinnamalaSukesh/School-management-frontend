import store from "@/store/data"
import axios from "axios"
import { useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Teacher({ id,setId }) {
    const { updateTeacher, deleteTeacher, teachers } = store((state) => state)
    const teacher = teachers[id]
    const [name, setName] = useState(teacher.name)
    const [phone, setPhone] = useState(teacher.phone)
    const [email, setEmail] = useState(teacher.email)
    const [qualification,setQualification] = useState(teacher.qualification)
    const [edit, setEdit] = useState(false)
    const handleSave = async() => {
        try{
            const res = await axios.post(`${BACKEND_URL}/teacher/update`,{id,name,phone,email,qualification})
            if(res.status === 200){
                updateTeacher(res.data.teacher)
                setId(null)
            }
        }
        catch(err){alert(err)}
    }
    const handleDelete = async() => {
        try {
            const res = await axios.post(`${BACKEND_URL}/teacher/delete`, { id })
            if (res.status === 200) {
                deleteTeacher(id)
                setId(null)
            }
        }
        catch (err) { alert(err) }
    }
    return (
        <div className="fixed left-0 z-10 w-full h-[91vh] bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md flex items-center justify-center top-[9vh]">
            <div className="w-[300px] sm:w-[380px] bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700 animate-fade-in flex flex-col gap-4">
                <div className="flex w-full gap-3">
                    <button onClick={() => setEdit(!edit)} className={`w-full py-2 rounded-lg font-semibold transition-all shadow-sm ${edit ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>{edit ? "Editing..." : "Edit"}</button>
                    <button onClick={handleDelete} className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all shadow-sm">Delete</button>
                </div>

                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" disabled={!edit} className={`w-full px-3 py-2 rounded-md border ${edit ? "border-gray-300 dark:border-zinc-600 focus:ring-blue-500 focus:border-blue-500" : "border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-gray-400"} focus:outline-none shadow-sm`} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" disabled={!edit} className={`w-full px-3 py-2 rounded-md border ${edit ? "border-gray-300 dark:border-zinc-600 focus:ring-blue-500 focus:border-blue-500" : "border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-gray-400"} focus:outline-none shadow-sm`} />
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" disabled={!edit} className={`w-full px-3 py-2 rounded-md border ${edit ? "border-gray-300 dark:border-zinc-600 focus:ring-blue-500 focus:border-blue-500" : "border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-gray-400"} focus:outline-none shadow-sm`} />
                <input type="password" value={qualification} onChange={(e) => setQualification(e.target.value)} placeholder="Enter qualification" disabled={!edit} className={`w-full px-3 py-2 rounded-md border ${edit ? "border-gray-300 dark:border-zinc-600 focus:ring-blue-500 focus:border-blue-500" : "border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-gray-400"} focus:outline-none shadow-sm`} />

                <div className="flex space-x-3 mt-4">
                    <button onClick={() => setId(null)} className="w-full py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-red-500 dark:text-red-400 font-medium transition-colors">Cancel</button>
                    <button onClick={handleSave} className="w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">Save</button>
                </div>
            </div>
        </div>
    )
}
export default Teacher