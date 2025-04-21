import store from "@/store/data"
import axios from "axios"
import { useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Student({ studentPop, setStudentPop }) {
  const { updateStudent, updateSection, deleteStudent, classes, sections, students } = store((state) => state)
  const student = students[studentPop.student]
  const [name, setName] = useState(student.uname)
  const [phone, setPhone] = useState(student.phone)
  const [email, setEmail] = useState(student.email)
  const [sect, setSect] = useState(student?.section)
  const [std, setStd] = useState(classes[sections[sect]?.className]._id)

  const handleChange = (classId) => {
    setStd(classId)
    setSect(classes[classId].sections[0])
  }

  const handleSave = async () => {
    try {
      if (sect === student.section) {
        const res = await axios.post(`${BACKEND_URL}/student/update`, { id: student._id, name, phone, email })
        if (res.status === 200) {
          updateStudent(res.data.student)
          setStudentPop(false)
        }
      }
      else {
        const res = await axios.post(`${BACKEND_URL}/student/upgrade`, { id: student._id, name, phone, email, sect })
        if (res.status === 200) {
          updateStudent(res.data.student)
          updateSection(res.data.section1)
          updateSection(res.data.section2)
          setStudentPop(false)
        }
      }
    }
    catch (err) { console.log(err) }
  }
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this student?");
      if (!confirmDelete) return;

      const res = await axios.post(`${BACKEND_URL}/student/delete`, { id: student._id, section: sect });
      if (res.status === 200) {
        updateSection(res.data.section)
        deleteStudent(student._id)
        setStudentPop(false);
      }
    } catch (err) {
      alert("Error deleting student: " + err.message);
    }
  }
  return (
    <div className="fixed left-0 z-10 w-full h-[91vh] bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center top-[9vh]">
      <div className="w-[320px] sm:w-[360px] bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg dark:shadow-white/10 animate-fadeIn flex flex-col items-center justify-center gap-3">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Student details</h2>

        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter name :' className="input w-full p-2 shadow-[0px_0px_3px_black] dark:shadow-[0px_0px_2px_white] rounded-sm" />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email :' className="input w-full p-2 shadow-[0px_0px_3px_black] dark:shadow-[0px_0px_2px_white] rounded-sm" />
        <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter phone no :' className="input w-full p-2 shadow-[0px_0px_3px_black] dark:shadow-[0px_0px_2px_white] rounded-sm" />

        <div className="flex items-center justify-between w-full gap-2">
          <div className="w-1/2">
            <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">Class</p>
            <select value={std} onChange={(e) => handleChange(e.target.value)} className="w-full p-2 rounded bg-white dark:bg-zinc-800 border">
              <option value="">Select class</option>
              {Object.keys(classes).map(id => (
                <option key={id} value={id}>{classes[id]?.name}</option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">Section</p>
            <select value={sect} onChange={(e) => setSect(e.target.value)} className="w-full p-2 rounded bg-white dark:bg-zinc-800 border">
              {classes[std]?.sections.map(id => (
                <option key={id} value={id}>{sections[id]?.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex w-full gap-3 mt-4">
          <button onClick={() => setStudentPop(false)} className="w-1/3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-red-600 font-semibold dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-red-400">Cancel</button>
          <button onClick={handleDelete} className="w-1/3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold">Delete</button>
          <button onClick={handleSave} className="w-1/3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold">Save</button>
        </div>

      </div>
    </div>
  )
}
export default Student