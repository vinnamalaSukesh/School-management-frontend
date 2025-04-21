import store from "@/store/data"
import { faEye } from "@fortawesome/fontawesome-free-regular"
import { faBook } from "@fortawesome/fontawesome-free-solid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const AddSubject = ({ setNewSubject }) => {
    const [name, setName] = useState("")
    const { addSubject } = store((state) => state)

    const handleSave = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/subject/create`, { name })
            if (res.status === 200) {
                addSubject(res.data.subject)
                setNewSubject(false)
            }
        } catch (err) {
            alert("Error adding subject: " + err.message)
        }
    }

    return (
        <div className={`absolute inset-0 z-20 flex items-center justify-center bg-black/40`}>
            <div className={`flex flex-col gap-4 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-xl w-[90%] max-w-md`}>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Subject</h2>

                <input
                    type="text"
                    placeholder="Subject name"
                    className="p-2 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 dark:bg-zinc-600 dark:hover:bg-zinc-500 text-gray-800 dark:text-white"
                        onClick={() => setNewSubject(false)}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-black font-semibold"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
const PopUp = ({ popSubject,setPopSubject }) => {
    const { deleteSubject, updateSubject,subjects } = store((state) => state)
    const [name, setName] = useState(subjects[popSubject].name)

    const handleSave = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/subject/update`, {id : popSubject,name })
            if (res.status === 200) {
                updateSubject(res.data.subject)
                setPopSubject(false)
            }
        } catch (err) {
            alert("Error adding subject: " + err.message)
        }
    }
    const handleDelete = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/subject/delete`, { id:  popSubject })
            if (res.status === 200) {
                deleteSubject(popSubject)
                setPopSubject(null)
            }
        } catch (err) {
            alert("Error adding subject: " + err.message)
        }
    }

    return (
        <div className={`absolute inset-0 z-20 flex items-center justify-center bg-black/40`}>
            <div className={`flex flex-col gap-4 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-xl w-[90%] max-w-md`}>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Subject</h2>

                <input
                    type="text"
                    placeholder="Subject name"
                    className="p-2 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 dark:bg-zinc-600 dark:hover:bg-zinc-500 text-gray-800 dark:text-white"
                        onClick={() => setPopSubject(false)}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 dark:bg-red-400 dark:hover:bg-red-500 text-white dark:text-black font-semibold"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-black font-semibold"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
function Subject({ leftBar }) {
    const { subjects } = store((state) => state)
    const [newSubject, setNewSubject] = useState(false)
    const [popSubject,setPopSubject] = useState(false)

    return (
        <div className={`flex flex-col ${leftBar ? 'w-[75%]' : 'w-full'} absolute right-0 top-[10vh] min-h-[90vh] px-6 py-4 dark:bg-zinc-900 bg-gray-100 transition-all duration-300`}>
            <button
                className="self-start mb-4 flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-black font-semibold shadow"
                onClick={() => setNewSubject(true)}
            >
                <FontAwesomeIcon icon={faBook} />
                ADD SUBJECT
            </button>

            <div className="space-y-2">
                {Object.keys(subjects)?.map((id) => (
                    <div key={id} className="px-4 py-2 rounded-md bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow flex justify-between">
                        <p>{subjects[id]?.name}</p>
                        <button onClick={()=>setPopSubject(id)}><FontAwesomeIcon icon={faEye} className="text-blue-800 dark:text-blue-300"/></button>
                    </div>
                ))}
            </div>
            {popSubject && <PopUp setPopSubject={setPopSubject} popSubject={popSubject}/>}
            {newSubject && <AddSubject setNewSubject={setNewSubject} leftBar={leftBar} />}
        </div>
    )
}

export default Subject