import store from "@/store/data"
import { faEye } from "@fortawesome/fontawesome-free-regular"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import axios from "axios"
import Lottie from "lottie-react"
import student from './lottieStudent.json'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function StudentPop({ studentPop, setStudentPop }) {
  const { updateStudent, updateSection, classes, sections, students } = store((state) => state)
  const student = students[studentPop.student]
  const [name, setName] = useState(student.uname)
  const [phone, setPhone] = useState(student.phone)
  const [email, setEmail] = useState(student.email)
  const [sect, setSect] = useState(studentPop.sect)
  const [std, setStd] = useState(sections[studentPop.sect]?.className)

  const handleSave = async () => {
    try {
      if (sect === student.classId) {
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
    catch (err) { alert(err) }
  }
  const handleChange = (classId) => {
    setStd(classId)
    setSect(classes[classId].sections[0])
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

        <div className="flex w-full gap-4 mt-4">
          <button onClick={() => setStudentPop(false)} className="w-1/2 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-red-600 font-semibold dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-red-400">Cancel</button>
          <button onClick={handleSave} className="w-1/2 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold">Save</button>
        </div>
      </div>
    </div>
  )
}
function Students({leftBar}) {
  const {students,classes,sections} = store((state)=> state)
  const [studentPop, setStudentPop] = useState(null)
  return (
    <div className={`absolute right-0 min-h-[90vh] px-4 sm:px-10 transition-all duration-300 flex flex-col items-start ${leftBar ? 'w-[75%]' : 'w-full'} bg-gray-50 dark:bg-zinc-900`}>
      <div className="flex items-center justify-center gap-10  relative top-[-20px]">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-6 px-2 ">All Students</h2>
        <div className="w-[150px] h-[150px] "><Lottie animationData={student} loop={true} /></div>
      </div>

      <div className="w-full flex items-center justify-around px-4 py-1 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-zinc-700 rounded-t-lg shadow">
        <p className="md:w-[20%] text-center w-[35%]">Name</p>
        <p className="w-[20%] text-center hidden lg:block">Phone</p>
        <p className="w-[25%] text-center hidden xl:block">Email</p>
        <p className="md:w-[10%] text-center w-[25%]">Class</p>
        <p className="md:w-[10%] text-center w-[25%]">Section</p>
        <p className="w-[10%]"></p>
      </div>

      {Object.keys(students).map((id) => {
        const student = students[id];
        return (
          <div key={id} className="w-full flex justify-around px-4 py-3 text-sm items-center border-b border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
            <p className="md:w-[20%] w-[35%] font-medium text-gray-800 dark:text-gray-100 truncate text-center">{student?.uname}</p>
            <p className="text-gray-700 dark:text-gray-300 truncate w-[20%] text-center hidden lg:block">{student?.phone}</p>
            <p className="text-gray-700 dark:text-gray-300 truncate w-[25%] text-center hidden xl:block">{student?.email}</p>
            <p className="text-gray-700 dark:text-gray-300 md:w-[10%] w-[25%] text-center">{classes[sections[student?.section].className].name}</p>
            <p className="text-gray-700 dark:text-gray-300 md:w-[10%] w-[25%] text-center">{sections[student.section].name}</p>
            <button className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition w-[10%] text-center" onClick={() => setStudentPop({ student: id, sect:student.section })}><FontAwesomeIcon icon={faEye} className="w-4 h-4 hover:scale-125" /></button>
          </div>
        )
      })}
      {studentPop && <StudentPop studentPop={studentPop} setStudentPop={setStudentPop} />}
    </div>

  )
}
export default Students